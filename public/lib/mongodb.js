const MongoClient = require("mongodb").MongoClient;
const _WriteData = require("./StockData.js");

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

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
const Disconnect = async () => {
  try {
    await client.close();
  } catch (e) {
    console.error(e);
  }
};
Disconnect().catch(console.error);

const getDB = async () => {
  return _db;
};

// Update Collection with the Schema
const UpdateDocument = async (documentName = " ", data = {}) => {
  if (documentName == " ") return;

  await Connect();

  try {
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
const DoesDocumentsExistList = async (documentList = " ") => {
  if (documentList == " ") return;

  await Connect();

  for (let i = 0; i < documentList.length; i++) {
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
    await _WriteData.WriteData(documentList[i]);
  }
};

const insertDocumentData = async (newStockJSON) => {
  await _db.collection("SandP500Stocks").insertOne(newStockJSON);
};

module.export = { UpdateDocument, DoesDocumentsExistList, getDB };
