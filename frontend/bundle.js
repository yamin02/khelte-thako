(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const allplayerjson = require("../resource/allplayersCricket.json");
//const allplayerjsonFootball = require("../resource/footballPlayer.json")
const shortformCountry = require("../resource/shortformCountry.json");
const utils=require('./utils')

module.exports.scorecard =  
{
    beforeRender : async ()=> 
    {
        // $('.content').html(``)
    },

    render  : async () => {    
        var data = await utils.getUpcomingMatches();
            console.log(data[0]);
         var html = '' ;
            for(var i of data ){
             console.log(i)
                var matchTeam1 =i['match'].split(",")[0].split('vs')[0].trim();
                var matchTeam2 =i['match'].split(",")[0].split('vs')[1].trim();
                var matchTime = i["time"].split("/")[0];
                var matchLocation = i["match"].split("     ")[1];
                var tornament = i['tornament'].trim()
                var contestLink =  '/#/playerSelect/' +i['match_link'].split('/')[3];

                // $('.content').append(
               html = html  + 
                 `<article class="card">
                <div class="container">
                <div class="match">
                    <div class="match-header">
                        <div class="match-status">6 hours</div>
                        <div class="match-tournament"><img src="https://images.pitchero.com/counties/94/1657009271_original.jpeg" />${tornament}</div>
                        <div class="match-actions">
                        </div>
                    </div>
                    <div class="match-content">
                        <div class="column">
                            <div class="team team--home">
                                <div class="team-logo">
                                    <img src="${allplayerjson[matchTeam1+'Logo']}" />
                                </div>
                                <h2 class="team-name">${matchTeam1}</h2>
                            </div>
                        </div>
                        <div class="column">
                            <div class="match-details">
                                <div class="match-date">
                                    <strong>${matchTime}</strong>
                                </div>
                                <div class="location">
                                    at <strong>${matchLocation}</strong>
                                </div>
                                <a class="match-bet-place" href=${contestLink} > Join Contest </a>
                            </div>
                        </div>
                        <div class="column">
                            <div class="team team--away">
                                <div class="team-logo">
                                    <img src="${allplayerjson[matchTeam2+'Logo']}" />
                                </div>
                                <h2 class="team-name">${matchTeam2}</h2>
                            </div></div>
                             </div>
                            </div>
                            </div>
                          </article>`
                          
             }
            $('.content').html(`<div class="content-main">
             <div class="card-grid" id="scorecard">${html} </div></div>`) 
    }
}

//player select page
const footballLogo = require('../resource/fifaWorldCupLogo.json');
module.exports.playerSelect =  {
    beforeRender : async ()=>
    {
    },

    render  : async ()=> 
    {
        const params = utils.parseurl().id.split('-') ;
       // console.log(allplayerjson[shortformCountry[params[0]]])
        var teams = [ shortformCountry[params[0]] ,  shortformCountry[params[2]] ];
        var html = '';
        for(var i of teams){
            console.log(i);
            for(var eachplayer of allplayerjson[i]){
                html = html +  ` <div class="player cardplayer">
                <div class="pic">
                    <img src="${eachplayer.playerPic}">
                </div>
                <div class="info">
                    <div class="name">${eachplayer.playerName}</div>
                    <div class="position"> Position : Cricketer </div>
                <!--<div class="position">Position : ${eachplayer.position}</div> <div class="club">Club: ${eachplayer.club}</div>
                    <div class="stats">Age:${eachplayer.age} , Goals:${eachplayer.goal} ,  Caps :${eachplayer.caps}</div> 
                -->

                    <div class="logo">
                    <!--  <img src="${footballLogo[i]}"> -->
                    <img src="${allplayerjson[i+'Logo']}"> 
                    </div>
                </div>
            </div>`
            }
        }

        $(".content").html(`
        <h2>Select Your Best Eleven</h2>
        <a id="confirm">Confirm team</a>
        <div class="app" id="app">
        <div> 
        <div class="players">
        <div class="toolbar">
             <input type="text" id="query" class="search" placeholder="Search players by name or team"/> ${html}
        </div></div></div></div>
        <script>
            $(".player").click(function(){
                $(this).toggleClass("selected");
            })
        </script>`
        );
    },
    afterRender : async ()=>
    {
        $("#confirm").click(function (e) { 
            var arr =[];
            document.querySelectorAll('.selected .name').forEach((num)=>{arr.push(num.innerText)});
            console.log(arr);
            localStorage.setItem('contest834084' ,JSON.stringify(arr));
            utils.postresult({'userID' : arr});
        });
    },
}



module.exports.SignIn =  {
    beforeRender : async ()=>
    {
    },

    render  : async ()=> 
    {
        if(localStorage.UserName){
            var userData = JSON.parse(localStorage.UserName);
            $(".content").html(` 
            <div class="content-main">
             <div class="card-grid" id="scorecard">
             <div>name: ${userData.displayName}</div>
             <div>uid : ${userData.uid}</div>
             <div>email : ${userData.email}</div>
            <div>
                <img src="${userData.photoURL}"
            </div>
            <div>provider Type : ${userData.providerId}</div> 
            </div></div>`);
        }
        else{
        $(".content").html(` 
        <script>
          // Initialize Firebase
          var config = {
            apiKey: "AIzaSyDAnsBzMdKSaAOUthND3an_pCFGtPFqvBU",
            authDomain: "yamin2002.firebaseapp.com",
          };
          firebase.initializeApp(config);
        </script>

      <!-- Dialogue Box -->
      <div class="dialogueBox">
          <p id="closeDialogue" style="float:right"><i class="fa fa-times-circle"></i></p>
          <div id="firebaseui-auth-container"></div>
      </div>`);
        }
    },
    afterRender : async ()=>{
        var uiConfig = {
            'callbacks': {
                'signInSuccess': async function(currentUser, credential, redirectUrl) {
                    var userStuff = currentUser.providerData[0] ;
                    var userAccount = await utils.userbaseUpdate(
                        {'uid' : userStuff.uid , 
                         'name' : userStuff.displayName,
                         'email' : userStuff.email,
                         'providerId' :userStuff.providerId 
                        });
                    localStorage.setItem('AccountBalance' , userAccount)
                    localStorage.setItem('UserName',JSON.stringify(userStuff));
                    location.href = "http://localhost:5500/#/signin" ;
                    return false;
                }
                },
                'signInOptions': [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                ],
            };
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', uiConfig);
    }
}

},{"../resource/allplayersCricket.json":4,"../resource/fifaWorldCupLogo.json":5,"../resource/shortformCountry.json":6,"./utils":3}],2:[function(require,module,exports){
var allpage = require('./allpage');
var utils = require('./utils')

const screenurl = {
  '/' : allpage.scorecard ,
  '/home' : allpage.scorecard , 
  '/playerselect/:id' : allpage.playerSelect ,
  '/signin' : allpage.SignIn ,
}

const loader = async () => {
  const request = utils.parseurl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/' ) + (request.id? '/:id': '')
  var screen = screenurl[parseUrl];
  await screen.render();
  await screen.afterRender();
} 


window.addEventListener('hashchange' , loader);
window.addEventListener('load' , loader)
},{"./allpage":1,"./utils":3}],3:[function(require,module,exports){
const axios = require('axios');
var url = `https://plankton-app-9bcl3.ondigitalocean.app` ;
//var url = `http://127.0.0.1:5000`

module.exports.parseurl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2] 
    }
}

