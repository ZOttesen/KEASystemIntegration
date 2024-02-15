import express from 'express';

const app = express();

const PORT = 8080;

app.get('/requestFastAPI', (req, res) => {
    res.send({"message": "Hello from FastAPI"});
});
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})
