
const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')
const fs = require("fs")


const upcomingMatch_cricket =  async () =>  {
    const response = await axios({
        url : `https://www.cricbuzz.com/cricket-schedule/upcoming-series/international` ,
        method : 'GET',
    }); 

    const virtualConsole = new jsdom.VirtualConsole();
    const dom = new JSDOM(response.data, {virtualConsole});
    //var match_data = dom.window.document.querySelectorAll("div.cb-col-100.cb-col");
    var match_data = dom.window.document.querySelectorAll('div.cb-ovr-flo.cb-col-60.cb-col.cb-mtchs-dy-vnu.cb-adjst-lst');
    var time=dom.window.document.querySelectorAll('div.cb-col-40.cb-col.cb-mtchs-dy-tm.cb-adjst-lst')
    var i = 0 ;
    var upcome_matches = [];
    var matchArray = [
        "Australia",
        "England",
        "India",
        "New Zealand",
        "Pakistan",
        "South Africa",
        "Sri Lanka",
        "West Indies",
        "Bangladesh",
        "Ireland",
        "Zimbabwe",
        "Afghanistan",
        "Scotland",
        "Netherlands"
    ]

    var result ;
    try {
        for (var i in match_data){
            if(!match_data[i].textContent){return upcome_matches}
            result = matchArray.some(w => match_data[i].textContent.includes(w));
            
           // console.log(result)
            if (result) {
                var eachmatch = {
                    'tornament' : match_data[i].parentElement.parentElement.querySelector('a').textContent,
                    'match_link': match_data[i].querySelector('a').href,
                    'match' :        match_data[i].textContent,
                    'time' :  time[i].textContent,
                    'match_type' : ''
                } ;
           upcome_matches.push(eachmatch);
         // console.log(eachmatch)
                }
            }
    } catch (error) {
        console.log(error)
        }
    }
//upcomingMatch();
module.exports.upcomingMatch = upcomingMatch_cricket


