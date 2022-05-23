"use strict";
const _Fetch = require("node-fetch");
const _Dotenv = require("dotenv").config();

const getDataYahoo = async (tickerySymbol) => {
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
    const res = await _Fetch.fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}; // end of Method
getDataYahoo().catch(console.error);

module.exports = { getDataYahoo };
