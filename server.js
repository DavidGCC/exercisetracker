require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./db");


// mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => console.log("Connected to Database"))
//     .catch(err => console.log(err));

app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// CREATE USER
app.post("/api/users", async (req, res) => {
    try {
        const username = req.body.username;
        const dbRes = await pool.query("INSERT INTO Users (username) VALUES($1) RETURNING *", [username]);
        res.json(dbRes.rows[0]);
    } catch (err) {
        res.json({
            error: err.detail
        })
    }
});


// GET USERS
app.get("/api/users", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM Users");
        res.json(users.rows);
    } catch (err) {
        res.json({
            error: err.detail
        })
    }
});

// CREATE EXERCISE
app.post("/api/users/:id/exercises", async (req, res) => {

});






const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