module.exports.getUpcomingMatches  = async() =>{
    const res = await axios({
        url : `${url}/getUpcommingMatches`,
        method:'GET' ,
        headers :  {
            "Content-Type" : 'application/json',
        },
    })
    return res.data
  }

  module.exports.postresult  = async(json) =>{
    const res = await axios({
        url : `${url}/userplayerselection`,
        method:'POST' ,
        headers :  {
            "Content-Type" : 'application/json',
        },
        data:json ,
    })
   // return res.data
  }

  module.exports.userbaseUpdate  = async(json) =>{
    const res = await axios({
        url : `${url}/userbase`,
        method:'POST' ,
        headers :  {
            "Content-Type" : 'application/json',
        },
        data:json
    })
    return res.data
  }
},{"axios":7}],4:[function(require,module,exports){
module.exports={
    "Australia":[
       {
          "playerName":"Mitchell Marsh",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/4601.1666950843.jpg"
       },
       {
          "playerName":"Mitchell Starc",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/4910.1666950862.jpg"
       },
       {
          "playerName":"Tim David",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/11463.1666950929.jpg"
       },
       {
          "playerName":"Ashton Agar",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/5358.1666950681.jpg"
       },
       {
          "playerName":"Adam Zampa",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/5955.1666950659.jpg"
       },
       {
          "playerName":"Glenn Maxwell",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/4894.1666950723.jpg"
       },
       {
          "playerName":"David Warner",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/4275.1666950705.jpg"
       },
       {
          "playerName":"Pat Cummins",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/5164.1666950884.jpg"
       },
       {
          "playerName":"Steven Smith",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/4552.1666950912.jpg"
       },
       {
          "playerName":"Marcus Stoinis",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/5957.1666950791.jpg"
       },
       {
          "playerName":"Cameron Green",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/10749.1667214852.jpg"
       },
       {
          "playerName":"Josh Inglis",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/7636.1634648498.jpg"
       },
       {
          "playerName":"Aaron Finch",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/4780.1666950641.jpg"
       },
       {
          "playerName":"Kane Richardson",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/5180.1666950770.jpg"
       },
       {
          "playerName":"Matthew Wade",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/4555.1666950822.jpg"
       },
       {
          "playerName":"Josh Hazlewood",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/4818.1666950750.jpg"
       }
    ],
    "AustraliaLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-1.1627678833.png",
    "England":[
       {
          "playerName":"Ben Stokes",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/4489.1666951203.jpg"
       },
       {
          "playerName":"Philip Salt",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/8012.1666951499.jpg"
       },
       {
          "playerName":"Dawid Malan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/4041.1666951343.jpg"
       },
       {
          "playerName":"Liam Livingstone",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/6724.1666951435.jpg"
       },
       {
          "playerName":"David Willey",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/4475.1666951320.jpg"
       },
       {
          "playerName":"Jos Buttler",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/4456.1666951408.jpg"
       },
       {
          "playerName":"Tymal Mills",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/4973.1666951547.jpg"
       },
       {
          "playerName":"Adil Rashid",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/3899.1666951137.jpg"
       },
       {
          "playerName":"Sam Curran",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/7888.1666951518.jpg"
       },
       {
          "playerName":"Harry Brook",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/9845.1666951375.jpg"
       },
       {
          "playerName":"Chris Woakes",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/4074.1666951272.jpg"
       },
       {
          "playerName":"Moeen Ali",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/3992.1666951473.jpg"
       },
       {
          "playerName":"Alex Hales",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/4150.1666951159.jpg"
       },
       {
          "playerName":"Chris Jordan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/3870.1666951242.jpg"
       },
       {
          "playerName":"Mark Wood",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/5055.1666951451.jpg"
       }
    ],
    "EnglandLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-2.1627678833.png",
    "India":[
       {
          "playerName":"Suryakumar Yadav",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/5089.1666934155.jpg"
       },
       {
          "playerName":"Hardik Pandya",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/7780.1666933992.jpg"
       },
       {
          "playerName":"Bhuvneshwar Kumar",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/4384.1666933930.jpg"
       },
       {
          "playerName":"Mohammed Shami",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/5051.1666934188.jpg"
       },
       {
          "playerName":"Lokesh Rahul",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/6698.1666934039.jpg"
       },
       {
          "playerName":"Harshal Patel",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/5343.1666934010.jpg"
       },
       {
          "playerName":"Rohit Sharma",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/3516.1666934133.jpg"
       },
       {
          "playerName":"Axar Patel",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/6626.1666933867.jpg"
       },
       {
          "playerName":"Yuzvendra Chahal",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/5085.1666934204.jpg"
       },
       {
          "playerName":"Rishabh Pant",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/8229.1666934084.jpg"
       },
       {
          "playerName":"Ravichandran Ashwin",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/3795.1666934121.jpg"
       },
       {
          "playerName":"Dinesh Karthik",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/3210.1666933974.jpg"
       },
       {
          "playerName":"Deepak Hooda",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/7106.1666933955.jpg"
       },
       {
          "playerName":"Virat Kohli",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/3788.1666934063.jpg"
       },
       {
          "playerName":"Arshdeep Singh",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/11524.1666933887.jpg"
       }
    ],
    "IndiaLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-3.1627678833.png",
    "New Zealand":[
       {
          "playerName":"Adam Milne",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/4881.1666951612.jpg"
       },
       {
          "playerName":"Martin Guptill",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/4274.1666951902.jpg"
       },
       {
          "playerName":"Trent Boult",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/4281.1666952027.jpg"
       },
       {
          "playerName":"Mark Chapman",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/6965.1666951871.jpg"
       },
       {
          "playerName":"Lockie Ferguson",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/6992.1666951828.jpg"
       },
       {
          "playerName":"Ish Sodhi",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/5388.1666951724.jpg"
       },
       {
          "playerName":"Michael Bracewell",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/6813.1666951961.jpg"
       },
       {
          "playerName":"Finn Allen",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/8316.1666951678.jpg"
       },
       {
          "playerName":"Glenn Phillips",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/7670.1666951693.jpg"
       },
       {
          "playerName":"Mitchell Santner",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/7526.1666951992.jpg"
       },
       {
          "playerName":"Tim Southee",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/3652.1666952010.jpg"
       },
       {
          "playerName":"Kane Williamson",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/4637.1666951797.jpg"
       },
       {
          "playerName":"Daryl Mitchell",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/6881.1666951635.jpg"
       },
       {
          "playerName":"Jimmy Neesham",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/5978.1666951751.jpg"
       },
       {
          "playerName":"Devon Conway",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/7559.1666951660.jpg"
       }
    ],
    "New ZealandLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-4.1627678833.png",
    "Pakistan":[
       {
          "playerName":"Iftikhar Ahmed",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/8121.1666936174.jpg"
       },
       {
          "playerName":"Asif Ali",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/6806.1666936030.jpg"
       },
       {
          "playerName":"Shadab Khan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/8429.1666936350.jpg"
       },
       {
          "playerName":"Muhammad Hasnain",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/11888.1666936248.jpg"
       },
       {
          "playerName":"Mohammad Rizwan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/6743.1666936297.jpg"
       },
       {
          "playerName":"Haris Rauf",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/12268.1666936164.jpg"
       },
       {
          "playerName":"Shaheen Afridi",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/11425.1666936387.jpg"
       },
       {
          "playerName":"Naseem Shah",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/13045.1666936331.jpg"
       },
       {
          "playerName":"Shan Masood",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/6801.1666936410.jpg"
       },
       {
          "playerName":"Khushdil Shah",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/11055.1666936199.jpg"
       },
       {
          "playerName":"Fakhar Zaman",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/8192.1666936119.jpg"
       },
       {
          "playerName":"Muhammad Wasim",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/13333.1666936317.jpg"
       },
       {
          "playerName":"Babar Azam",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/5601.1666936227.jpg"
       },
       {
          "playerName":"Haider Ali",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/13127.1666936135.jpg"
       },
       {
          "playerName":"Mohammad Nawaz",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/5612.1666936277.jpg"
       }
    ],
    "PakistanLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-5.1627678833.png",
    "South Africa":[
       {
          "playerName":"Aiden Markram",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/7165.1666955142.jpg"
       },
       {
          "playerName":"Lungi Ngidi",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/8171.1666955289.jpg"
       },
       {
          "playerName":"Marco Jansen",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/12663.1666955314.jpg"
       },
       {
          "playerName":"Tristan Stubbs",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/14343.1666955470.jpg"
       },
       {
          "playerName":"Keshav Maharaj",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/7529.1666955262.jpg"
       },
       {
          "playerName":"David Miller",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/4804.1666955194.jpg"
       },
       {
          "playerName":"Temba Bavuma",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/5885.1666955453.jpg"
       },
       {
          "playerName":"Anrich Nortje",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/11455.1666955174.jpg"
       },
       {
          "playerName":"Quinton de Kock",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/5648.1666955349.jpg"
       },
       {
          "playerName":"Wayne Parnell",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/4279.1666955484.jpg"
       },
       {
          "playerName":"Reeza Hendricks",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/7609.1666955366.jpg"
       },
       {
          "playerName":"Heinrich Klaasen",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/7620.1666955225.jpg"
       },
       {
          "playerName":"Kagiso Rabada",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/6580.1666955242.jpg"
       },
       {
          "playerName":"Rilee Rossouw",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/4546.1666955420.jpg"
       },
       {
          "playerName":"Tabraiz Shamsi",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/7584.1666955443.jpg"
       }
    ],
    "South AfricaLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-6.1627678833.png",
    "Sri Lanka":[
       {
          "playerName":"Danushka Gunathilaka",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/5702.1506322316.jpg"
       },
       {
          "playerName":"Dushmantha Chameera",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/5708.1521441852.jpg"
       },
       {
          "playerName":"Dilshan Madushanka",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/13341.1661322815.jpg"
       },
       {
          "playerName":"Jeffrey Vandersay",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/7990.1667187673.jpg"
       },
       {
          "playerName":"Maheesh Theekshana",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/14211.1667187996.jpg"
       },
       {
          "playerName":"Wanindu Hasaranga",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/8261.1667188099.jpg"
       },
       {
          "playerName":"Lahiru Kumara",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/8265.1505978744.jpg"
       },
       {
          "playerName":"Dasun Shanaka",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/5734.1667187424.jpg"
       },
       {
          "playerName":"Asitha Fernando",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/8262.1521441442.jpg"
       },
       {
          "playerName":"Chamika Karunaratne",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/11119.1667187351.jpg"
       },
       {
          "playerName":"Kusal Mendis",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/7167.1667187715.jpg"
       },
       {
          "playerName":"Dhananjaya de Silva",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/5736.1667187628.jpg"
       },
       {
          "playerName":"Pathum Nissanka",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/10705.1667188052.jpg"
       },
       {
          "playerName":"Ashen Bandara",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/10707.1667187221.jpg"
       },
       {
          "playerName":"Kasun Rajitha",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/8510.1562063000.jpg"
       },
       {
          "playerName":"Binura Fernando",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/7172.1571375341.jpg"
       },
       {
          "playerName":"Charith Asalanka",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/8255.1667187402.jpg"
       },
       {
          "playerName":"Pramod Madushan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/15987.1667188076.jpg"
       },
       {
          "playerName":"Bhanuka Rajapaksa",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/5177.1667187309.jpg"
       }
    ],
    "Sri LankaLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-7.1627678833.png",
    "West Indies":[
       {
          "playerName":"Devon Thomas",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/4508..jpg"
       },
       {
          "playerName":"Jermaine Blackwood",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/6759.1526043092.jpg"
       },
       {
          "playerName":"Kyle Mayers",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/5212.1667214608.jpg"
       },
       {
          "playerName":"Sharmarh Brooks",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/6011.1667214761.jpg"
       },
       {
          "playerName":"Jason Holder",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/5211.1667214545.jpg"
       },
       {
          "playerName":"Roston Chase",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/6012.1526043425.jpg"
       },
       {
          "playerName":"Kemar Roach",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/4084.1526043122.jpg"
       },
       {
          "playerName":"Kraigg Brathwaite",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/4501.1526043242.jpg"
       },
       {
          "playerName":"Tagenarine Chanderpaul",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/7201..jpg"
       },
       {
          "playerName":"Anderson Phillip",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/9832..jpg"
       },
       {
          "playerName":"Nkrumah Bonner",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/4922..jpg"
       },
       {
          "playerName":"Jayden Seales",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/13096.1643871893.jpg"
       },
       {
          "playerName":"Joshua Da Silva",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/13434..jpg"
       },
       {
          "playerName":"Alzarri Joseph",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/7223.1667214465.jpg"
       },
       {
          "playerName":"Raymon Reifer",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/6017.1667214725.jpg"
       }
    ],
    "West IndiesLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-8.1627678833.png",
    "Bangladesh":[
       {
          "playerName":"Taskin Ahmed",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/5563.1506324115.jpg"
       },
       {
          "playerName":"Nurul Hasan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/5564.1661323694.jpg"
       },
       {
          "playerName":"Soumya Sarkar",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/5570.1506323939.jpg"
       },
       {
          "playerName":"Yasir Ali",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/7087.1666680914.jpg"
       },
       {
          "playerName":"Nazmul Hossain Shanto",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/6753.1666680885.jpg"
       },
       {
          "playerName":"Hasan Mahmud",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/11572.1661323365.jpg"
       },
       {
          "playerName":"Liton Das",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/5567.1506323355.jpg"
       },
       {
          "playerName":"Mehedi Hasan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/6750.1506323385.jpg"
       },
       {
          "playerName":"Mustafizur Rahman",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/6752.1644671504.jpg"
       },
       {
          "playerName":"Shakib Al Hasan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/3420.1506323766.jpg"
       },
       {
          "playerName":"Nasum Ahmed",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/5561.1661323623.jpg"
       },
       {
          "playerName":"Afif Hossain",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/10830.1571724978.jpg"
       },
       {
          "playerName":"Mosaddek Hossain",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/5560.1506323656.jpg"
       },
       {
          "playerName":"Ebadat Hossain",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/10757.1571727413.jpg"
       },
       {
          "playerName":"Shoriful Islam",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/12317.1643880739.jpg"
       }
    ],
    "BangladeshLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-10.1627678833.png",
    "Ireland":[
       {
          "playerName":"Paul Stirling",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/3662.1666952819.jpg"
       },
       {
          "playerName":"Joshua Little",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/8464.1666952774.jpg"
       },
       {
          "playerName":"Gareth Delany",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/12732.1666952710.jpg"
       },
       {
          "playerName":"Mark Adair",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/8089.1666952808.jpg"
       },
       {
          "playerName":"George Dockrell",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/4777.1666952731.jpg"
       },
       {
          "playerName":"Conor Olphert",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/15991.1666952645.jpg"
       },
       {
          "playerName":"Stephen Doheny",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/8465.1666952870.jpg"
       },
       {
          "playerName":"Fionn Hand",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/12740.1666952668.jpg"
       },
       {
          "playerName":"Barry McCarthy",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/5526.1666952626.jpg"
       },
       {
          "playerName":"Curtis Campher",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/12025.1666952657.jpg"
       },
       {
          "playerName":"Simi Singh",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/11215.1666952836.jpg"
       },
       {
          "playerName":"Lorcan Tucker",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/8462.1666952790.jpg"
       },
       {
          "playerName":"Graham Hume",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/16040.1666952741.jpg"
       },
       {
          "playerName":"Andrew Balbirnie",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/4828.1666952600.jpg"
       },
       {
          "playerName":"Harry Tector",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/8466.1666952751.jpg"
       }
    ],
    "IrelandLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-24.1627678833.png",
    "Zimbabwe":[
       {
          "playerName":"Craig Ervine",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/4790.1667212024.jpg"
       },
       {
          "playerName":"Wellington Masakadza",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/5695.1667212307.jpg"
       },
       {
          "playerName":"Tony Munyonga",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/12659.1667212282.jpg"
       },
       {
          "playerName":"Clive Madande",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/15451.1667211988.jpg"
       },
       {
          "playerName":"Brad Evans",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/11963.1667211956.jpg"
       },
       {
          "playerName":"Luke Jongwe",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/5692.1666346467.jpg"
       },
       {
          "playerName":"Tendai Chatara",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/4815.1667212260.jpg"
       },
       {
          "playerName":"Wesley Madhevere",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/8391.1667212327.jpg"
       },
       {
          "playerName":"Richard Ngarava",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/8395.1667212163.jpg"
       },
       {
          "playerName":"Sean Williams",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/3270.1667212214.jpg"
       },
       {
          "playerName":"Ryan Burl",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/5689.1667212185.jpg"
       },
       {
          "playerName":"Milton Shumba",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/8399.1666346493.jpg"
       },
       {
          "playerName":"Blessing Muzarabani",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/11612.1667211897.jpg"
       },
       {
          "playerName":"Sikandar Raza",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/6701.1667212231.jpg"
       },
       {
          "playerName":"Regis Chakabva",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/3597.1667212106.jpg"
       }
    ],
    "ZimbabweLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-9.1627678833.png",
    "Afghanistan":[
       {
          "playerName":"Darwish Rasooli",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/11604.1666952213.jpg"
       },
       {
          "playerName":"Rahmanullah Gurbaz",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/11600.1666952321.jpg"
       },
       {
          "playerName":"Usman Ghani",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/7085.1666952515.jpg"
       },
       {
          "playerName":"Fareed Ahmad",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/5549.1527050815.jpg"
       },
       {
          "playerName":"Najibullah Zadran",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/5510.1666952428.jpg"
       },
       {
          "playerName":"Hazrat Zazai",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/10844.1666952371.jpg"
       },
       {
          "playerName":"Mohammad Nabi",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/4307.1666952399.jpg"
       },
       {
          "playerName":"Gulbadin Naib",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/5137.1527050822.jpg"
       },
       {
          "playerName":"Fazal",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/13162.1666952285.jpg"
       },
       {
          "playerName":"Rashid Khan",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/8141.1666952468.jpg"
       },
       {
          "playerName":"Naveen-ul-Haq",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/8504.1666952440.jpg"
       },
       {
          "playerName":"Qais Ahmad",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/8444.1666952457.jpg"
       },
       {
          "playerName":"Ibrahim Zadran",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/11707.1666952385.jpg"
       },
       {
          "playerName":"Saleem Safi",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/14409.1666952537.jpg"
       },
       {
          "playerName":"Mujeeb Zadran",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/11484.1666952412.jpg"
       },
       {
          "playerName":"Azmatullah",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/11606.1666952196.jpg"
       }
    ],
    "AfghanistanLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-95.1627678833.png",
    "Scotland":[
       {
          "playerName":"Safyaan Sharif",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/5123.1666938081.jpg"
       },
       {
          "playerName":"Chris Greaves",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/12332.1666351934.jpg"
       },
       {
          "playerName":"Chris Sole",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/7158.1666351965.jpg"
       },
       {
          "playerName":"Michael Jones",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/11718.1666352211.jpg"
       },
       {
          "playerName":"Mark Watt",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/7156.1666352112.jpg"
       },
       {
          "playerName":"Richard Berrington",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/4132.1666352278.jpg"
       },
       {
          "playerName":"Hamza Tahir",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/2/12042.1666352056.jpg"
       },
       {
          "playerName":"George Munsey",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/6/7856.1666938066.jpg"
       },
       {
          "playerName":"Matthew Cross",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/5631.1666352139.jpg"
       },
       {
          "playerName":"Craig Wallace",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/5148.1666352003.jpg"
       },
       {
          "playerName":"Josh Davey",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/4758.1666352085.jpg"
       },
       {
          "playerName":"Brandon McMullen",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/16414..jpg"
       },
       {
          "playerName":"Calum MacLeod",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/4154.1666351894.jpg"
       },
       {
          "playerName":"Brad Wheal",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/7/7797.1666938047.jpg"
       },
       {
          "playerName":"Michael Leask",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/0/6710.1666352235.jpg"
       }
    ],
    "ScotlandLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-15.1627678833.png",
    "Netherlands":[
       {
          "playerName":"Teja Nidamanuru",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/11624.1666688670.jpg"
       },
       {
          "playerName":"Bas de Leede",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/11883.1666334180.jpg"
       },
       {
          "playerName":"Paul van Meekeren",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/6704.1666334324.jpg"
       },
       {
          "playerName":"Tom Cooper",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/4801.1666682221.jpg"
       },
       {
          "playerName":"Colin Ackermann",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/7569.1666680791.jpg"
       },
       {
          "playerName":"Max O'Dowd",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/1/7861.1666334297.jpg"
       },
       {
          "playerName":"Brandon Glover",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/7408.1666334216.jpg"
       },
       {
          "playerName":"Timm van der Gugten",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/5225.1666334398.jpg"
       },
       {
          "playerName":"Fredrick Klaassen",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/5/7975.1666334252.jpg"
       },
       {
          "playerName":"Scott Edwards",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/11824.1666682201.jpg"
       },
       {
          "playerName":"Vikram Singh",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/4/12954.1666938017.jpg"
       },
       {
          "playerName":"Shariz Ahmad",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/15578.1666937980.jpg"
       },
       {
          "playerName":"Stephan Myburgh",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/3/5223.1666334373.jpg"
       },
       {
          "playerName":"Logan van Beek",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/5739.1666334275.jpg"
       },
       {
          "playerName":"Roelof van der Merwe",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/9/4299.1666334348.jpg"
       },
       {
          "playerName":"Tim Pringle",
          "playerPic":"https://www.mykhel.com/thumb/247x100x233/cricket/players/8/12718.1666334416.jpg"
       }
    ],
    "NetherlandsLogo":"https://www.mykhel.com/common_dynamic/images/common/desk/flags/big/os-14.1627678833.png"
 }
},{}],5:[function(require,module,exports){
module.exports={
    "Ecuador": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/FEF_logo.svg/160px-FEF_logo.svg.png",
    "Netherlands": "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Netherlands_national_football_team_logo.svg/150px-Netherlands_national_football_team_logo.svg.png",
    "Qatar": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Qatar_Football_Association_logo.svg/151px-Qatar_Football_Association_logo.svg.png",
    "Senegal": "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Senegalese_Football_Federation_logo.svg/190px-Senegalese_Football_Federation_logo.svg.png",
    "England": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Semi-protection-shackle.svg/20px-Semi-protection-shackle.svg.png",
    "Iran": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Iran_football_federation_emblem.png/155px-Iran_football_federation_emblem.png",
    "United States ": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/United_States_Soccer_Federation_logo_2016.svg/150px-United_States_Soccer_Federation_logo_2016.svg.png",
    "Wales": "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Wales_national_football_team_logo.svg/175px-Wales_national_football_team_logo.svg.png",
    "Argentina": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Argentina_national_football_team_logo.svg/160px-Argentina_national_football_team_logo.svg.png",
    "Mexico": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Mexico_national_football_team_crest_%282022%29.png/150px-Mexico_national_football_team_crest_%282022%29.png",
    "Poland": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Herb_Polski.svg/150px-Herb_Polski.svg.png",
    "Saudi Arabia": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/200px-Flag_of_Saudi_Arabia.svg.png",
    "Australia": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Australia_national_football_team_badge.svg/180px-Australia_national_football_team_badge.svg.png",
    "Denmark": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Dansk_boldspil_union_logo.svg/180px-Dansk_boldspil_union_logo.svg.png",
    "France": "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/France_national_football_team_seal.svg/150px-France_national_football_team_seal.svg.png",
    "Tunisia": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Logo_federation_tunisienne_de_football-copy.svg/180px-Logo_federation_tunisienne_de_football-copy.svg.png",
    "Costa Rica": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Costa_Rica_national_football_team_logo.svg/170px-Costa_Rica_national_football_team_logo.svg.png",
    "Germany": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/DFBEagle.svg/200px-DFBEagle.svg.png",
    "Japan": "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Japan_national_football_team_crest.svg/160px-Japan_national_football_team_crest.svg.png",
    "Spain": "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Spain_National_Football_Team_badge.png/155px-Spain_National_Football_Team_badge.png",
    "Belgium": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Royal_Belgian_FA_logo_2019.svg/130px-Royal_Belgian_FA_logo_2019.svg.png",
    "Canada": "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Canadian_Soccer_Association_logo.svg/175px-Canadian_Soccer_Association_logo.svg.png",
    "Croatia": "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Croatian_Football_Federation_logo.svg/150px-Croatian_Football_Federation_logo.svg.png",
    "Morocco": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Morocco_national_football_team_logo.png/165px-Morocco_national_football_team_logo.png",
    "Brazil": "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Brazilian_Football_Confederation_logo.svg/170px-Brazilian_Football_Confederation_logo.svg.png",
    "Cameroon": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Cameroon_2010crest.png/170px-Cameroon_2010crest.png",
    "Serbia": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Fudbalski_savez_Srbije.svg/140px-Fudbalski_savez_Srbije.svg.png",
    "Switzerland": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/150px-Flag_of_Switzerland.svg.png",
    "Ghana": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/160px-Flag_of_Ghana.svg.png",
    "Portugal": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Portuguese_Football_Federation.svg/150px-Portuguese_Football_Federation.svg.png",
    "South Korea": "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Korea_Republic_National_Team_Logo.svg/145px-Korea_Republic_National_Team_Logo.svg.png",
    "Uruguay": "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Uruguay_national_football_team_seal.svg/140px-Uruguay_national_football_team_seal.svg.png"
  }
},{}],6:[function(require,module,exports){
module.exports={
        "aus":"Australia",
        "eng":"England",
        "ind":"India",
        "nz":"New Zealand",
        "pak":"Pakistan",
        "sa":"South Africa",
        "sl":"Sri Lanka",
        "wi":"West Indies",
        "ban":"Bangladesh",
        "ire":"Ireland",
        "zim":"Zimbabwe",
        "afg":"Afghanistan",
        "sco":"Scotland",
        "ned":"Netherlands",

        "arg":"Argentina",
        "bra":"Brazil",
        "por":"Portugal"
}
},{}],7:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":9}],8:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var transitionalDefaults = require('../defaults/transitional');
var AxiosError = require('../core/AxiosError');
var CanceledError = require('../cancel/CanceledError');
var parseProtocol = require('../helpers/parseProtocol');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};

},{"../cancel/CanceledError":11,"../core/AxiosError":14,"../core/buildFullPath":16,"../defaults/transitional":22,"../helpers/parseProtocol":34,"./../core/settle":19,"./../helpers/buildURL":25,"./../helpers/cookies":27,"./../helpers/isURLSameOrigin":30,"./../helpers/parseHeaders":33,"./../utils":38}],9:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = require('./cancel/CanceledError');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
axios.VERSION = require('./env/data').version;
axios.toFormData = require('./helpers/toFormData');

