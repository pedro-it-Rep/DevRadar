const axios = require('axios'); //Responsavel por importar a biblioteca
//OBS .. é para voltar uma pasta
const Dev = require('../models/Dev'); //Importa o arquivo Dev com o caminho

const { findConnections, sendMessage } = require('../websocket');

/*  Util:
index = Mostrar toda uma lista
show = Mostrar apenas 1 elemento de uma lista
store = Criar um novo elemento da lista
update = Alterar algum elemento da lista
destroy = Apagar algum elemento da lista
*/


module.exports = {

async index(request, response) {

const devs = await Dev.find();

return response.json(devs);
},


/* Requeste responsavel por mandar uma requisição para o servidor, onde pode existir informações
basicamente é a informação solicitada pelo cliente
Response é responsavel por devolver oque foi pedido pelo cliente */
async store(request, response)  {
    const { github_username, techs, latitude, longitude} = request.body; //Recebe o corpo da requisição

    let dev = await Dev.findOne({ github_username }); //Procura no banco de dados se já existe o usuario

    // Se não existir cria um novo
    if(!dev) {

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); //Pega todas as informações do github

        const { name = login, avatar_url, bio } = apiResponse.data; //Recebe os dados diretamente do github
    
        const techsArray = techs.split(',').map(tech => tech.trim()); 
    
        const location = {
    
            type: 'Point',
            coordinates: [longitude, latitude], //Necessario ser primeiro longitude por conta do formato no MongoDB
            
        };
    
         dev = await Dev.create({ //Responsavel por receber os dados recem cadastrados do banco de dados
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        )

        console.log(`> sendSocketMessageTo: ${sendSocketMessageTo.length}`)

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    /* json = está sendo mandado uma lista, caracterizada com as chaves { }  */
    return response.json(dev);

 }
};