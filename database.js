const mysql = require('mysql');

const pool = mysql.createPool({
    user: 'root',
    password: process.env.PASS_MYSQL,
    database: 'aquamobnola_db',
    connectionLimit: 20
})

exports.pool = pool;


// connection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });