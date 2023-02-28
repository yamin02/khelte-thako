const express = require('express');
const app = express();
const path = require("path")
var cors = require('cors');
var model = require('./model');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crickbuzzApi =require('./crickbuzzApi');
const saveDB = require('./saveDB')
const schedule = require('node-schedule');


mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/khelte-thako?retryWrites=true&w=majority' ).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});
mongoose.pluralize(null);

// means i am giving access to the website for cors
app.use(cors({
    origin:['https://khelte-thako.web.app' ,'http://127.0.0.1:5500']
}))
app.listen(5000,()=>{
    console.log("Serving at Port 5000")
});
app.use(express.static(path.join(__dirname,'/../frontend')));
// console.log(path.join(__dirname,'/../public'));

app.use(express.json({limit : '1mb'}));   //remember to use , as for express to accpet json during POST req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname,'/../public')));


app.get('/getUpcommingMatches', async(req,res)=>{
    var res1 = await model.upcomingMatch.find({});
    console.log('served upcoming matches data');
    res.send(JSON.stringify(res1));
    // crickbuzzAPi.upcomingMatch().then((res1)=>{
    //     res.send(JSON.stringify(res1));
    // }) ;
});



app.post('/eachstock/:id',async (req,res)=>{
     console.log(req.params.id)
     console.log(req.body)
     res.send("life is cool")
})

app.get('/dsex',async (req,res)=>{
    var json = await model.dsexmodel.find({});
    res.send(json[0])
})

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

app.post('/userplayerselection', ((req, res) => {
    console.log(req.body) ;
    connection.once('open', async function (json_recieved) {
        const collection  = connection.db.collection(json_recieved['id_ofMatch']);
        collection.insertOne(
            { _id : json_recieved['userId'] , 'selectedPlayer': json_recieved['selectedPlayer'] }
        ).then(ii=>{console.log(ii) ; res.send(ii) })
      }(req.body) );
  }))


app.post('/userbase',async (req,res)=>{
    var userData = req.body ;
    console.log(userData.uid) ;
    var user = await model.userbase.findById(userData.uid);
    console.log(user);
    if(user){
        res.send(String(user.balance))
    }else{
        model.userbase.insertMany({
            _id: userData.uid,  
            name : userData.name ,
            loginAccountType :userData.providerId,
            balance :0 ,
            email: userData.email
        }).then(res=>console.log(res));
        console.log('lifee done');
        res.send('0')
    }
})

// Update the upcoming match list 
saveDB.addNewUpcoming_Match() ;
setInterval(saveDB.addNewUpcoming_Match,1000*3600*6); // repeat after 6 minutes



//At a specific time period start each match data update 
const ongoingmatch_getdata = async () =>{
    model.upcomingMatch.find({}).then( res=>{
        res.forEach(i =>{
            var date = i.date +' '+ i.time.split("/")[0]  ;
            var pp = new Date(date);
            if(pp-(new Date) <  1000 * 60 * 60 * 24 ){  //take dates less than 24 hours
                console.log(pp.toLocaleString() , 'is the sex time');
                 var d1 = new Date (), d2 = new Date ( d1 );
                 d2.setMinutes ( d1.getMinutes() + 1 );
               // const date = new Date(2012, 11, 21, 5, 30, 0);
                var jobs = schedule.scheduleJob(d2, async function()
                {
                    console.log('The match is starting now' , i.match);
                    var data = await crickbuzzApi.matchUpdate_cricket('https://www.cricbuzz.com'+i.match_link , i._id );
                    model.ongoingMatch_cricket.insertMany([data]);
                    //then continue parsing ongoind data at some interval till the game stops
                });
            }
        })
    });
}
//(ongoingmatch_getdata , 1000 * 60 * 60 *12)
//ongoingmatch_getdata();

 