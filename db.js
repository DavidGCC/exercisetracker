const Pool = require("pg").Pool;


// const poolConf = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME
// };

const pool = new Pool({ connectionString: process.env.DB_REMOTE });

module.exports = pool;