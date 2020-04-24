const express = require('express');
const { uuid,isUuid } = require('uuidv4');

const repositorieController = require('./app/controllers/repositorieController');

const routes = express.Router();

routes.get('/', repositorieController.index);
routes.get('/repositories', repositorieController.list);
routes.post('/repositories', repositorieController.create);
routes.put('/repositories/:id', repositorieController.edit);
routes.delete('/repositories/:id', repositorieController.delete);

routes.put('/repositories/:id/like', repositorieController.like);

module.exports = routes;