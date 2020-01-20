const express = require('express'); //Responsavel por importar a biblioteca
const mongoose = require('mongoose'); //Responsavel por importar a biblioteca
const cors = require('cors');
const http = require('http');


//Banco de dados -> MongoDB(Não-Relacional) -- Permite manter o bando de dados na nuvem
mongoose.connect('mongodb+srv://pedroit:teste@cluster0-r0vdq.mongodb.net/week10?retryWrites=true&w=majority', {

    useNewUrlParser: true,
    useUnifiedTopology: true,

}); //Conecta a aplicação ao banco de dados que está na nuvem -> usado o site https://www.mongodb.com/cloud/atlas

const app = express(); //Recebe a biblioteca
const server = http.Server(app);

const routes = require('./routes');  //Importa o arquivo routes com o caminho
const { setupWebsocket} = require('./websocket');

setupWebsocket(server);

app.use(cors());
app.use(express.json()); //Permite o express receber o json
app.use(routes); //Permite identificar todas as rotas do programa


server.listen(8080); //Define qual vai ser a porta a ser acessada