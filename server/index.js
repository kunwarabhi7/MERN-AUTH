import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './db/connectdb.js';
import { authRouter } from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env. PORT || 5000;
app.use(express.json());  // allow us to parse incoming json request

app.get('/', (req, res) => {
    res.send('Hello World! I love nidhi ❤️');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started on port ' + PORT);
});