//These are my global variables, dependencies, and functions

var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')


var app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

function generateRandomString() {
  let r = Math.random().toString(36).substring(7);
  return r;
}

// These are my global objects

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
}

// These are my app.gets

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase,
                       username : req.cookies["username"]
                     };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  let templateVars = {
    username : req.cookies["username"]
  }
  res.render("urls_new", templateVars);
});

app.get("/register", (req, res) => {
  let templateVars = {
    username : req.cookies["username"]
  }
  res.render("urls_register", templateVars);
});

//These are my app.posts

app.post("/urls", (req, res) => {
  let randomNum = generateRandomString();
  urlDatabase[ randomNum ] = req.body.longURL;
  res.redirect("http://localhost:8080/urls/" + randomNum);
});

app.get("/u/:shortURL", (req, res) => {
  let longURL;

    for(var key in urlDatabase) {
    if (req.params.shortURL === key ) {
      longURL = urlDatabase[key]
    }
  }
  res.redirect(longURL);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
  shortURL: req.params.id,
  longUrl : urlDatabase[req.params.id],
  username : req.cookies["username"]
  }
  res.render("urls_show", templateVars);
})

app.post("/urls/:id/delete", (req, res) => {
  console.log(req.params.id);

  for(var key in urlDatabase) {
    if (req.params.id === key ) {
      delete urlDatabase[key];
    }
  }
   res.redirect("/urls/");
});

app.post("/urls/:id", (req, res) => {
  console.log(req.params.id);
  for(var key in urlDatabase) {
    if (req.params.id === key ) {
      urlDatabase[key] = req.body.longURL;
    }
  }

  res.redirect("http://localhost:8080/urls/");
});

app.post("/login", (req, res) => {

  res.cookie('username', req.body.username)
  console.log(req.body)
  console.log(req.body.username)
  res.redirect("http://localhost:8080/urls/");
  });

app.post("/logout", (req, res) => {

  res.clearCookie("username", {});
  res.redirect("http://localhost:8080/urls");
  });

