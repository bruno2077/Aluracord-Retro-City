import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { ImgGithub } from '../src/components/ImgGithub';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ5MjU0OCwiZXhwIjoxOTU5MDY4NTQ4fQ.ehb75Tx4ANt4JSf5s9yRt93aP3KX0Pyeyk8aC7Trdm8";
const SUPABASE_URL = "https://wegtsnfrogueexzhlpvq.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Essa função escuta no Supabase quando há inserção no banco de dados. Recebe uma função como argumento que é a função de adicionar mensagem na lista de mensagens.
// Então quando uma inserção é detectada no banco de dados essa mensagem inserida é passada para a função que insere mensagens na lista de mensagens, atualizando a lista em todas as telas.
function listenMessagesRealTime(addMessage) {
    return supabaseClient
        .from('messages')
        .on('INSERT', (liveResponse) => {
            addMessage(liveResponse.new);
        })
        .subscribe();
}

function isValidSticker(stickerURL) {
    
    appConfig.stickers.forEach(el => {
        if(el === stickerURL) {
            // é um sticker válido.
        }
    })
}


export default function ChatPage() {
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);    
    const routing = useRouter();
    const username = routing.query.username;
    const [stickerError, setStickerError] = React.useState(false);

    // Roda toda vez que carrega o componente, a página.
    React.useEffect( () => {
        // Pega as mensagens do banco de dados e carrega na lista de mensagens.
        supabaseClient
        .from("messages")
        .select("*")
        .order('id', { ascending: false })
        .then( res => {
            setMessageList(res.data)
        })
        .catch(err => console.log(err));
        
        // Executa a função de escuta no Supabase (definida acima) pra sempre que atualizar o banco de dados atualizar aqui também na lista de mensagens do frontend.
        const subscription = listenMessagesRealTime((newMessage) => {
            // Passa uma função ao invés de valor para o setState pra pegar seu valor mais recente.
            setMessageList((CurrentValueOfList) => {
                //console.log('valorAtualDaLista:', CurrentValueOfList);
                return [
                    newMessage,
                    ...CurrentValueOfList,
                ]
            });
        });

        // Quando sair da página (descarregar o componente) para de escutar por inserções no Supabase.
        return () => {
            subscription.unsubscribe();
        }

    }, []);

    // Essa função manda a mensagem (se houver) para o banco de dados no Supabase.
    // Recebe uma string que é o texto da mensagem. Monta um objeto contendo ela e o autor, adiciona na lista de mensagens e limpa o textarea.
    async function handleNewMessage(newMessage) {        
        // Se a mensagem é sticker garante que seja carregado um sticker válido.
        if(newMessage.startsWith(':sticker:')) {
            let stickerURL = newMessage.split(":sticker: ")[1]; // aqui vai ser undefined, "", inválido ou válido
            console.log(stickerURL);

            // Cai aqui se a sintaxe estiver incorreta. Se digitou outra coisa ao invés de " " após :sticker:, 
            // se não digitou nada após :sticker: ou se só digitou :sticker: mesmo. Em todo caso não manda nada pro servidor.
            if(!stickerURL) { 
                newMessage = "";
                setStickerError(true); // Muda o placeholder pra falar q deu erro.
            }
            // sintaxe do sticker correta. Agora, pode ser um sticker válido ou inválido.
            else { 
                let isValidSticker = false
                appConfig.stickers.forEach(el => {
                    if(el === stickerURL) { // é um sticker válido.                        
                        isValidSticker = true;
                        return 0;
                    }
                })
                // Se não encontrou o sticker, não manda nada para o servidor.
                if(!isValidSticker) {
                    newMessage = "";
                    setStickerError(true); // Muda o placeholder pra falar q deu erro.
                }
            }
        }
        
        // Se mensagem não vazia manda a mensagem para o servidor (seja texto ou sticker).
        if(newMessage) {                        
            const message = {                
                from: username,
                text: newMessage,
            };
            
            // Manda os dados da mensagem para o supabase inseri-la no banco de dados.
            await supabaseClient
                .from('messages')
                .insert([
                    message 
                ])
            
            // Volta o placeholder ao normal, se precisar
            if(stickerError) 
                setStickerError(false);
        }

        setMessage('');            
    }

    return (
        <Box // Essa div cobre toda a tela, do bg ao chat.
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',                
                backgroundImage: 'url(/assets/img/background.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box // Container do chat.
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: "0px 0px 4px 2px #FD36B377",
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                
                <Box // Nessa div vem a lista de mensagens do chat e o form de envio de mensagens.
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    
                    <MessageList messages={messageList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={e => {     
                                if(e.key === "Enter") {
                                    e.preventDefault();
                                    handleNewMessage(message)
                                }
                            }}
                            placeholder={stickerError ? "Sticker inválido..." : "Digite sua mensagem aqui..."}
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '10px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button 
                            onClick={e => handleNewMessage(message)} 
                            iconName="FaPlay"                            
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[700],
                                mainColorLight: appConfig.theme.colors.primary[200],
                                mainColorStrong: appConfig.theme.colors.primary[800],
                            }}                            
                            styleSheet={{
                                marginRight: '10px',
                                borderRadius: '50%',                                
                                minWidth: '50px',
                                minHeight: '50px',
                                fontSize: '20px',
                                marginBottom: '8px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNewMessage(':sticker: ' + sticker);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

// Essa função monta o cabeçalho do chat.
function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat {appConfig.name}
                </Text>
                <Button
                    variant='tertiary'
                    label='Logout'
                    href="/" // Apesar de ser 'Button' tem href e redireciona pro '/' mesmo.
                    buttonColors={{                    
                        mainColor: "#fff",
                        mainColorLight: appConfig.theme.colors.primary[300],                        
                    }}
                    styleSheet={{
                        hover: {
                            backgroundColor: appConfig.theme.colors.primary[600],
                        }
                    }}
                />
            </Box>
        </>
    )
}

