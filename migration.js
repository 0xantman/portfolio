
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/database.db', (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('conected to the db')
});

db.serialize(function(){
    db.run('DROP TABLE IF EXISTS Message');

    db.run(`CREATE TABLE Message(
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        unread BOOL DEFAULT 0
        )`)
});
