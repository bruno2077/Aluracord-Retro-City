import { Box, Button, Text, TextField, Image } from '@skynexui/components'; // componentes do Skynexui.
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json'; // Arquivo com as paletas de cor, nome do app,

function Titulo(props) {
    const Tag = props.tag || 'p';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}


export default function PaginaInicial() {    
    const [username, setUsername] = React.useState(''); // nome de usuario no github    
    const [userImgURL, setUserImgURL] = React.useState("/assets/img/noUser.gif"); // avatar do github
    const [userRealName, setUserRealName] = React.useState(''); // nome real do usuario no github
    const routing = useRouter();

    // Essa função atualiza o username do GH, o nome real e o avatar conforme o que é digitado no Textarea. 
    // Se não existir ou for menos de 3 caracteres retorna valores padrão. Só entra no chat com um usuário do GH.
    function handleUserChange(event) {
        setUsername(event.target.value)
        
        if(event.target.value.length > 2) {
            fetch(`https://api.github.com/users/${event.target.value}`)
                .then( res => { 
                    if(res.status !== 200)
                        throw '404' 
                    else return res.json() 
                })
                .then(json => {
                    // Se encontrou o usuário pega seu nome real e URL do avatar.                   
                    setUserRealName(json.name)                    
                    setUserImgURL(json.avatar_url)
                })
                .catch(e => {       
                    // Se não encontrou o usuário ou a rede falhar seta o 'nome real' e a imagem como 404.                    
                    setUserImgURL("/assets/img/noUser.gif")
                    setUserRealName("4̸̡͉͉̈́̓̓0̸̞̙͙͛̀͛4̸͚̻͔̓̀")
                })
        }
        else { // Nem procura no GH se o username tiver menos de 3 dígitos (apesar de que o GH aceita nomes de 1 dígito).
            setUserImgURL("/assets/img/noUser.gif")
            setUserRealName("")
        }
    }
    
    return (
        <>            
            {/* Essa div contém todos os outros elementos da página inicial, cobre toda a tela. */}
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',                    
                    backgroundImage: 'url(/assets/img/background.jpg)',                    
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundPosition: 'bottom'
                }}
            >
                {/* A div com todo o form de login dentro */}
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        background: appConfig.theme.colors.neutrals[700].concat("99"),
                        boxShadow: "0px 0px 4px 2px #FD36B399"
                    }}
                >
                    {/* Formulário, à esquerda em tela grande ou 100% em tela pequena. */}
                    <Box
                        as="form" // usa a tag form, ao invés de div
                        onSubmit={function (eventInfos) {
                            eventInfos.preventDefault();
                            routing.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="p">Digite um nome...</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
                            {appConfig.name.concat(" (por ")} 
                            <a href='/#' className='author' >bruno2077</a>)
                        </Text>

                        <TextField
                            value={username}
                            onChange={e => handleUserChange(e)}                            
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.primary[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            disabled={userImgURL === "/assets/img/noUser.gif" ? true : false}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[700],
                                mainColorLight: appConfig.theme.colors.primary[200],
                                mainColorStrong: appConfig.theme.colors.primary[800],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area, aparece a direita se tela grande ou 100% se pequena */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',                            
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{                                                            
                                borderRadius: '10%',
                                marginBottom: '16px',
                                width: '100%'
                            }}
                            src={userImgURL}
                        />
                        <Text
                            variant="body4"                            
                            styleSheet={{
                                display: username.length > 2 ? "block" : "none",
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {userRealName}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}