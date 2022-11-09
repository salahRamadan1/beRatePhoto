const mongoose = require('mongoose')

module.exports.dbConnection = ()=>{
    mongoose.connect(process.env.DBCONNECTION).then(()=>{
        console.log("db is connection ");
    }).catch((err)=>{
        console.log(err);
    })
}