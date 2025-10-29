// Gera dados de exemplo com Faker (esqueleto)
const { faker } = require('@faker-js/faker');

function generateUsuarios(n = 10) {
  const users = [];
  for (let i = 0; i < n; i++) {
    users.push({
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: 'placeholder' // substituir por hash quando for seed real
    });
  }
  return users;
}

module.exports = { generateUsuarios };