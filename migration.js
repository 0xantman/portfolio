
const sqlite3 = require('sqlite3');
const env = require('dotenv').config();

const db = new sqlite3.Database('./db/database.db', (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('conected to the db ')
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
        full_name TEXT,
        birthday TEXT,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        username TEXT,
        website_link TEXT,
        biography TEXT,
        image TEXT
        )`, (err) => {

            if (err) throw err;

            db.run("INSERT INTO Admin(email, password) VALUES($email, $password)", { 
                //INSERT the password and email in DB according your env file. 
                $email :  process.env.DEFAULT_EMAIL,
                $password : process.env.DEFAULT_PASSWORD
            })
            
        });
    
    db.run(`CREATE TABLE IF NOT EXISTS Portfolio(
        id INTEGER PRIMARY KEY,
        content TEXT NOT NULL,
        date_start TEXT,
        date_end TEXT,
        date_time TEXT DEFAULT CURRENT_TIMESTAMP
    )`);


    
    // You lost your password ? UPDATE the password in DB according your env file. 
    // Uncomment above code and run node migration.js with your newly password at .env file
    
    /* 

    db.run("UPDATE Admin SET email = $email AND password = $password", {
        $email : process.env.DEFAULT_EMAIL,
        $password : process.env.DEFAULT_PASSWORD
    });

    */
    
    
    //db.run("UPDATE Admin SET email = 'rico@mail.com' AND password = 'admin' WHERE id = 1");
    //db.run("ALTER TABLE Message ADD archive BOOL DEFAULT 0");
    //db.run("UPDATE Admin SET biography = 'const <span style=''color:#21D0C9''>hero</span> = ''<span style=''color:#96734D''>Full Stack Web Engineer</span>''; <span style=''color:#2CC0D0''>console</span>.<span style=''color:#34ADD1''>log</span>(<span style=''color:#E7DC6C''>`</span>${<span style=''color:#21D0C9''>hero</span>} <span style=''color:#96734D''>Ready for new mission... Waiting...`</span>);' WHERE id = 1");
});
