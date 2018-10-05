var urlDatabase = {default: {"b2xVn2": "http://www.lighthouselabs.ca",
                              "9sm5xK": "http://www.google.com"}
};



urlDatabase.default.new = "myurl"

console.log(urlDatabase);





























/*
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
  // console.log("this is the iud", uid);
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
  return res.render("_hello");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  return res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  return res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/register", (req, res) => {
  let templateVars = {
    user : currentUser(req)
  }
  return res.render("urls_register", templateVars);
});

app.get("/urls", (req, res) => {

  if(!currentUser(req)) {
    res.redirect("/");
    return;
  }

  let templateVars = { urls: urlDatabase,
                       user : currentUser(req)
                     };
  return res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {

  if(!currentUser(req)) {
    res.redirect("/");
    return;
  }

  let templateVars = {
    user : currentUser(req)
  }

  return res.render("urls_new", templateVars);
});

app.get("/u/:shortURL", (req, res) => {

  let longURL;

    for(var key in urlDatabase) {
    if (req.params.shortURL === key ) {
      longURL = urlDatabase[key]
    }
  }
  return res.redirect(longURL);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
  shortURL: req.params.id,
  longUrl : urlDatabase[req.params.id],
  user : currentUser(req)
  }
  return res.render("urls_show", templateVars);
})

app.get("/login", (req, res) => {
  return res.render("_login");
});

//These are my app.posts

app.post("/urls", (req, res) => {
  let randomNum = generateRandomString();
  urlDatabase[ randomNum ] = req.body.longURL;
  console.log(urlDatabase);
  return res.redirect("http://localhost:8080/urls/" + randomNum);
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
  // console.log(req.params.id);
  for(var key in urlDatabase) {
    if (req.params.id === key ) {
      urlDatabase[key] = req.body.longURL;
    }
  }

  return res.redirect("http://localhost:8080/urls/");
});

app.post("/login", (req, res) => {

  if (req.body.email && req.body.password) {
    // console.log('theres values', req.body.email, req.body.password)
    for (let key in users) {
      // console.log('looping through', key, users[key])
      if (req.body.email === users[key].email) {
        // console.log('email ok')
        if(req.body.password === users[key].password) {
          // console.log('pwd ok')
          res.cookie('user_id', users[key]);
          // console.log(req.cookies.user_id);
          return res.redirect("http://localhost:8080/urls");
        } else {
          return res.status(403).send('Arrrr...wrong pwd!');
        }
      }
    }

    // console.log('no users matched')

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
  // console.log(users);
  return res.redirect("http://localhost:8080/login");
});

*/
































  // for (let key in users) {
  //   if(templateVars.user.id == users[key]) {
  //     console.log("this is tset a",users[key]);
  //     console.log("this is tset b", templateVars.user);
  //     return res.render("urls_new", templateVars);
  //     // suggest redirection to login
  //   }
  // }

  // for(var key in urlDatabase) {
  //   if(templateVars.user.email !== key.email) {
  //   console.log('this is the key', key.email)
  //   return res.redirect("http://localhost:8080")
  //   }
  // }

   // console.log(templateVars.user.id);
  // console.log(users[key]);
  // console.log('this is the key', key)
  // return res.redirect("http://localhost:8080/urls/");






























// This is not ready yet; though the html is there. this will be int he server
// app.post("/login", (req, res) => {

//   res.cookie('username', req.body.username)
//   console.log(req.body)
//   console.log(req.body.username)
//   res.redirect("http://localhost:8080/urls/");
//   });

// this will be on the home page.
// <form action="/login" method="POST" style="margin:150px;">
//       <label for="email">Enter yer Email!:</label>
//       <input id="email" type="text" name="email" placeholder="Blackbeard@gmail.com" style="width: 150px">
//       <label for="password">Enter yer Password!:</label>
//       <input id="password" type="text" name="password" placeholder="iLoveMyParrot" style="width: 150px">
//       <input type="submit" value="Login! Up the Gangplank!">
//     </form>


// <a href="/register"> What?? Not a Pirate?! Join the Crew! </a>







































Old header body

<% if(username){ %>
        <form method="POST" action="/logout" >
        <label for="logout"> Logout! Arr! Who Needs Ya!: </label>
        <input id="logout" type="text" name="username" placeholder="Your Pirate Name" style="width: 1px">
        <input type="submit" value="Over the Side!">
        </form>
        <% } else{ %>
        <form method="POST" action="/login" >
        <label for="login"> Login! Arr!: </label>
        <input id="login" type="text" name="username" placeholder="Your Pirate Name" style="width: 300px">
        <input type="submit" value="Board the Ship!">
        </form>
        <% } %>


          <p> Arrrr! Avast! 'Elllo Matey!</p>

        <% if(user){ %>

        <form method="POST" action="/logout" >
        <label for="logout"> Logout! Arr! Who Needs Ya!: </label>
        <input id="logout" type="text" name="username" placeholder="Your Pirate Name" style="width: 1px">
        <input type="submit" value="Over the Side!">
        </form>

        <% } else{ %>
        <a href="/register"> What?? Not a Pirate?! Join the Crew! </a>
        <% } %>



<%= user[email] %>




// var urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

// for(var key in urlDatabase) {
//     if ("http://www.lighthouselabs.ca" === urlDatabase[key] ) {
//       urlDatabase[key] = 'zzzzzy';
//     }
//   }

// console.log(urlDatabase);

// action= <%= "/urls/" + shortURL + "/" longURL%> >

// var urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

// let templateVars = { urls: urlDatabase };

// for(key in templateVars) {
//   for(key in urlDatabase) {
//   console.log(key);
//   console.log(urlDatabase[key])
// }
// };





// const http = require("http");
// const PORT = 8080;

// // a function which handles requests and sends response
// function requestHandler(request, response) {
//   if (request.url == "/") {
//     response.end("Welcome!");
//   } else if (request.url == "/urls") {
//     response.end("www.lighthouselabs.ca\nwww.google.com");
//   } else {
//     response.statusCode = 404;
//     response.end("Unknown Path");
//   }
// }

// var server = http.createServer(requestHandler);

// server.listen(PORT, () => {
//   console.log(`Server listening on: http://localhost:${PORT}`);
// });

/* test code

<!--  <ul>

  <% urlDatabase.forEach(function(oneUrl) { %>
  <li><a href='#'></a></li>
  <% }) %>
 </ul> -->

 */