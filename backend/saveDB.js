const crickbuzzApi = require('./crickbuzzApi');
const mongoose = require('mongoose')
const model = require('./model');


mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/khelte-thako?retryWrites=true&w=majority' ).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});

var addNewUpcoming_Match = async () =>{
    var pp = await crickbuzzApi.upcomingMatch();
   await model.upcomingMatch.deleteMany({});
   await model.upcomingMatch.insertMany(pp).then(()=>{
       console.log("updated to DB")
   })
  pp.forEach(res=>{
    // connection.db.collection(res['_id']);

      //Save a new database when there is a new match for collected user selected players
     model.newDatabaseForMatches(res['_id']).then(()=>{console.log('added new DB');}); 
  })

}
module.exports.addNewUpcoming_Match = addNewUpcoming_Match
//addNewUpcoming_Match();

// const connection = mongoose.connection;

// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', async function () {

//   const collection  = connection.db.collection("60772-zim-wi");
//   collection.insertMany([{_id : '1232' , 'selectedPlayer': [1,232,323]}])
//   collection.find({}).toArray(function(err, data){
//       console.log(data); // it will print your collection data
//   });

// });
