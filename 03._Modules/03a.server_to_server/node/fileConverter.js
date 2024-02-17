import neatCsv from "neat-csv";
import xml2js from 'xml2js';
import yaml from 'js-yaml';
import fs from 'fs';


const jsonParser = async (file) => {
    const data = (await fs.promises.readFile(file, 'utf-8')).replace(/^\uFEFF/, '')
    return JSON.parse(data);
}
const csvParser = async (file) => {
    return await neatCsv(await fs.promises.readFile(file, 'utf-8'));
}

const xmlParser = async (file) => {
    const data = await fs.promises.readFile(file, 'utf-8');
    const parser = new xml2js.Parser({ explicitArray: false });
    return parser.parseStringPromise(data);
}

const yamlParser = async (file) => {
    const data = await fs.promises.readFile(file, 'utf-8');
    return yaml.load(data);
};

export { yamlParser, xmlParser, csvParser, jsonParser};