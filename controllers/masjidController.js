const mongoose = require('mongoose')
const Masjid = require('../models/MasjidModel')

const getMasjids = async (req, res) => {
    const masjids = await Masjid.find({})

    res.status(200).json(masjids)
}



// const MongoClient = require('mongodb').MongoClient;
// const fs = require('fs');

// const excelData = fs.readFileSync('./Data/masjid.json');

// const jsonData = JSON.parse(excelData);

// const uri = 'mongodb+srv://noor:9ZNgRpjbdcUy7o3C@cluster0.ncrsngi.mongodb.net/?retryWrites=true&w=majority';
// // mongodb+srv://noor:9ZNgRpjbdcUy7o3C@cluster0.ncrsngi.mongodb.net/?retryWrites=true&w=majority
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const getMasjids = async (req, res) => {
//     try {
//     await client.connect();
//     const database = client.db('test');
//     const collection = database.collection('masjids');
//     const result = await collection.insertMany(jsonData);
//     console.log(`${result.insertedCount} documents inserted.`);
//   } finally {
//     await client.close();
//   }
// }

// getMasjids().catch(console.error);


module.exports = {
    getMasjids
}