// Essa função monta a lista de mensagens do chat ou um loading enquanto as mensagens não carregam.
// Se não houver mensagem fica mostrando o loading... mudar isso depois.
function MessageList(props) {
    console.log('MessageList', props);


    const showLoading = props.messages.length ? "" : 
        <Image     
            styleSheet={{
                display: "flex",
                width: "100%",
                opacity: '0.4'
            }}
            src={`/assets/img/loading4.gif`}                                
        />


    return (
        <Box
            tag="ul"            
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: showLoading ? 'row' : 'column-reverse',                
                justifyContent: showLoading ? "center" : "flex-start",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {/* Aparece enquanto não carrega as mensagens (e se não houver nenhuma mensagem) */}
            {showLoading}

            {/* Cada mensagem. Aqui faz um map em cada objeto mensagem e transforma seus atributos em componentes. */}
            {props.messages.map((message) => {
                return (
                    // Cada mensagem vem numa <li>, aqui vem uma div e o texto da mensagem
                    <Text 
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >

                        {/* // Nessa div vem os dados do autor (nome e avatar) e a data da mensagem. */}
                        <Box 
                            styleSheet={{
                                marginBottom: '8px',
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {/* Avatar do autor no github*/}                            
                            <ImgGithub
                                imgStyle={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                user={message.from}
                            />

                            {/* Autor */}
                            <Text tag="strong">
                                {message.from}
                            </Text>

                            {/* Data de postagem */}
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())} 
                            </Text>
                        </Box>
                        {/* Se a mensagem começar com :sticker: é pra tratar como uma imagem. Espera-se uma URL após ':sticker:' pra renderizar. */}
                        {message.text.startsWith(':sticker: ')
                            ? (
                                <Image src={message.text.replace(':sticker:', '')} />
                            )
                            : (
                                message.text
                            )}
                    </Text>
                );
            })}
        </Box>
    )
}