import fetch from "node-fetch";

const tableHtml = await fetch("../views/index.ejs");

let tableHtmlText = tableHtml.text();

console.log(tableHtmlText);
