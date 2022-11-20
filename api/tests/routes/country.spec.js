/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
  describe('GET /recipes/:idReceta', () => {
    it('should get 200', () =>
      agent.get('/recipes/10').expect(200)
    );
  });
  describe('GET /recipes/:idReceta', () => {
    it('should get 404', () =>
      agent.get('/recipes/randomStuff').expect(404)
    );
  });
  describe(`GET /recipes/${recipe.title}`, () => {
    it('should get 200', () =>
      agent.get(`/recipes?name=${recipe.title}`).expect(200)
    );
  });
});
