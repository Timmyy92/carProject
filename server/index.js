const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URI } = require('./config/env')
const bodyparser = require('body-parser')
const cors = require('cors');

mongoose.set('strictQuery', false);
mongoose.connect(String(MONGODB_URI), function (err) {

    if (err) return console.error(err);
    console.log("db set");
})

const PORT = 5000;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyparser.json())
app.use(cors(
    {
        origin: ["http://localhost:3000"]
    }
))


app.use('/api ', require("./routes/post.routes"))

app.get('/', (req, res) => {
    res.render('')
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});