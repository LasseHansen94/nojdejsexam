const mongoClient = require("mongodb").MongoClient;
const connectionUrl = "mongodb://localhost:27017";
const dbName = "lassedb";
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lassedb', {useNewUrlParser: true, useUnifiedTopology: true});

mongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw "Error connecting to mongodb " + error;
    }
    const lasseDB = client.db(dbName);
    const buildings = lasseDB.collection('educations');

    buildings.insertOne({ "name": "Aabenraa Statsskole"}, (error, success) => {
        client.close();
    });
});