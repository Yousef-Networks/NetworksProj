




var express = require('express');
const session = require('express-session');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var alert = require('alert');
const { get } = require('http');
app.use(session({
  name: 'cities',
  secret: 'secret',
  httpOnly: true,
  resave: false,
  saveUninitialized: false,

}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function (req, res) {
  res.render('login')
});
app.get('/annapurna', function (req, res) {
  if(req.session.username)
  res.render('annapurna');
  else
  res.redirect('/');
});
app.get('/bali', function (req, res) {
  if(req.session.username)
  res.render('bali');
  else
  res.redirect('/');
});
app.get('/cities', function (req, res) {
  if(req.session.username)
  res.render('cities');
  else
  res.redirect('/');
});
app.get('/hiking', function (req, res) {
  if(req.session.username)
  res.render('hiking');
  else
  res.redirect('/');
});
app.get('/home', function (req, res) {
 if(req.session.username)
  res.render('home');
  else
  res.redirect('/');
  
});
app.get('/inca', function (req, res) {
  if(req.session.username)
  res.render('inca');
  else
  res.redirect('/');
});
app.get('/islands', function (req, res) {
  if(req.session.username)
  res.render('islands');
  else
  res.redirect('/');
});
app.get('/paris', function (req, res) {
  if(req.session.username)
  res.render('paris');
  else
  res.redirect('/');
});
app.get('/registration', function (req, res) {
  
  res.render('registration')
  
});
app.get('/rome', function (req, res) {
  if(req.session.username)
  res.render('rome');
  else
  res.redirect('/');
});
app.get('/santorini', function (req, res) {
  if(req.session.username)
  res.render('santorini');
  else
  res.redirect('/');
});
app.get('/searchresults', function (req, res) {
  if(req.session.username)
  res.render('searchresults');
  else
  res.redirect('/');
});
 
app.get('/wanttogo', function (req, res) {
  if(req.session.username){
    MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
  var db = client.db('myDB');
  db.collection('myCollection').find({username:req.session.username}).toArray(function (err, results) {
    res.render('wanttogo',{list:results[0].list})
  });
});
  }
  else
  res.redirect('/');
});

MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
  var db = client.db('myDB');


  db.collection('myCollection').find().toArray(function (err, results) {
    
  });
});

app.post('/', async function (req, res) {
  username1 = req.body.username;
  password1 = req.body.password;

  // console.log(username1)
  // console.log(password1)


  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    var db = client.db('myDB');
    db.collection('myCollection').find({ username: username1 }).toArray((err, users) => {


      if (users.length > 0) {
        if (users[0].password == password1) {
          req.session.username = username1;
          res.redirect('/home');
        } else {
          alert("You have entered wrong password")
          res.redirect('/');
        }
      }
      else if (username1 != "") {
        alert("Username doesn't exist, please try again")
      }
      else {
        alert("Username is empty")
      }
    });

  });
});

app.post('/addbali', async function (req, res) {
  
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
   if (err) throw err
  var db = client.db('myDB');
     db.collection('myCollection').findOne({username:req.session.username},function(err,users) {
        if(err)console.log(err);
        else{
          
          if((users.list).includes("bali")){
            alert("Bali is already in your Want-To-GO")
            res.render("bali");
             }
           else {
            users.list[users.list.length]="bali";
            db.collection('myCollection').updateOne({username:req.session.username},{$set:{list:users.list}},function(err,result){
              if(err)console.log(err);
            });
           
        }
      }
     
    })
});

});
app.post('/addinca', async function (req, res) {
  
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
   if (err) throw err
  var db = client.db('myDB');
     db.collection('myCollection').findOne({username:req.session.username},function(err,users) {
        if(err)console.log(err);
        else{
          
          if((users.list).includes("inca")){
            alert("Inca is already in your Want-To-Go")
            res.render("inca");
             }
           else {
            users.list[users.list.length]="inca";
            db.collection('myCollection').updateOne({username:req.session.username},{$set:{list:users.list}},function(err,result){
              if(err)console.log(err);
            });
           
        }
      }
     
    })
});

});
  


