
const request = require('supertest');
const app = require('../src/app');


describe('Repositories', () => {

  var id_test = '';

  it('should be able to list all repositories', async () => {
    const response = await request(app)
      .get('/');

    expect(response.body).toHaveProperty('repositories');
  });

  it('should be able to list the repositories', async () => {
    const response = await request(app)
      .get('/repositories');

    expect(response.body).toHaveProperty('repositories');
  });

  it('should be able to create a new repository', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        title:"Desafio Nodejs",
        url:"https://google.com.br",
        techs:["Nodejs","React","Native"]
      });

    const { id } = response.body;
    id_test = id;

    expect(response.body).toHaveProperty('title');
  });

  it('should be able to update repository', async () => {
    
    const response = await request(app)
      .put('/repositories/'+id_test)
      .send({
        title:"Desafio Nodejs Editado",
        url:"https://google.com.br",
        techs:["Nodejs","React","Native"]
      });

    expect(response.body).toHaveProperty('title');
  });

  it('should be able to view error -> invalid repositorie ID', async () => {
    
    const response = await request(app)
      .put('/repositories/'+id_test+1)
      .send({
        title:"Desafio Nodejs Editado",
        url:"https://google.com.br",
        techs:["Nodejs","React","Native"]
      });

    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to update a repository that does not exist', async () => {
    
    const response = await request(app)
      .put('/repositories/'+id_test.slice(0,-1)+'x')
      .send({
        title:"Desafio Nodejs Editado",
        url:"https://google.com.br",
        techs:["Nodejs","React","Native"]
      });

    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to update repository likes manually', async () => {
    
    const response = await request(app)
      .put('/repositories/'+id_test)
      .send({
        title:"Desafio Nodejs Editado",
        url:"https://google.com.br",
        techs:["Nodejs","React","Native"],
        likes:50 
      });

    expect(response.body).toHaveProperty('error');
  });

  it('should be able to like the repository', async () => {
    
    const response = await request(app)
      .put('/repositories/'+id_test+'/like');

    expect(response.body).toHaveProperty('title');
  });

  it('should not be able to like a repository that does not exist', async () => {
    
    const response = await request(app)
      .put('/repositories/'+id_test.slice(0,-1)+'x'+'/like');

    expect(response.body).toHaveProperty('error');
  });

  it('should be able to delete the repository', async () => {
    
    const response = await request(app)
      .delete('/repositories/'+id_test);

    expect(response.body).toHaveProperty('success');
  });

  it('should not be able to delete a repository that does not exist', async () => {
    
    const response = await request(app)
      .delete('/repositories/'+id_test.slice(0,-1)+'x');

    expect(response.body).toHaveProperty('error');
  });

  


});