import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Express.js API!");
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})