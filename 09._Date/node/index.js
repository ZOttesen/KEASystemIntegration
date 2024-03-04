console.log(new Date())

console.log(Date())

console.log(Date.now())


const date = new Date();

const danishDate = new Intl.DateTimeFormat("dk-DK").format(date);
console.log(danishDate);
const americanDate = new Intl.DateTimeFormat("en-US").format(date);
console.log(americanDate);