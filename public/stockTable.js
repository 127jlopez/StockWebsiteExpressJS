import fs from "fs";
import * as cheerio from "cheerio";
import { getStockData } from "./ParseFromDatabase.js";
import fetch from "node-fetch";

// Get stock data
let array = [];
array = await getStockData();

console.log("Calling stockTable Script");
let old = document.querySelector("script#replace_with_stock_table");
old.parentNode.removeChild(old);
