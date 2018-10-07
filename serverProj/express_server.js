//These are my global variables, dependencies, and functions

var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
var cookieSession = require('cookie-session')
const bcrypt = require('bcrypt');
var app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cookieSession({
  name: 'session',
  keys: ['avastYeSwarthyLubbers'],
  maxAge: 24 * 60 * 60 * 1000
}))

function generateRandomString() {
  let r = Math.random().toString(36).substring(7);
  return r;
}

function currentUser(req) {
  let uid = req.session.user_id
  console.log("this is the iud", uid);
  return uid
}

// These are my global objects

var urlDatabase = {default: {"b2xVn2": "http://www.lighthouselabs.ca"}
};

const users = {
  "testUserID": {
    id: "testUserID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
}

// These are my app.gets

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/error", (req, res) => {
  return res.render("urls_error");
});

app.get("/login", (req, res) => {
    res.render("_login");
});

app.get("/", (req, res) => {

  if(currentUser(req)) {
    res.redirect("/urls");
    return;
  }
  return res.render("_hello");
});

app.get("/register", (req, res) => {

  if(currentUser(req)) {
    res.redirect("/urls");
    return;
  }
  let templateVars = {
    user : currentUser(req)
  }
  return res.render("urls_register", templateVars);
});

app.get("/urls", (req, res) => {

  if(!currentUser(req)) {
    res.render("urls_error");
    return;
  }
  let myUserId = currentUser(req).id
  let templateVars = { urls: urlDatabase,
                       user : currentUser(req),
                       myUserId : myUserId};
  return res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {

  if(!currentUser(req)) {
    res.render("urls_error");
    return;
  }
  let templateVars = {
    user : currentUser(req)
  }
  return res.render("urls_new", templateVars);
});

app.get("/u/:shortURL", (req, res) => {

if(!currentUser(req)) {
    res.render("urls_error");
    return;
  }
  let longURL;
  for(var key1 in urlDatabase){
    for(var key2 in urlDatabase[key1]){
      if(key2 = req.params.shortURL)
      longURL = urlDatabase[key1][key2];
    }
  }
  return res.redirect(longURL);
});

app.get("/urls/:id", (req, res) => {

  if(!currentUser(req)) {
    res.render("urls_error");
    return;
  }

  let longURL;

  for(var key1 in urlDatabase){
    for(var key2 in urlDatabase[key1]){
      if(key2 = req.params.id)
      longURL = urlDatabase[key1][key2];
    }
  }

  let templateVars = {
    shortURL: req.params.id,
    longUrl : longURL,
    user : currentUser(req)};
  return res.render("urls_show", templateVars);
})

app.get("/login", (req, res) => {
  return res.render("_login");
});

//These are my app.posts

app.post("/urls", (req, res) => {
  let randomNum = generateRandomString();
  var userKey = currentUser(req).id;

  if (urlDatabase[userKey]) {
    urlDatabase[userKey][randomNum] = req.body.longURL;
  } else {
    urlDatabase[currentUser(req).id] = {[randomNum]: req.body.longURL};
  }

  return res.redirect("http://localhost:8080/urls/");
});

app.post("/urls/:id/delete", (req, res) => {
var userKey = currentUser(req).id;

  for(var key in urlDatabase[userKey]) {
    if (req.params.id === key ) {
      delete urlDatabase[userKey][key];
    }
    console.log(urlDatabase);
  }

  return res.redirect("/urls/");
});

app.post("/urls/:id", (req, res) => {

  for(var key1 in urlDatabase){
    for(var key2 in urlDatabase[key1]){
      if(key2 = req.params.id)
      urlDatabase[key1][key2] = req.body.longURL;
    }
  }

  return res.redirect("http://localhost:8080/urls/");
});

app.post("/login", (req, res) => {

  if (req.body.email && req.body.password) {
    for (let key in users) {
      if (req.body.email === users[key].email) {
        if(bcrypt.compareSync(req.body.password, users[key].password)) {
          req.session.user_id = users[key];
          return res.redirect("http://localhost:8080/urls");
        } else {
          return res.status(403).send('Arrrr...wrong pwd!');
        }
      }
    }
    return res.status(404).send('Arrrr...ye ought to register first, Mate-y!');
  } else {
    return res.status(400).send('Arrrr...ye mis-typed yer email or password!');
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  return res.redirect("http://localhost:8080/");
});

app.post("/register", (req, res) => {

  if(!req.body.email || !req.body.password) {
    return res.status(400).send('Avast! You forgot to give your name or password!');
  };

  for (let key in users) {
    if(req.body.email === users[key].email) {
      return res.status(400).send('Arrrr...ye already registered! Do you want to login?');
    }
  };

  let randomNum = generateRandomString();
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

   users[randomNum] = { id: randomNum,
                       email: req.body.email,
                       password: hashedPassword};
  req.session.user_id = randomNum;
  return res.redirect("http://localhost:8080/login");
});

