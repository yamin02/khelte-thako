const crickbuzzApi = require('./crickbuzzApi');

const mongoose = require('mongoose')
const model = require('./model');


mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/dream11copy?retryWrites=true&w=majority' ).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});

var updateDB = async () =>{
    var pp = await crickbuzzApi.upcomingMatch();
    console.log(pp);
    await model.upcomingMatch.deleteMany({});
    await model.upcomingMatch.insertMany(pp).then(()=>{
        console.log("updated to DB")
    })
}

updateDB();

