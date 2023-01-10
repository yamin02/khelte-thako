const allplayerjson = require("../resource/allplayersCricket.json");
//const allplayerjsonFootball = require("../resource/footballPlayer.json")
const shortformCountry = require("../resource/shortformCountry.json");
const utils=require('../js/utils')

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
