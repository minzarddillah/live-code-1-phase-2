require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/')
const cors = require('cors')

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.URLDB}`);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`DATABASE CONNECTED`)
});
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use('/', routes)

app.listen(port,()=>{
    console.log(`listening on port: ${port}`)
})

