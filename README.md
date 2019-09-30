# Integração com Google Maps via JS

1. Conectar a aplicação à API do Google Maps renderizando mapa de uma região especifica;

2. Criar marcadores (pin) no mapa conforme endpoint;

3. Ao clicar no marcador o usuário deve selecionar um dia e buscar pelos horário do atrativo através do endpoint, passando a data por parâmetro;


### Para rodar o projeto.

- No arquivo `js/main.js` na linha 15 inserir o API KEY do Google.

```javascript

cdn[0] = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=[API_KEY]&language=' + lang;

```

- O projeto foi desenvolvimento com javascript, para rodar basta executar em um servidor local.
