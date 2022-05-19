import { MongoClient } from "mongodb";
import { WriteData } from "./StockData.js";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

// Open connection to database
const Connect = async () => {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
};
Connect().catch(console.error);

// Close connection to database
const disconnect = async () => {
  try {
    await client.close();
  } catch (e) {
    console.error(e);
  }
};
disconnect().catch(console.error);

// Update Collection with the Schema
export const UpdateDocument = async (documentName = " ", data = {}) => {
  if (documentName == " ") return;

  await Connect();
  try {
    const stock = await client
      .db("Stocks")
      .collection("SandP500Stocks")
      .updateOne({ tickerSymbol: documentName }, { $set: data });
    console.log("Updated document: " + documentName);
  } catch (e) {
    if (documentName != undefined) {
      console.log("Collection: " + documentName + " does not exist.");
    }
    console.error(e);
  }
};
UpdateDocument().catch(console.error);

// finds document holding stock info by search by name
export const DoesDocumentsExistList = async (documentList = " ") => {
  if (documentList == " ") return;
  await Connect();

  for (let i = 0; i < documentList.length; i++) {
    const stock = await client
      .db("Stocks")
      .collection("SandP500Stocks")
      .findOne({ tickerSymbol: documentList[i] });

    let newStockJSON = {
      tickerSymbol: documentList[i],
      currentPrice: 0,
      deltaPricePercentageFromLow: 0,
      deltaPricePercentageFromHigh: 0,
    };

    if (stock == null) {
      insertDocumentData(newStockJSON);
      console.log("inserting new doument: " + documentList[i]);
    }
    await WriteData(documentList[i]);
  }
};

const insertDocumentData = async (newStockJSON) => {
  await client
    .db("Stocks")
    .collection("SandP500Stocks")
    .insertOne(newStockJSON);
};
