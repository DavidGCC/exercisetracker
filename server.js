require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./db");
const { formUser } = require("./utility");


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
    const { ":_id": id, description, duration } = req.body;
    try {
        if (id && description && duration) {
            const date = req.body.date || new Date().toISOString().split("T")[0];
            await pool.query("INSERT INTO exercises (userid, description, duration, date) VALUES ($1, $2, $3, $4::date)", [id, description, duration, date]);
            const dbRes = await pool.query("SELECT * FROM users u INNER JOIN exercises e ON u.userid = e.userid WHERE u.userid = $1", [id]);
            res.json(formUser(dbRes.rows));
        } else {
            res.json({
                error: "id, duration and description is required"
            });
            return;
        }
    } catch (err) {
        res.json({
            error: err
        })
    }
});

app.get("/api/users/:id/exercises", async (req, res) => {
    const id = req.params.id;
    try {
            const dbRes = await pool.query("SELECT * FROM users u INNER JOIN exercises e ON u.userid = e.userid WHERE u.userid = $1", [id]);
            res.json(formUser(dbRes.rows));
    } catch (err) {
        res.json({
            error: err
        })
    }
})





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
