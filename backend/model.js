const mongoose = require('mongoose');

const matchscehma = new mongoose.Schema(
    {
    // sport_type : {
    //     type : String ,
    //     required : false ,
    // },
    time : {
        type : String,
        required : false , 
    },
    match :   {
        type : String,
        required : false , 
    }, 
    tornament :   {
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


const userbase = new mongoose.Schema(
    {
    _id: Number,  //this is uid of firebase user database
    name : String ,
    //facebook or google 
    loginAccountType :String,
    balance :Number,
    email:String,
    //array : [contestID-positionOfUser]
    contestParticipated :{
        type : Array,
        required : false , 
    },

    },
    { 
        versionKey : false
    })
module.exports.userbase = mongoose.model('userbase',userbase);

module.exports.newDatabaseForMatch = async (matchID)=>{
    const dbForMatch = new mongoose.Schema(
        //here user selected player will be saved for specific match
        {
            _id: Number,    //this will be the uid of user from firebase 
            selectedPlayer :  Array
        },
        { 
            versionKey : false
        })
    
    mongoose.model(matchID , dbForMatch );
}



