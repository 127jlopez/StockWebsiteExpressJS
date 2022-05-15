import fs from "fs";
import * as cheerio from "cheerio";
import { getStockData } from "./ParseFromDatabase.js";

let array = [];

array = await getStockData();

console.log(array);
