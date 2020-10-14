const express = require('express');
const port = process.env.PORT || 8080
const mongoose = require("mongoose")
const cors  = require("cors")
const app = express();
const uri = "mongodb+srv://raymondjay:iamlegendary11@cluster0.h2o1d.mongodb.net/dbCollection?retryWrites=true&w=majority";

var mongoCollection = ""

app.use(cors())
app.use(express.json())

mongoose.connect(uri, (err, db) => {
    if (err) {
        throw err
    }else {
        console.log("Successfully Connected to Database!")
        mongoCollection = db.collection("studentsnames")
    }
})

app.get('/', (req, res) => {
    res.send("Connected to Database!")
})
console.log("Connected to Database!")
app.get("/allData", (req, res) => {
    mongoCollection.find({}).toArray((err, result) => {
        res.send(result)
    })
})
app.post("/addAnswers", (req, res) => {
    mongoCollection.insertOne(req.body, (err, result) => {
        res.send(true)
    })
})



app.listen(port, () => {console.log("Listening to port "+port)})