const express = require('express');
const userRouter = express.Router();
//const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const firebase = require('../firebase/firebase-config')
const database = firebase.database();



// var user = firebase.auth().currentUser;

// if (user) {
//   // User is signed in.
// } else {
//   // No user is signed in.
// }

/*let db = admin.firestore();
let adminRef = db.collection('admin').doc('users');

db.collection('admin').get()
  .then((snapshot) => {    
    if(adminRef.exists){
        console.log("fufuf")
      }else{
        let setAdmin = adminRef.set({
            email: 'rico@mail.com',
            password: 'admin',
        });
          
      }
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });*/



/*const db = new sqlite3.Database('./db/database.db', (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('conected to the db')
});*/
//get private token password
const jwtPass = process.env.JWT_SECRET_KEY;

userRouter.use('/login', (req, res, next) =>{
    if(req.body.password && req.body.email)
        firebase.auth().signInWithEmailAndPassword(req.body.email.trim().toLowerCase(), req.body.password).then(res => {
            const user = firebase.auth().currentUser;
            
            if(user){
                req.access = jwt.sign({user: req.body.email}, jwtPass);
                //jwt.sign({user: token}, jwtPass);
                next();
            }else{
                next("No user is signed in.");
            }
        }).catch(function(error) {
        // Handle Errors here.
            next(error);
        });
});

const isAdmin = (req, res, next) =>{
    
    if(req.headers.authorization){
        const headerSplit = req.headers.authorization.split(' ');
        const token = headerSplit[1];
        const user = firebase.auth().currentUser;
        //console.dir(token);
        // verify a token symmetric
        jwt.verify(token, jwtPass, function(err, decoded) {
            
            if(!err){
                
                if (user) {
                    req.uid = user.uid;
                    next();
                    // User is signed in.
                  } else {
                    next("No user is signed in.");
                    // No user is signed in.
                  }
                //res.status(200).json({data: "clean"});
            }else{
                //res.clearCookie("auth._token.local");
                next(err);
            }
        });
    }else{
        next('error admin not authorized');
    }
};

userRouter.post('/login', (req, res, next) =>{
    res.status(200).json({token: req.access});
})

//profile at home page public api
userRouter.get('/profile', (req, res, next) =>{
    
        var profileRef = firebase.database().ref('profile/');
        profileRef.once('value', function(snapshot) {
        if(snapshot.exists()){
                const data = snapshot.val();
                const profile = {
                    fullname : data.fullname,
                    birthday : data.birthday,
                    biography : data.biography,
                    username : data.username,
                    website : data.website,
                    image : data.image,
                    email: data.email

                }
                res.status(200).json({profile: profile});
        }
        else{
            res.status(204).send();
        }
        
    });
    
        
    
    
    
    
    //console.log(req.session);
    // db.get("SELECT * FROM Admin", (err, row) =>{
    //     if(err){
    //         res.status('404').send();
    //     }else{
    //         const data = {
    //             fullname : row.full_name,
    //             birthday : row.birthday,
    //             biography : row.biography,
    //             username : row.username,
    //             website : row.website_link,
    //             image : row.image,
    //             email: row.email

    //         }
    //         res.status(200).json({profile: data});
    //     }
    // })
})

// userRouter.get('/user/profile', isAdmin, (req, res, next) =>{
//     res.status(200).send('ok is authorized')
    
//     // db.get("SELECT * FROM Admin", (err, row) =>{
//     //     if(err){
//     //         res.status('404').send();
//     //     }else{
//     //         const data = {
//     //             email : row.email,
//     //             image : row.image,
//     //             fullname : row.full_name,
//     //             birthday : row.birthday,
//     //             biography : row.biography,
//     //             username : row.username,
//     //             website : row.website_link,
                
