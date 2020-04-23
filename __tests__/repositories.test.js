
const request = require('supertest');
const app = require('../src/app');

/*
function sum(a,b) {
  sum = a + b;
  return sum;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});*/

describe('Repositories', () => { 

  it('Should be able list', async () => {
    const response = await request(app)
      .get('/repositories');

    expect(response.body).toHaveProperty('repositories');
  });

  it('Should be able post a new repositories', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        title:"Desafio Nodejs",
        url:"https://google.com.br",
        techs:["Nodejs","React","Native"]
      });

    expect(response.body).toHaveProperty('title');
  });


});