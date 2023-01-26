
const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')


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
    var keyword_have = [
        "Australia", "England","India",
        "New Zealand","Pakistan",
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
    var keyword_avoid = ['Warm-up']

    var have_keyword , avoid_keyword  ;
    try {
        for (var i in match_data){
            if(!match_data[i].textContent){return upcome_matches}
            have_keyword = keyword_have.some(w => match_data[i].textContent.includes(w));
            avoid_keyword = keyword_avoid.some(w => match_data[i].textContent.includes(w));
           // console.log(result)
            if (have_keyword && !avoid_keyword) {
                var link =  match_data[i].querySelector('a').href.split('/')
                var eachmatch = {
                    '_id' : link[2] +'-'+ link[3].split('-')[0]+'-'+link[3].split('-')[2] ,
                    'tornament' : match_data[i].parentElement.parentElement.querySelector('a').textContent,
                    'match_link': '/live-cricket-scorecard/'+link[2]+'/'+link[3],
                    'match' :        match_data[i].textContent,
                    'time' :  time[i].textContent,
                    'match_type' : 'cricket'
                } ;
           upcome_matches.push(eachmatch);
          console.log(eachmatch)
                }
            }
    } catch (error) {
        console.log(error)
        }
    }
//upcomingMatch();
module.exports.upcomingMatch = upcomingMatch_cricket




const mathcUpdate_cricket =  async (link , mongoDb_id) =>  {
    try{
    const response = await axios({
        url : link ,
        method : 'GET',
    }); 
    const virtualConsole = new jsdom.VirtualConsole();
    const dom = new JSDOM(response.data, {virtualConsole});
    var match_dataTables = dom.window.document.querySelectorAll('.cb-ltst-wgt-hdr');
    //console.log(match_dataTables)
    var final_data = [0,1,3,4].forEach((i)=>{
        var data = [];
        match_dataTables[i].querySelectorAll('.cb-scrd-itms')
        .forEach((pq)=>{ 
            var ii = '';
            pq.querySelectorAll('div')
            .forEach((qq)=>{
                ii = ii + qq.textContent + ',' ;
            })
            var removeExtra_total = ['Extras' ,'Total','Did not Bat'].some(w => ii.includes(w));
            if(!removeExtra_total) {data.push(ii)} ;
        })
        console.log(data);
        return data ;
    });
    return {
        'innings1_BatterTable' : final_data[0] ,
        'innings1_BowlertTable' : final_data[1] ,
        'innings1_finished' : final_data[2]='null' ? "no" : "yes"  ,
        'innings2_BatterTable' : final_data[2] ,
        'innings2_BowlertTable' : final_data[3] ,
    }
    }catch(err){
        console.log(err)
    }
}
//mathcUpdate_cricket()
   
