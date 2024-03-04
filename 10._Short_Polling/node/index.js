import express from 'express';

const app = express();

app.use(express.static('public'));

const randomNumber = [];

app.get("/randonNumbers", (req, res) => {
  res.send({data: getRandomInt(1, 100)});
})

app.post("/simulateNewRandomNumbers", (req, res) => {
    const newNumber = getRandomInt(1, 100)
    randomNumber.push(newNumber);
    res.send({data: newNumber});
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

