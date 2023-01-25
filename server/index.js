require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDb = require('./libs/connectDb');
connectDb();

const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('api running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/groups', require('./routes/api/groups'));
app.use('/api/conversations', require('./routes/api/conversations'));
app.use('/api/messages', require('./routes/api/messages'));

const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT, () =>
  console.log(`Server  started on port ${PORT}`)
);
