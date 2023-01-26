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




