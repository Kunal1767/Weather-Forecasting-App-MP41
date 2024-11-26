const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);
const dbName = 'weatherForecast';
let db, forecastsCollection;

app.use(express.json());

client.connect()
    .then(() => {
        console.log("Connected to MongoDB");
        db = client.db(dbName);
        forecastsCollection = db.collection('forecasts');
    })
    .catch((error) => console.error("Error connecting to MongoDB:", error));

app.post('/api/history', async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).send({ error: "Field 'data' is required." });
    }

    try {
        await historyCollection.insertOne({ data, timestamp: new Date() });
        res.status(201).send({ message: "History saved successfully!" });
    } catch (error) {
        res.status(500).send({ error: "Failed to save history" });
    }
});

app.get('/api/history', async (req, res) => {
    try {
        const history = await historyCollection.find().toArray();
        res.status(200).send(history);
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve history" });
    }
});

app.get("/", (req, res) => {
    res.send("hello friend, this is our backend home page ");
});
app.listen(port, () => {
    console.log(`Weather forecast app listening at http://localhost:${port}`);
  });