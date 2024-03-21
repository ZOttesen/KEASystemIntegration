import express from 'express';
import {xmlParser, yamlParser, csvParser, jsonParser} from "./fileConverter.js";
import fetch from 'node-fetch';
import https from 'https';

const app = express();

const PORT = 8080;

const agent = new https.Agent({
    rejectUnauthorized: false
});


app.get('/json', async (req, res) => {
    const data = await jsonParser('./files/me.json');
    res.send(data);
});
app.get('/csv', async (req, res) => {
    const data = await csvParser('./files/me.csv');
    res.send(data);
});
app.get('/yaml', async (req, res) => {
    const data = await yamlParser('./files/me.yaml');
    res.send(data);
});

app.get('/xml', async (req, res) => {
    const data = await xmlParser('./files/me.xml')
    res.send(data);
});

app.get("/csharpJson", async (req, res) => {
    try {
        const response = await fetch('https://localhost:44384/json', { agent });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

app.get("/csharpCSV", async (req, res) => {
    try {
        const response = await fetch('https://localhost:44384/csv', { agent });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});
app.get("/csharpXML", async (req, res) => {
    try {
        const response = await fetch('https://localhost:44384/xml', { agent });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});
app.get("/csharpYaml", async (req, res) => {
    try {
        const response = await fetch('https://localhost:44384/yaml', { agent });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));