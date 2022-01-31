import React from 'react';
import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ImgGithub(props) {
  const [isOpen, setOpenState] = React.useState(false);
  const [isLoaded, setContentLoaded] = React.useState(false);
  const [userImgURL, setUserImgURL] = React.useState('')
  const [userRealName, setUserRealName] = React.useState('')

if(isOpen) {
  fetch(`https://api.github.com/users/${props.user}`)
  .then( res => { 
      if(res.status !== 200)
          throw 'error' 
      else return res.json() 
  })
  .then(json => {
      // Ao carregar os dados atribui às variaveis.
      setUserRealName(json.name)                    
      setUserImgURL(json.avatar_url)
      setContentLoaded(true)
  })
  .catch(e => {       
      // Deixa vars vazias pra não aparecer nada.
      setUserImgURL("/assets/img/noUser.gif")
      setUserRealName("Usuário não encontrado no Github")
  })
}
  



  return (
    <Box
      styleSheet={{
          position: 'relative',
          overflow: "visible",
          display: 'inline-block',          
        }}
      onMouseEnter={() => {
        // A ideia eh carregar URLdo user, pegar uns 3 valores, botalos em Tags
        // DEPOIS: show div com as infos prontas.        
        setOpenState(true)
      }}
    >
      {/* Essa é a parte que sempre aparece. O avatar do usuário. */}
      <Image
          styleSheet={props.imgStyle}
          src={`https://github.com/${props.user}.png`}   
          onClick={() => setOpenState(true)} // pra funcionar no mobile
      />
      
      {/* essa é a div q show/hide */}
      {isOpen && isLoaded && (
        <Box
          onMouseLeave={() => {
            setOpenState(false)
          }}        
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            zIndex: "1000",
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            top: "-100px",     
            height: "200px",
            width: {
              xs: '200px',
              sm: '250px',
            },
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}         
        >            
          <a href={`https://github.com/${props.user}`}>
            <Image src={userImgURL}             
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                width: '100px'
              }}/>
          </a>
          <Text
              variant="body3"
              styleSheet={{                  
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
              }}              
          >
            <a href={`https://github.com/${props.user}`}>{userRealName}</a>
          </Text>
          
        </Box>
      )}
    </Box>
  )
}