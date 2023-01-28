const mongoose = require('mongoose');

const upcomingMatch = new mongoose.Schema(
    {
    _id: String,  //this is the unique name of each match
    date:String ,
    time:String,
    match:String,
    tornament:String,
    match_link:String,
    match_type:String
    },
    { 
        versionKey : false
    })
module.exports.upcomingMatch = mongoose.model('upcomingMatch',upcomingMatch);

const ongoingMatch_cricket = new mongoose.Schema(
    {
        _id: Number,    //this will be the uid of the match in "upcomingMatch DB"
        innings1_BatterTable : Array ,
        innings1_BowlerTable : Array ,
        innings1_finished : String  ,
        innings2_BatterTable : Array ,
        innings2_BowlerTable : Array ,
    },
    { 
        versionKey : false
    })
module.exports.ongoingMatch_cricket = mongoose.model('onGoingMatch-Cricket-data',ongoingMatch_cricket);

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




