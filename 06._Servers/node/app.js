import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send({message: 'Hello World!'});
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));