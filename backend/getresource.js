
const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')
const fs = require("fs");


const getcricketTeamInfo =  async () =>  {
    const response = await axios({
        url : `https://www.mykhel.com/cricket/teams/` ,
        method : 'GET',
    }); 

    const virtualConsole = new jsdom.VirtualConsole();
    const dom = new JSDOM(response.data, {virtualConsole});
    var team = dom.window.document.querySelectorAll('.os-cricket-teams')[0].querySelectorAll('li');
    var teamInfo = [];
        for (var i in team){
           if(team[i].textContent){
                var eachteam = {
                    'teamName' : team[i].querySelector(".os-cricket-team-name").textContent.split(" ")[1] ,
                    'teamlogoLink' : `https://www.mykhel.com` + team[i].querySelector('img').src ,
                    'team_link':`https://www.mykhel.com` + team[i].querySelector('a').href + `players/`,
                } ;
           teamInfo.push(eachteam);
        //  console.log(eachteam)
               }
            }
    console.log(teamInfo) 
     return teamInfo;

    }

//getcricketTeamInfo();
var arr = [
    {
      teamName: 'Australia',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-1.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/australia-tp1/players/'
    },
    {
      teamName: 'England',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-2.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/england-tp2/players/'
    },
    {
      teamName: 'India',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-3.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/india-tp3/players/'
    },
    {
      teamName: 'New Zealand',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-4.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/new-zealand-tp4/players/'
    },
    {
      teamName: 'Pakistan',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-5.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/pakistan-tp5/players/'
    },
    {
      teamName: 'South Africa',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-6.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/south-africa-tp6/players/'
    },
    {
      teamName: 'Srilanka',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-7.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/sri-lanka-tp7/players/'
    },
    {
      teamName: 'West Indies',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-8.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/west-indies-tp8/players/'
    },
    {
      teamName: 'Bangladesh',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-10.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/bangladesh-tp10/players/'
    },
    {
      teamName: 'Ireland',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-24.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/ireland-tp24/players/'
    },
    {
      teamName: 'Zimbabwe',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-9.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/zimbabwe-tp9/players/'
    },
    {
      teamName: 'Afghanistan',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-95.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/afghanistan-tp95/players/'
    },
    {
      teamName: 'Scotland',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-15.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/scotland-tp15/players/'
    },
    {
      teamName: 'Netherlands',
      teamlogoLink: 'https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-14.1627678833.png',
      team_link: 'https://www.mykhel.com/cricket/netherlands-tp14/players/'
    }
  ]
// module.exports.getcricketTeamInfo = upcomingMatch

var getCricketplayerInfo = async () => {
    // var arr = await getcricketTeamInfo();
    var json = {}
    for(var p of arr){
       // console.log(i);
        var resp = await axios({
            url: p['team_link'] ,
            method :'GET'
        });

       var virtualConsole = new jsdom.VirtualConsole();
        var dom2 = new JSDOM(resp.data, {virtualConsole});
        var team = dom2.window.document.querySelectorAll('#current_squad ul li');
        var teamInfo = [];
        for (var i in team){
            if(team[i].textContent){
                var eachplayer = {
                    'playerName' :  team[i].textContent.split("       ")[1].split("   ")[0] ,
                    'playerPic' : `https://www.mykhel.com` + team[i].querySelector('img').src ,
                } ;
            teamInfo.push(eachplayer);
            console.log(eachplayer)
            }
        }
        json[`${p['teamName']}`] = teamInfo ;
        json[`${p['teamName']} + Logo`] = p['teamlogoLink'] ;

    }
    fs.writeFile("allplayers.json", JSON.stringify(json), function(err) {
        console.log('file saved')
        if (err) {
            console.log(err);
        }});


}
//getCricketplayerInfo()


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


