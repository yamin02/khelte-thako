const express = require('express');
const app = express();
const path = require("path")
var cors = require('cors');
var model = require('./model');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://yamin02:chandanpura@sharebazar.z3hlw.mongodb.net/dream11copy?retryWrites=true&w=majority' ).then(() =>{
    console.log('connected to MONGO DB');
}).catch((error) =>{
    console.log(error);
    console.log("MONGODB Error");
});

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

app.post('/userplayerselection', ((req, res) => {
    console.log(req.body) ;
    res.send('kolla life');
  }))


  //Save a new database when there is a new match 
// model.newDatabaseForMatch('chuiya12323').then(()=>{
//     console.log('lifeee');
// });

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