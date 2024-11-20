const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const {connectMongoDb} = require('./connection');

const app = express();
const PORT = 8000;

//middleware
app.use(bodyParser.json());

//Connection
connectMongoDb('mongodb://localhost:27017/app1');

//Routes
app.use('/api/users', userRouter);
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