//     //         }
//     //         res.status(200).json({profile: data});
//     //     }
//     // });
// })
// Admin action update his profile
userRouter.post('/user/profile/update', isAdmin, (req, res, next) =>{
    const data = req.body;
   
    firebase.database().ref('profile/').set({
        email : data.email.trim().toLowerCase(),
        image : data.image,
        fullname : data.fullname,
        birthday : data.birthday,
        biography : data.biography,
        username : data.username,
        website : data.website
    }).then(() => {
        res.status(200).json({update: 'ok'});
    }).catch(err => {
        res.status(404).send();
    });
        
    // db.run(`UPDATE Admin SET 
    //     email = $email, 
    //     image = $image,
    //     full_name = $fullname,
    //     birthday = $birthday,
    //     biography = $biography,
    //     username = $username,
    //     website_link = $website`, updateData, (err, success) =>{
    //         if(err){
    //             console.error(err);
    //             res.status('404').send();
    //         }else{
    //             res.status(200).json({update: 'ok'});
    //         }
    //     });
});

// Get latest news message 
userRouter.get('/user/inbox/news', isAdmin, (req, res, next) =>{
    var inboxesRef = firebase.database().ref('inboxes/');
    inboxesRef.once('value', function(snapshot) {
        if(snapshot.exists()){
            
            const news = [];
         
            snapshot.forEach(el => {
                const data = el.val();
                if(!data.read && !data.archive || data.read && !data.archive){
                    const json = {
                        date: data.date_time,
                        email: data.email,
                        subject: data.subject,
                        unread: data.read,
                        id: el.key
                    }
                    news.push(json);
                }
            })
        
            res.status(200).json({new : news, inbox: true});
        }
        else{
            res.status(204).json({inbox: false})
        }
    })

});
// Get * archived message 
userRouter.get('/user/inbox/archive', isAdmin, (req, res, next) =>{

    var inboxesRef = firebase.database().ref('inboxes/');
    inboxesRef.once('value', function(snapshot) {
        if(snapshot.exists()){
            
            const news = [];
         
            snapshot.forEach(el => {
                const data = el.val();
                if(data.archive){
                    const json = {
                        date: data.date_time,
                        email: data.email,
                        subject: data.subject,
                        unread: data.read,
                        id: el.key
                    }
                    news.push(json);
                }
            })
            res.status(200).json({archive : news, inbox: true});
        }
        else{

            res.status(204).json({inbox: false})
        }
    })

});

// Count how many message is unread in the inbox for news and archive
userRouter.get('/user/inbox/count', isAdmin, (req, res, next) => {

    var inboxesRef = firebase.database().ref('inboxes/');
    inboxesRef.once('value', function(snapshot) {
        if(snapshot.exists()){
            
            let unreadCount = 0;
            let readCount = 0;
         
            snapshot.forEach(el => {
                const data = el.val();
              
                if(!data.read && data.archive){
                    readCount++
                }
                else if(!data.read && !data.archive){
                    unreadCount++;
                }
            })
        
            res.status(200).json({unread : unreadCount, read : readCount })
        }
        else{
            res.status(204).json({inbox: false})
        }
    })

});

// Admin action archive the message
userRouter.post('/user/inbox/action/archive', isAdmin, (req, res, next) => {

    req.body.data.forEach(element => {
     
        firebase.database().ref('inboxes/' + element.id).update({
            archive : true
        }).then(() => {
            res.status(200).json({success : true })
        }).catch(() => {
            res.status(401).json({success : false })
        });
        
    });
        
});

// Admin action delete the message
userRouter.post('/user/inbox/action/delete', isAdmin, (req, res, next) => {


        req.body.data.forEach(element => {
            
            firebase.database().ref('inboxes/' + element.id).remove()
            .then(() => {
                res.status(200).json({success : true })
            }).catch(() => {
                res.status(401).json({success : false })
            });

        });

});

//Update the message to read true and GET the message data 
userRouter.get('/user/my-inbox/:id', isAdmin, (req, res, next) =>{

    var inboxesRef = firebase.database().ref('inboxes/' + req.params.id);

    inboxesRef.update({
        read : true
    }).then(() => {
        inboxesRef.once('value', function(snapshot) {
            if(snapshot.exists()){
                const data = snapshot.val();
                res.status(200).json({message : data});
            }
            else{
                res.status(204).send();
            }
        })
    }).catch(() => {
        res.status(401).send();
    });

    
 
    // db.get("SELECT * FROM Message WHERE id = $id", param, (err, row) =>{
    //     if(err){

    //     }else{
    //         if(row){
    //             db.run("UPDATE Message SET unread = 1 WHERE id = $id ", param, (err, success) => {

    //             });
    //             res.status(200).json({message : row});
    //         }else{
       
    //         }
    //     }
    // })
});

