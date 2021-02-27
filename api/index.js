// import controllers from './controllers'
import questionRoutes from './routes/question/question';
import answerRoutes from './routes/answer/answer';
import userRoutes from './routes/user/user';
import authRoutes from './routes/auth/auth';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.APP_PORT;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use('/question', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});