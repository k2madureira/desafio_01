const express = require('express');
const { uuid,isUuid } = require('uuidv4');

const routes = express.Router();
const repositories = [];

routes.get('/', (req, res) => {
  return res.json(repositories)
})

routes.get('/repositories', (req, res) => {
  return res.json({repositories})
})

routes.post('/repositories', (req, res) => {
  
  const { title , url , techs } = req.body;
  const repositorie = {
    id:uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repositorie);
  
  return res.json(repositorie)
})


module.exports = routes;