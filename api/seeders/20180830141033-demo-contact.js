module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Contacts', [{
    firstName: 'demo',
    lastName: 'demo',
    phone: '99999999999',
    email: 'demo@demo.com',
    photo: '',
    address: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Contacts', null, {})
};
