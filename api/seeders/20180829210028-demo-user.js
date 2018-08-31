module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'demo',
    lastName: 'demo',
    email: 'demo@demo.com',
    password: '$2a$10$JUP3TuPJ6vHr4SPg4qoNIOmBnZPwCq1yul3OcZjIHew016l7YgrFG',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})

};