const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");
require('dotenv').config()


mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Connected to Database"))
    .catch(err => console.log(err));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