userRouter.post('/user/my-portfolio/add', isAdmin, (req, res, next) =>{

    const data = req.body;
    firebase.database().ref('portfolio/').push({
        content : data.content,
        date_start : data.date_start,
        date_end : data.date_end,
        date_time : Date.now()
      }, (err) =>{
        if(err){
            res.status(500).json({error: err});
        }else{
            res.status(201).json({success: true});
        }
      });

    // db.run("INSERT INTO Portfolio(content, date_start, date_end) VALUES($content, $date_start, $date_end)", updateData, (err, success) =>{
    //     if(err){
    //         res.status(500).json({error: err});
    //     }else{
    //         res.status(201).json({success: true});
    //     }
    // })

});
userRouter.get('/user/my-portfolio', (req, res, next) =>{

    var portfolioRef = firebase.database().ref('portfolio/');
    portfolioRef.once('value', function(snapshot) {
        if(snapshot.exists()){

            const items = [];
            snapshot.forEach(el => {
                const data = el.val();
              
                const json = {
                    content : data.content,
                    date_start : data.date_start,
                    date_end : data.date_end,
                    date_time : data.date_time,
                    id : el.key
                }
                items.push(json);
                
            })

            res.status(200).json({data: items});
        }else{
            res.status(204).send();
        }
        
    })
    // db.all("SELECT * FROM Portfolio ORDER BY (CASE WHEN date_end = '' THEN 1 ELSE 0 END) DESC, date_end DESC", (err, rows) => {
    //    res.status(201).json({data: rows});
    // });

});

userRouter.get('/user/my-portfolio/:id', isAdmin, (req, res, next) =>{

    var portfolioRef = firebase.database().ref('portfolio/' + req.params.id);
    portfolioRef.once('value', function(snapshot) {
        if(snapshot.exists()){
            const data = snapshot.val();

            const item = {
                content : data.content,
                date_start : data.date_start,
                date_end : data.date_end,
                id: snapshot.key
            }

            res.status(200).json({data: item});
        }else{
            res.status(204).send();
        }
        
    })
    // db.get("SELECT * FROM Portfolio WHERE id = $id", data, (err, row) => {
    //     if(err){
    //         console.error(err)
    //     }
    //     else{
    //         res.status(201).json({post: row});
    //     }
       
    // });

});

userRouter.post('/user/my-portfolio/update', isAdmin, (req, res, next) =>{

    var inboxesRef = firebase.database().ref('portfolio/' + req.body.id);

    inboxesRef.update({
        content : req.body.content,
        date_start : req.body.date_start,
        date_end : req.body.date_end,
        date_time : Date.now()
    }).then(() => {
        res.status(201).send();
    }).catch(() => {
        res.status(401).send();
    });
    // db.run(`UPDATE Portfolio SET content = $content, date_start = $date_start,
    //  date_end = $date_end, date_time = CURRENT_TIMESTAMP WHERE id = $id`, data, (err, success) =>{
    //      if (!err){
    //         res.status(201).send();
    //      }else{
    //         res.status(404).send();
    //      }
    //  } )
});

userRouter.post('/user/my-portfolio/delete', isAdmin, (req, res, next) =>{
            
    firebase.database().ref('portfolio/' + req.body.id).remove()
    .then(() => {
        res.status(201).send();
    }).catch(() => {
        res.status(403).send();
    });

    // db.run("DELETE FROM Portfolio WHERE id = $id", data, (err)=>{
    //     if(!err){
    //         res.status(201).send();
    //     }else{
    //         res.status(404).send();
    //     }
    // })
    
});

userRouter.use((err, req, res, next) =>{
    console.error(err);
    res.status(403).send();
})

module.exports = userRouter;