const MongoClient = require("mongodb").MongoClient;
const _StockData = require("./StockData.js");
const _Dotenv = require("dotenv");
const results = _Dotenv.config();

if (results.error) {
  console.log(results);
}

const url = process.env.MONGODB_URL;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

// Open connection to database
const Connect = async () => {
  try {
    await client.connect();
    _db = client.db("Stocks");
    console.log("connected to MongoDB.");
  } catch (e) {
    console.error(e);
  }
};
Connect().catch(console.error);

// Close connection to database
/*const Disconnect = async () => {
  try {
    await client.close();
  } catch (e) {
    console.error(e);
  }
};
Disconnect().catch(console.error); */

const getDB = async () => {
  try {
    return _db;
  } catch (err) {
    console.error(err);
  }
};
getDB().catch(console.error);

// Update Collection with the Schema
const UpdateDocument = async (documentName, data = {}) => {
  if (documentName == undefined) return;

  try {
    console.log("Inside UpdateDocument");
    const stock = await _db
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
const DoesDocumentsExistList = async (documentList) => {
  if (documentList == undefined) return;

  try {
    for (let i = 0; i < documentList.length; i++) {
      console.log("Inside DoesDocumentsExistList");
      const stock = await _db
        .collection("SandP500Stocks")
        .findOne({ tickerSymbol: documentList[i] });

      let newStockJSON = {
        tickerSymbol: documentList[i],
        currentPrice: 0,
        deltaPricePercentageFromLow: 0,
        deltaPricePercentageFromHigh: 0,
        lastUpdateTime: 0,
      };

      if (stock == null) {
        insertDocumentData(newStockJSON);
        console.log("inserting new doument: " + documentList[i]);
      }
      await _StockData.WriteData(documentList[i]);
    }
  } catch (err) {
    console.error(err);
  }
};
DoesDocumentsExistList().catch(console.error);

const insertDocumentData = async (newStockJSON) => {
  if (newStockJSON == undefined) return;
  try {
    await Connect();
    console.log("Inside insertDocumentData");
    await _db.collection("SandP500Stocks").insertOne(newStockJSON);
  } catch (err) {
    console.error(err);
  }
};
insertDocumentData().catch(console.error);

module.exports = { UpdateDocument, DoesDocumentsExistList, getDB };
