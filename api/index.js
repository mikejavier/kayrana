const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const contactController = require('./controllers/contactController');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userController);
app.use('/auth', authController);
app.use('/contacts', contactController);

app.get('/', (req, res) => res.end());

app.listen(3000, '0.0.0.0', () => {
  console.log('api running...');
});
