const {createPool} = require("mysql");


module.exports = createPool({
    // const pool = createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.MySQL_DB,
    connectionLimit: 10
});


// module.export = pool;