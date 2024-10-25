const express = require('express'); // import Express with Node.js 'require' method
const app = express();              // create Express instance named 'app'
const port = 8080;                  // random port, can change as necessary

/////////////////////////////////////////////////////////////////////////////////////
/*                                 MIDDLEWARE                                      */

//app.use(...)                      // create router middlewares
//app.use(...)
//app.use(...)
//app.use(...)

//app.use(...)                      // apply google passport as authentication middleware
app.use(express.json())             // use express.json() as middleware
/////////////////////////////////////////////////////////////////////////////////////

app.use('/', express.static('client/dist'));  // on startup, serve files from webpack

app.listen( port, () => {
  console.log(`Express is listening on port ${port}...`)
})
