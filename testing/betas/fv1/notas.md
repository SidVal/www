# Notas varias

## Cookies

Leer [tutorialspoint.com: nodejs_express_framework](https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm). La última parte está buena:

```js
var express      = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function(req, res) {
   console.log("Cookies: ", req.cookies)
})
app.listen(8081)
```

Leer: [Node.js - RESTful API](https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm). Puedo sacar ideas de cómo interpretar la `data` que trae el API:

```js
app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})
```

Ver `data = JSON.parse( data );` y cómo busca la info en el array: `data["user4"] = user["user4"];`

Array:

```json
user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}
```

Ver cómo toma datos y los muestra según parámetro:

```js
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})
```

## Mongoose Query Helpers

- [Express Tutorial Part 3: Using a Database (with Mongoose)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
- https://mongoosejs.com/docs/guide.html#query-helpers
