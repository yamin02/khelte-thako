
const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')
const fs = require("fs")


const upcomingMatch =  async () =>  {
    const response = await axios({
        url : `https://www.cricbuzz.com/cricket-schedule/upcoming-series/international` ,
        method : 'GET',
    }); 

    const virtualConsole = new jsdom.VirtualConsole();
    const dom = new JSDOM(response.data, {virtualConsole});
    //var match_data = dom.window.document.querySelectorAll("div.cb-col-100.cb-col");
    var match_data = dom.window.document.querySelectorAll('div.cb-ovr-flo.cb-col-60.cb-col.cb-mtchs-dy-vnu.cb-adjst-lst');
    var time=dom.window.document.querySelectorAll('div.cb-col-40.cb-col.cb-mtchs-dy-tm.cb-adjst-lst')
    var i = 0;
    var upcome_matches = [];
    try {
        for (var i in match_data){
            if(match_data[i].textContent){
                var eachmatch = {
                    'match_link': match_data[i].querySelector('a').href,
                    'match' :        match_data[i].textContent,
                    'time' :  time[i].textContent,
                } ;
           upcome_matches.push(eachmatch);
           // console.log(eachmatch)
                }
            }
        return upcome_matches;
    } catch (error) {
        console.log(error)
        }
    }


upcomingMatch();
module.exports.upcomingMatch = upcomingMatch


