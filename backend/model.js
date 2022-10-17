const mongoose = require('mongoose');

const matchscehma = new mongoose.Schema(
    {
    time : {
        type : String,
        required : false , 
    },
    match :   {
        type : String,
        required : false , 
    }, 
    match_link :   {
        type : String,
        required : false , 
    }
    },
    { 
        versionKey : false
    })

module.exports.upcomingMatch = mongoose.model('upcomingMatch',matchscehma)


const stockschema2 = new mongoose.Schema(
    {
    marketStatus : {
        type : String,
        required : false , 
    },
    ds30 : {
        type : Number,
        required : false , 
    },
    issueUnchange :{
        type : Number,
        required : false , 
    },
    },
    { 
        versionKey : false
    })

//module.exports.dsexmodel = mongoose.model('dsexdata22',stockschema2)