// Expose AxiosError class
axios.AxiosError = require('../lib/core/AxiosError');

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"../lib/core/AxiosError":14,"./cancel/CancelToken":10,"./cancel/CanceledError":11,"./cancel/isCancel":12,"./core/Axios":13,"./core/mergeConfig":18,"./defaults":21,"./env/data":23,"./helpers/bind":24,"./helpers/isAxiosError":29,"./helpers/spread":35,"./helpers/toFormData":36,"./utils":38}],10:[function(require,module,exports){
'use strict';

var CanceledError = require('./CanceledError');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./CanceledError":11}],11:[function(require,module,exports){
'use strict';

var AxiosError = require('../core/AxiosError');
var utils = require('../utils');

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;

},{"../core/AxiosError":14,"../utils":38}],12:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],13:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');
var buildFullPath = require('./buildFullPath');
var validator = require('../helpers/validator');

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;

},{"../helpers/buildURL":25,"../helpers/validator":37,"./../utils":38,"./InterceptorManager":15,"./buildFullPath":16,"./dispatchRequest":17,"./mergeConfig":18}],14:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;

},{"../utils":38}],15:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":38}],16:[function(require,module,exports){
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/combineURLs":26,"../helpers/isAbsoluteURL":28}],17:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var CanceledError = require('../cancel/CanceledError');

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/CanceledError":11,"../cancel/isCancel":12,"../defaults":21,"./../utils":38,"./transformData":20}],18:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};

},{"../utils":38}],19:[function(require,module,exports){
'use strict';

var AxiosError = require('./AxiosError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};

},{"./AxiosError":14}],20:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var defaults = require('../defaults');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

},{"../defaults":21,"./../utils":38}],21:[function(require,module,exports){
(function (process){(function (){
'use strict';

var utils = require('../utils');
var normalizeHeaderName = require('../helpers/normalizeHeaderName');
var AxiosError = require('../core/AxiosError');
var transitionalDefaults = require('./transitional');
var toFormData = require('../helpers/toFormData');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('../adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('../adapters/http');
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: require('./env/FormData')
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this)}).call(this,require('_process'))
},{"../adapters/http":8,"../adapters/xhr":8,"../core/AxiosError":14,"../helpers/normalizeHeaderName":31,"../helpers/toFormData":36,"../utils":38,"./env/FormData":32,"./transitional":22,"_process":42}],22:[function(require,module,exports){
'use strict';

module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

},{}],23:[function(require,module,exports){
module.exports = {
  "version": "0.27.2"
};
},{}],24:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],25:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":38}],26:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],27:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":38}],28:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

},{}],29:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};

},{"./../utils":38}],30:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":38}],31:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":38}],32:[function(require,module,exports){
// eslint-disable-next-line strict
module.exports = null;

},{}],33:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":38}],34:[function(require,module,exports){
'use strict';

module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};

},{}],35:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],36:[function(require,module,exports){
(function (Buffer){(function (){
'use strict';

var utils = require('../utils');

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;

}).call(this)}).call(this,require("buffer").Buffer)
},{"../utils":38,"buffer":40}],37:[function(require,module,exports){
'use strict';

var VERSION = require('../env/data').version;
var AxiosError = require('../core/AxiosError');

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

},{"../core/AxiosError":14,"../env/data":23}],38:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};

},{"./helpers/bind":24}],39:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],40:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":39,"buffer":40,"ieee754":41}],41:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],42:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2]);
