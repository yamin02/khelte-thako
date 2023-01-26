const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')
const fs = require("fs");


// Data for WORLD CUP FOOTBALL 

var teamArr = [
  
    "Netherlands" ,
    "England" ,
    "Argentina" ,
    "France" ,
    "Germany" ,
    "Japan" ,
    "Spain" ,
    "Belgium" ,
    "Croatia" ,
    "Morocco" ,
    "Brazil" ,
    "Portugal" ,
    "South Korea",
    "Uruguay" ]
  
   
  // link1 : https://en.wikipedia.org/wiki/2022_FIFA_World_Cup_squads
  // var pp = document.querySelectorAll('.sortable.wikitable.plainrowheaders.jquery-tablesorter')
  
  var getFootballplayerInfo = async () => {
    var json = {}
    // console.log(i);
    var resp = await axios({
        url: 'https://en.wikipedia.org/wiki/2022_FIFA_World_Cup_squads',
        method :'GET'
    });
  
    var virtualConsole = new jsdom.VirtualConsole();
    var dom = new JSDOM(resp.data, {virtualConsole});
    var team =dom.window.document.querySelectorAll(".sortable.wikitable");
    var teamInfo = [];
    // console.log(team[0].querySelectorAll("tr")[2].textContent)
    // team[1].querySelectorAll('tr')[5].textContent
    // '\n\n\n2DF\n\nAbdelkarim Hassan\n\n (1993-08-28)28 August 1993 (aged 29)\n\n130\n\n15\n\n Al-Sadd\n'
    var count = 0 ;
    for (var i of team)
    {
      // var teamName = i.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent ;
      var playeryable = i.querySelectorAll("tr");
      for (var p of playeryable)
      {
        var ii = p.textContent.split('\n\n')
         if(ii.length >3 )
         {
          var eachplayer = 
          {
              'position': ii[1].slice(-2) ,
              'age' : String(ii[3].split("(aged")[1]).trim().slice(0,-1) ,
              'playerName' : ii[2] ,
              'caps': ii[4] ,
              'goal' : ii[5],
              'club' : ii[6].trim() ,
          } ;
        if(eachplayer['caps'] != "Caps"){teamInfo.push(eachplayer)} ;
        // console.log(eachplayer) ;
         }   
      }
      json[teamArr[count]] = teamInfo ;
      count = count + 1 ;
    }
  
    fs.writeFile("fifaWorldcup.json", JSON.stringify(json), function(err) {
        console.log('file saved')
        if (err) {
            console.log(err);
        }});
  }
  
  // getFootballplayerInfo()
  
  
  const fifajson = require('./footballplayers.json');
  const id_ref = require('./footballTeamID.json')
  
  //console.log(fifajson)
  var finalJson = {}
  var getFootballerImage = async () => {
   for (var team of teamArr)
   //var team = "Argentina" ;
   {
      var resp = await axios({
        url: `https://fbref.com/en/squads/${id_ref[team]}/2022/roster`,
        method :'GET'
      });
      var virtualConsole = new jsdom.VirtualConsole();
      var dom = new JSDOM(resp.data, {virtualConsole});
      var allplayerPic =dom.window.document.querySelectorAll("img");
  
      var arr = []
      for(var eachplayerdata of fifajson[team] )
      {
        //console.log(eachplayerdata)
        for(var eachpic of allplayerPic)
        {
          if( eachpic.alt.includes(eachplayerdata['playerName'] ) )
          {
            eachplayerdata['playerPic'] = eachpic.src ; 
            console.log(eachplayerdata['playerPic']);
             arr.push(eachplayerdata);
            break ;
          }
        }
        // console.log(eachplayerdata);
      }
      finalJson[team] = arr
    }
  //  console.log(fifajson);
    fs.writeFile("fifaWorldcup2.json", JSON.stringify(finalJson), function(err) {
      console.log('file saved')
      if (err) {
          console.log(err);
      }});  
  }
  getFootballerImage();
  
  
  
  //console.log(fifajson)
  var teamlogo = async () => {
    // console.log(fifajson["Brazil"]);
    var logo = {};
   for (var team of teamArr)
   {
      var resp = await axios({
        url: `https://en.wikipedia.org/wiki/${team}_national_football_team`,
        method :'GET'
      });
      var virtualConsole = new jsdom.VirtualConsole();
      var dom = new JSDOM(resp.data, {virtualConsole});
      logo[team] = String(dom.window.document.querySelector("img").src) ;
      console.log(logo[team]) ;
    }
    console.log(logo);
  }
  //teamlogo();
  
  
  var matchFixtureLink = async () => {
    // console.log(fifajson["Brazil"]);
    var jsonAll ={} ;
    var arr = [] ;
    var date ='' ; var matchlink ;
   for (var team of teamArr)
   {
      var resp = await axios({
       // url: `https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/8213/Stages/21479/Fixtures/International-FIFA-World-Cup-2022`,
       url : `https://goal.com`  ,
       method :'GET'
      });
      var virtualConsole = new jsdom.VirtualConsole();
      var dom = new JSDOM( resp.data , {virtualConsole} );
      var eachMatch = dom.window.document.querySelectorAll('.divtable-body .divtable-row');
      //document.querySelectorAll('.ns-match-link') ;
      document.querySelectorAll('.divtable-body .divtable-row')[0].textContent
      for(var i of eachMatch){
        if(i.textContent.includes('2022')){
          jsonAll[date] = arr ;
           date = i.textContent.split(' ')[1] +i.textContent.split(' ')[2] ;
           arr =[]
        }else{
          var link = i.querySelector('a.ns-match-link').href;
            var json = {
              'time' : i.querySelector('.time').textContent ,
              'link' : link ,
              'teams' : [link.split('-')[5], link.split('-')[6]],
          };
          arr.push(json);
        } 
        }
        console.log(jsonAll)
      }
    }
  //matchFixtureLink() ;
  