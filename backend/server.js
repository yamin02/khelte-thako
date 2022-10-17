const express = require('express');
const app = express();
const path = require("path")
var cors = require('cors');
var crickbuzzAPi = require('./crickbuzzApi');

// means i am giving access to the website for cors
app.use(cors({
    origin:'https://sharebazar-bd.web.app'
}))
app.listen(5000,()=>{
    console.log("Serving at Port 5000")
});
app.use(express.json({limit : '1mb'}));   //remember to use , as for express to accpet json during POST req


//app.use(express.static(path.join(__dirname,'/../public')));


app.get('/getUpcommingMatches', async(req,res)=>{
    crickbuzzAPi.upcomingMatch().then((res1)=>{
        res.send(JSON.stringify(res1))
    }) ;
});

app.get('/preload',async (req,res)=>{
    
})

app.post('/eachstock/:id',async (req,res)=>{
     console.log(req.params.id)
     console.log(req.body)
     res.send("life is cool")
})

app.get('/dsex',async (req,res)=>{
    var json = await model.dsexmodel.find({});
    res.send(json[0])
})


