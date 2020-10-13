const express = require('express');
const mongoose = require("mongoose")
const cors  = require("cors")
const app = express();
const uri = "mongodb+srv://raymondjay:iamlegendary11@cluster0.h2o1d.mongodb.net/dbCollection?retryWrites=true&w=majority";

app.use(cors())
app.use(express.json())

mongoose.connect(uri, (err, db) => {
    if (err) {
        throw err
    }else {
        console.log("Connected to Database!")
        app.get("/allData", (req, res) => {
            db.collection("studentsnames").find({}).toArray((err, result) => {
                res.send(result)
            })
        })
        app.post("/addAnswers", (req, res) => {
            db.collection("studentsnames").insertOne(req.body, (err, result) => {
                res.send(true)
            })
        })
    }
})


app.listen(3000, () => {console.log("Listening to port 3000")})