app.post('/addparis', async function (req, res) {
  
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
   if (err) throw err
  var db = client.db('myDB');
     db.collection('myCollection').findOne({username:req.session.username},function(err,users) {
        if(err)console.log(err);
        else{
          
          if((users.list).includes("paris")){
            alert("Paris is already in your Want-To-Go");
            res.render("paris");
             }
           else {
            users.list[users.list.length]="paris";
            db.collection('myCollection').updateOne({username:req.session.username},{$set:{list:users.list}},function(err,result){
              if(err)console.log(err);
            });
           
        }
      }
     
    })
});

});
app.post('/addrome', async function (req, res) {
  
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
   if (err) throw err
  var db = client.db('myDB');
     db.collection('myCollection').findOne({username:req.session.username},function(err,users) {
        if(err)console.log(err);
        else{
          
          if((users.list).includes("rome")){
            alert("Rome is already in your Want-To-Go");
            res.render("rome");
             }
           else {
            users.list[users.list.length]="rome";
            db.collection('myCollection').updateOne({username:req.session.username},{$set:{list:users.list}},function(err,result){
              if(err)console.log(err);
            });
           
        }
      }
     
    })
});

});
app.post('/addsantorini', async function (req, res) {
  
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
   if (err) throw err
  var db = client.db('myDB');
     db.collection('myCollection').findOne({username:req.session.username},function(err,users) {
        if(err)console.log(err);
        else{
          
          if((users.list).includes("santorini")){
            alert("Santorini is already in your Want-To-Go");
            res.render("santorini");
             }
           else {
            users.list[users.list.length]="santorini";
            db.collection('myCollection').updateOne({username:req.session.username},{$set:{list:users.list}},function(err,result){
              if(err)console.log(err);
            });
           
        }
      }
     
    })
});

});
app.post('/addannapurna', async function (req, res) {
  
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
   if (err) throw err
  var db = client.db('myDB');
     db.collection('myCollection').findOne({username:req.session.username},function(err,users) {
        if(err)console.log(err);
        else{
          
          if((users.list).includes("annapurna")){
            alert("Annapurna is already in your Want-To-Go");
            res.render("annapurna");
             }
           else {
            users.list[users.list.length]="annapurna";
            db.collection('myCollection').updateOne({username:req.session.username},{$set:{list:users.list}},function(err,result){
              if(err)console.log(err);
            });
           
        }
      }
     
    })
});

});



app.post('/registration', async function (req, res) {
  username1 = req.body.username;
  password1 = req.body.password;
  req.session.user = {
    username1,
    isLoggedIn: true,
  }
  try {
    await req.session.save();
  } catch (err) {
    console.error('Error saving to session storage: ', err);
    return next(new Error('Error creating user'));
  }
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    var db = client.db('myDB');
    client.db('myDB').collection('myCollection').insertOne({ username: username1, password: password1, list:[]});
    db.collection('myCollection').find().toArray(function (err, results) {
      console.log(results)
    });
  });
  res.redirect('/');
  alert("registration was successful")
  res.status(200).send();
})


function getAllSubstrings(s) {
  let i, j, res = [];

  for (i = 0; i < s.length; i++) {
      for (j = i + 1; j < s.length + 1; j++) {
          res.push(s.slice(i, j));
      }
  }
  return res;
}
// let subs=[{city:"rome", subs:getAllSubstrings("rome")},
// {city:"bali", subs:getAllSubstrings("bali")},
// {city:"annapurna", subs:getAllSubstrings("annapurna")},
// {city:"inca", subs:getAllSubstrings("inca")},
// {city:"paris", subs:getAllSubstrings("paris")},
// {city:"santroini", subs:getAllSubstrings("santorini")}];

var baliSub= getAllSubstrings("bali");
var romeSub= getAllSubstrings("rome");
var parisSub= getAllSubstrings("paris");
var incaSub= getAllSubstrings("inca");
var santoriniSub= getAllSubstrings("santorini");
var annapurnaSub= getAllSubstrings("annapurna");
 var output=[];

app.post('/search',function (req,res){
  if(req.session.username){
    var x = req.body.Search;
    if(baliSub.includes(x.toLowerCase())){
      output.push({title:'bali'});
    }
    if(romeSub.includes(x.toLowerCase())){
      output.push({title:'rome'});
    }
    if(annapurnaSub.includes(x.toLowerCase())){
      output.push({title:'annapurna'});
    }
    if(incaSub.includes(x.toLowerCase())){
      output.push({title:'inca'});
    }
    if(parisSub.includes(x.toLowerCase())){
      output.push({title:'paris'});
    }
    if(santoriniSub.includes(x.toLowerCase())){
      output.push({title:'santorini'});
    }
    res.render('searchresults',{output});
    output=[];}
});

app.listen(3000);