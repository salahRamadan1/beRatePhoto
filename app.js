const express = require('express')
const { dbConnection } = require('./connectionDB/connectionDB')
const app = express()
const port = 3000
const core = require('cors')
const AppError = require('./commen/AppError')
const globalMiddelWareHandling = require('./commen/globalMiddelWareHandling')
app.use(core())
require('dotenv').config()
app.use(express.static('uploads'))
app.use(express.json())
app.use('/user' , require('./api/userApi/userApi'))
app.use('/photo' , require('./api/photoApi/photoApi'))




app.all("*", (req, res, next) => {
    next(
      new AppError(` can't find this route : ${req.originalUrl} on server `, 404)
    );
  });
  app.use(globalMiddelWareHandling);


dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))