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


<a href="/register"> What?? Not a Pirate?! Join the Crew! </a>







































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