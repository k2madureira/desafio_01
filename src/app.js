const express = require('express');
const routes = require('./routes');
const { isUuid } = require('uuidv4');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/repositories/:id', (req, res, next) => {
      const { id }  = req.params;

      if(!isUuid(id)){
        return res.status(400).json({ error: 'Invalid Repositorie ID ! 😥'});
      }

      return next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;