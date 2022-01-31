 const appConfig = require('../config.json')

function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body {
                font-family: 'Open Sans', sans-serif;
            }
            /* App fit Height */ 
                /* Esse id __next envolve toda a aplicação. É o equivalente ao #root do React. */
                html, body, #__next { 
                    min-height: 100vh;
                    display: flex;
                    flex: 1;
                }
                #__next > * {
                    flex: 1;
                }
            /* ./App fit Height */ 

            /*Scroll bar*/
                /* width */
                ::-webkit-scrollbar {                
                width: 10px;
                }

                /* Track */
                ::-webkit-scrollbar-track {                
                border-radius: 10px;
                background: ${appConfig.theme.colors.neutrals[400]};
                }

                /* Handle */
                ::-webkit-scrollbar-thumb {
                background: ${appConfig.theme.colors.neutrals[900]};
                border-radius: 10px;
                }
            /*Scroll bar*/

            .author {
                text-decoration: none;
                color: #F8BA67;
            }
            a {
                text-decoration: none;
                color: ${appConfig.theme.colors.neutrals["050"]};
            }
            a:hover {
                color: ${appConfig.theme.colors.primary["500"]};
            }
        `}</style>
    );
}
  
export default function CustomApp({ Component, pageProps }) {
    console.log('Roda em todas as páginas!');
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}