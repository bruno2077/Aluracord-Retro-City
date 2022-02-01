<div align="center">
    <a href="https://aluracord-retro-city-bruno2077.vercel.app/" >
      <img src="https://i.ibb.co/TYTdd9n/friso.jpg" style="max-width: 400px;"alt="Aluracord Retro City">
    </a>

# Aluracord Retro City

</div>

<div align="center">

  <a href="https://bruno2077.github.io/">
    <img alt="Made by Bruno2077" src="https://img.shields.io/badge/Feito%20por-Bruno2077-blueviolet">
  </a>

  <img alt="Next.js v12" src="https://img.shields.io/badge/Next.js-12.0.8-blue">
  
  <img alt="SkynexUI" src="https://img.shields.io/badge/SkynexUI-1.24.2-orange">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/bruno2077/aluracord-retro-city.svg">
  
  <a href="https://github.com/bruno2077/aluracord-retro-city/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/bruno2077/aluracord-retro-city.svg">
  </a>

  <a href="https://github.com/bruno2077/aluracord-retro-city/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/bruno2077/aluracord-retro-city.svg">
  </a>

  <img alt="License MIT" src="https://img.shields.io/github/license/bruno2077/aluracord-retro-city.svg">
</div>

<hr>

> **Status do Projeto: Concluído** :heavy_check_mark:

## Descrição
Este projeto é um chat que envia e recebe mensagens em tempo real, as mensagens ficam armazenadas num banco de dados no Supabase e sempre que chega uma mensagem nova no servidor todas as telas se atualizam. A aplicação foi desenvolvida com Next.js e SkynexUI. 

O projeto foi desenvolvido durante a imersão React da Alura no final de Janeiro/2022, este é uma modificação com novas funcionalidades do projeto original [Aluracord Matrix](https://github.com/alura-challenges/aluracord-matrix). 

Algumas das novas funcionalidades e alterações inclui: 
- Estilo: Novas paletas de cores, alteração em quase todo CSS in JSX e nos estilos do SkynexUI.
- 'Validação' de usuário: É preciso digitar um nome de usuário existente no Github com 3 ou mais caracteres pra entrar no chat. 
- Loading: Enquanto as mensagens não são carregadas do Supabase exibe uma imagem de loading.
- Informações dos usuários no chat: via onMouseOver nos avatares abre uma div contendo o nome e o avatar do usuário como links para seu Github. 
- Validação da mensagem texto: Mensagens vazias não são enviadas para o servidor.
- Validação dos stickers: Mensagens de sticker não cadastrado ou com erros de sintaxe não são enviados para o servidor e acusam erro.
- Tag title e favicon personalizados: Modificação das tags geradas pelo Next.js através do arquivo '_document.js'.

## Demo
Confira o projeto no link: https://aluracord-retro-city-bruno2077.vercel.app/

## Pré Requisitos
Para instalar o projeto localmente é necessário ter o Yarn (1.22.15) e o Node(14.17.6) instalados na máquina. O git não é necessário mas agiliza a instalação como veremos a seguir. As versões entre parêntesis foram as utilizadas no projeto.

## Instalação
A maneira mais rápida de instalar este projeto é abrindo o terminal/cmd e:

```bash
# clone este repositório
git clone https://github.com/bruno2077/aluracord-retro-city.git

# abra o diretório da aplicação
cd aluracord-retro-city

# instale o projeto e todas as dependencias com o yarn:
yarn install

# execute o projeto
yarn dev

```

## Como usar
Com o projeto rodando acesse-o no navegador no endereço http://localhost:3000 

Na tela de login basta digitar um nome de usuário existente no Github que contenha 3 ou mais caracteres, não é pedido senha nem nada, o usuário só precisa existir no Github.

Em seguida é só enviar qualquer mensagem de texto ou um dos stickers no chat.

## Tecnologias

- Javascript
- Next.js
- SkynexUI
- Yarn
- Node
- Supabase

## Autor
Desenvolvido por Bruno Borges Gontijo, entre em contato.

[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/bruno2077/) [<img src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white "/>](mailto:assembleia23@hotmail.com)

## Licença
MIT © [Bruno Borges Gontijo](https://bruno2077.github.io)