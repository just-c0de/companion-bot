const mysql = require('mysql');

let store = {}
exports.store = store

function getTopics(userId) {
    let db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'secret',
        database : 'companion'
    });

    db.connect();

    let callback = function (error, results, fields) {
        if (error) return
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].name)
        }
    }

    db.query('SELECT * FROM topics WHERE userId = ' + userId, callback);

    db.end();
}
getTopics(1)
