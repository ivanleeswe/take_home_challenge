const { faker } = require('@faker-js/faker');

const database = {
  users: []
};

for (let i = 1; i <= 12; i++) {
  const user = {
    id: i.toString(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar()
  }
  database.users.push(user);
}
console.log(JSON.stringify(database));