import express from 'express';

const app = express();
app.use(express.json());

app.post('/request', async (req, res) => {
    const data = req.body;

    try {
        const dataFromFetch = await fetch('https://long.serveo.net/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(await dataFromFetch.json());
    }catch (error) {
        console.error('Error sending data to long.servio.net:', error);
    }
    res.status(200).send('OK');
});

app.delete('/delete', async (req, res) => {
    const data = req.body;

    try {
        const dataFromFetch = await fetch('https://long.serveo.net/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(await dataFromFetch.json());
    }catch (error) {
        console.error('Error sending data to long.servio.net:', error);
    }
    res.status(200).send('OK');
});

app.get('/ping', async (req, res) => {

    try {
        await fetch('https://long.serveo.net/ping', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
    }catch (error) {
        console.error('Error sending data to long.servio.net:', error);
    }
    res.status(200).send('OK');
});

app.post('/webhook', (req, res) => {
    console.log(req.body);
    res.status(204);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});