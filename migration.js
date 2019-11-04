
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/database.db', (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('conected to the db')
});

db.serialize(function(){

    db.run(`CREATE TABLE IF NOT EXISTS Message(
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        unread BOOL DEFAULT 0,
        date_time TEXT DEFAULT CURRENT_TIMESTAMP,
        archive BOOL DEFAULT 0
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS Admin(
        id INTEGER PRIMARY KEY,
        full_name TEXT NOT NULL DEFAULT 'Marco Paulo',
        birthday TEXT NOT NULL DEFAULT '05/09/1990',
        email TEXT NOT NULL DEFAULT 'rico@mail.com',
        password TEXT NOT NULL DEFAULT 'admin',
        username TEXT,
        website_link TEXT,
        biography TEXT,
        image TEXT
        )`);
    
    //db.run("UPDATE Admin SET email = 'rico@mail.com' WHERE id = 1");
    //db.run("ALTER TABLE Message ADD archive BOOL DEFAULT 0");
    //db.run("UPDATE Admin SET biography = 'const <span style=''color:#21D0C9''>hero</span> = ''<span style=''color:#96734D''>Full Stack Web Engineer</span>''; <span style=''color:#2CC0D0''>console</span>.<span style=''color:#34ADD1''>log</span>(<span style=''color:#E7DC6C''>`</span>${<span style=''color:#21D0C9''>hero</span>} <span style=''color:#96734D''>Ready for new mission... Waiting...`</span>);' WHERE id = 1");
});
