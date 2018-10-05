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

function currentUser(req) {
  let uid = req.cookies.user_id
  console.log("this is the iud", uid);
  return uid
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
  res.render("_hello");
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

app.get("/register", (req, res) => {
  let templateVars = {
    user : currentUser(req)
  }
  res.render("urls_register", templateVars);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase,
                       user : currentUser(req)
                     };
  res.render("urls_index", templateVars);
  console.log(templateVars)
});

app.get("/urls/new", (req, res) => {
  let templateVars = {
    user : currentUser(req)
  }
  res.render("urls_new", templateVars);
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
  user : currentUser(req)
  }
  res.render("urls_show", templateVars);
})

app.get("/login", (req, res) => {
  res.render("_login");
});

//These are my app.posts

app.post("/urls", (req, res) => {
  let randomNum = generateRandomString();
  urlDatabase[ randomNum ] = req.body.longURL;
  res.redirect("http://localhost:8080/urls/" + randomNum);
});

app.post("/urls/:id/delete", (req, res) => {

  for(var key in urlDatabase) {
    if (req.params.id === key ) {
      delete urlDatabase[key];
    }
  }

  return res.redirect("/urls/");
});

app.post("/urls/:id", (req, res) => {
  console.log(req.params.id);
  for(var key in urlDatabase) {
    if (req.params.id === key ) {
      urlDatabase[key] = req.body.longURL;
    }
  }

  return res.redirect("http://localhost:8080/urls/");
});

app.post("/login", (req, res) => {

  if (req.body.email && req.body.password) {
    console.log('theres values', req.body.email, req.body.password)
    for (let key in users) {
      console.log('looping through', key, users[key])
      if (req.body.email === users[key].email) {
        console.log('email ok')
        if(req.body.password === users[key].password) {
          console.log('pwd ok')
          res.cookie('user_id', users[key]);
          return res.redirect("http://localhost:8080/urls");
        } else {
          return res.status(403).send('Arrrr...wrong pwd!');
        }
      }
    }

    console.log('no users matched')

    return res.status(404).send('Arrrr...ye ought to register first, Mate-y!');

  } else {
    return res.status(400).send('Arrrr...ye mis-typed yer email or password!');
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id", {});
  console.log(users);
  return res.redirect("http://localhost:8080/");
});

app.post("/register", (req, res) => {

  if(!req.body.email || !req.body.password) {
    return res.status(400).send('Avast! You forgot to give your name or password!');
  }

  for (let key in users) {
    if(req.body.email === users[key].email) {
      return res.status(400).send('Arrrr...ye already registered! Do you want to login?');
      // suggest redirection to login
    }
  }

  let randomNum = generateRandomString();

  users[randomNum] = { id: randomNum,
                       email: req.body.email,
                       password: req.body.password
                      }

  res.cookie('user_id', randomNum)
  console.log(users);
  return res.redirect("http://localhost:8080/urls");
});





// var err = new Error("No User Entered");
//   next(err)
//   }
// app.post("/register", (req, res, next) => {

//   let randomNum = generateRandomString();
//   users[randomNum] = { id: randomNum,
//                        email: req.body.email,
//                        password: req.body.password
//                      }

//   if(!req.body.email || !req.body.password) {
//   var err = new Error("No User Entered");
//   next(err)
//   }

//   res.cookie('user_id', randomNum)
//   console.log(users);
//   res.redirect("http://localhost:8080/urls");
// });



// Modify the /register handler to handle error conditions.

// If the e-mail or password are empty strings, send back a response with the 400 status code.

// If someone tries to register with an existing user's email, send back a response with the 400 status code.




// This is  only code before I hade the registration box
// app.post("/login", (req, res) => {

//   res.cookie('username', req.body.username)
//   console.log(req.body)
//   console.log(req.body.username)
//   res.redirect("http://localhost:8080/urls/");
//   });