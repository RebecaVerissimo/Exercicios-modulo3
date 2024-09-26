# Viagem 365

O Viagem365 é uma plataforma que visa promover viagens sustentáveis e experiências positivas para os usuários, fornecendo acesso a informações sobre destinos turísticos, praias, atrações naturais e atividades recreativas. Os usuários podem explorar e descobrir novos destinos, encontrar dicas de viagem sustentável e compartilhar suas experiências.

## Descrição do Projeto

Este repositório contém o frontend do Viagem365, desenvolvido com React e Vite. A plataforma utiliza Leaflet para exibir mapas interativos e permite que os usuários explorem destinos sustentáveis, reservem atividades eco-amigáveis e muito mais.

## Funcionalidades

- **Interface Moderna:** Utiliza React e Bootstrap para uma experiência de usuário fluida e responsiva.
- **Mapas Interativos:** Integração com Leaflet para explorar destinos em um mapa interativo.
- **Formulário de Reserva:** Implementado com React Hook Form para uma gestão eficiente dos formulários.
- **Alertas:** Utiliza SweetAlert2 para mostrar mensagens interativas e alertas.

## Para rodar o repositório em ambiente local

Para começar a trabalhar no projeto, siga estes passos:

1. **Clone o Repositório:**

    ```bash
    git clone https://github.com/RebecaVerissimo/viagem365-frontend
    cd viagem365-frontend
    ```

2. **Instale as Dependências:**

    Certifique-se de ter [Node.js](https://nodejs.org/) instalado. Em seguida, execute:

    ```bash
    npm install
    ```

3. **Inicie o Servidor de Desenvolvimento:**

    Para iniciar o ambiente de desenvolvimento, use:

    ```bash
    npm run dev
    ```

    Isso iniciará o servidor de desenvolvimento e você poderá ver a aplicação no link que aparecerá na terminal.

4. **Inicie o Servidor JSON:**

    Se precisará simular uma API com dados fictícios, para isso execute:

    ```bash
    npm run server
    ```

    Isso iniciará o `json-server` na porta 3333.

##  Melhorias que podem ser aplicadas

- Se conectar a um servidor back-end real e não num fictício (json-server). 
- Se poderia utilizar uma api que tenha todos os CEP do país disponíveis ou atualizados, pois a utilizada (https://nominatim.openstreetmap.org/) é muito limitada. Foi utilizada para obter as coordenadas através do CEP
- Melhorar validações dos formulários.
- Melhorar a estilização do programa, com cores mas atraentes.

### Video explicativo

`https://drive.google.com/file/d/1eOaTnROuDrbbfBJNRTJm42envTq4gSOb/view?usp=drive_link`

