const { Router } = require('express'); //Responsavel por importar a biblioteca
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


const routes = Router(); //Utiliza o recurso da biblioteca

//Metodos HTTP: GET, POST, PUT, DELETE
/* 
GET = buscar uma informação
POST = usado para criar uma informação
PUT = editar uma informação da aplicação
DELETE = deletar alguma informação da aplicação
*/

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes; //Permite que o programa reconheça a rota