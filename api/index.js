import questionRoutes from './routes/question/question';
import answerRoutes from './routes/answer/answer';
import userRoutes from './routes/user/user';
import authRoutes from './routes/auth/auth';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.APP_PORT;
import cors from 'cors';

app.use(bodyParser.json());
app.use(cors());

app.use('/question', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Ask.it app listening at http://localhost:${port}`);
});