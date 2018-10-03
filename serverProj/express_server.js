var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

function generateRandomString() {
  let r = Math.random().toString(36).substring(7);
  return r;
}

// let randomNum = generateRandomString();

// var response = Response.redirect("this is your response bucko!",status);

// generateRandomString();

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// const templateVars = {};

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
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
  // console.log(templateVars.urls);
});

app.use(bodyParser.urlencoded({extended: true}));

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  let randomNum = generateRandomString();
  // console.log(req.body);  // debug statement to see POST parameters
  urlDatabase[ randomNum ] = req.body.longURL;
  // console.log(urlDatabase);
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
  longUrl : urlDatabase[req.params.id] }
  res.render("urls_show", templateVars);
})

app.post("/urls/:id/delete", (req, res) => {
  console.log(req.params.id);
  let templateVars = { urls: urlDatabase };
  for(var key in urlDatabase) {
    if (req.params.id === key ) {
      delete urlDatabase[key];
    }
  }
  res.render("urls_index", templateVars);
});

// ____________________
app.post("/urls/:id", (req, res) => {
  console.log(req.params.id);
  for(var key in urlDatabase) {
    if (req.params.id === key ) {
      urlDatabase[key] = req.body.longURL;
    }
  }

  res.redirect("http://localhost:8080/urls/");
  });
// ________________________