import fs from "fs";

/*const response = await fetch('https://www.proshop.dk/Baerbar-computer');
const result = await response.text();

fs.writeFileSync("index.html", result);*/



const htmlPageString = fs.readFileSync("index.html").toString();

import {load} from "cheerio";


const $ = load(htmlPageString);

$("#products [product]").each((index, element) => {
    const description = $(element).find(".site-product-link").text();
    console.log(description);
    const price = $(element).find(".site-currency-lg").text();
    console.log(price);
});


/*
import cheerio from "cheerio";

const htmlPage = cheerio.load();*/