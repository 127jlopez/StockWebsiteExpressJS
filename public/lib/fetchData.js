"use strict";
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
async function getDataYahoo(tickerySymbol) {
  if (tickerySymbol == undefined) return;
  try {
    const url =
      "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=" +
      tickerySymbol;

    const options = {
      method: "GET",
      headers: {
        "x-api-key": process.env.YAHOOAPIKEY,
      },
    };
    const res = await fetch.fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
} // end of Method
getDataYahoo().catch(console.error);

module.exports = { getDataYahoo };
