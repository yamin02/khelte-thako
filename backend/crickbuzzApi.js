
const jsdom = require("jsdom");
const {JSDOM} = jsdom ;
const axios = require('axios')


const upcomingMatch_cricket =  async () =>  {
    const response = await axios({
        url : `https://www.cricbuzz.com/cricket-schedule/upcoming-series/all` ,
        method : 'GET',
    }); 

    const virtualConsole = new jsdom.VirtualConsole();
    const dom = new JSDOM(response.data, {virtualConsole});
    //var match_data = dom.window.document.querySelectorAll("div.cb-col-100.cb-col");
    var match_dataDate = dom.window.document.querySelectorAll(".cb-lv-grn-strip.text-bold")
   // var match_data = dom.window.document.querySelectorAll('div.cb-ovr-flo.cb-col-60.cb-col.cb-mtchs-dy-vnu.cb-adjst-lst');

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
        "Netherlands", 

    ]
    var keyword_avoid = ['warm-up' , 'women' , 'unofficial'];
    var tornament_keyword = ['bangladesh premier league' , 'indian premier league']

    try {
        console.log('datadiv lenght' , match_dataDate.length)
        for (var dateDiv of match_dataDate){
            var dateOfmatch = dateDiv.textContent ;
            var match_data = dateDiv.parentNode.querySelectorAll('div.cb-ovr-flo.cb-col-60.cb-col.cb-mtchs-dy-vnu.cb-adjst-lst');
            var time= dateDiv.parentNode.querySelectorAll('div.cb-col-40.cb-col.cb-mtchs-dy-tm.cb-adjst-lst')
            var count = 0;
            for(var i of match_data){
                var tornament = i.parentElement.parentElement.querySelector('a').textContent ;
                var have_keyword = keyword_have.some(w => i.textContent.includes(w)) || tornament_keyword.some(w=>tornament.toLowerCase().includes(w));
                var avoid_keyword = keyword_avoid.some(w => i.textContent.toLowerCase().includes(w));
                 if (have_keyword && !avoid_keyword) {
                var link =  i.querySelector('a').href.split('/')
                var eachmatch = {
                    '_id' : link[2] +'-'+ link[3].split('-')[0]+'-'+link[3].split('-')[2] ,
                    'tornament' : tornament,
                    'match_link': '/live-cricket-scorecard/'+link[2]+'/'+link[3],
                    'match' :        i.textContent.trim(),
                    'date' : dateOfmatch ,
                    'time' :  time[count].textContent.trim(),
                    'match_type' : 'cricket'
                } ;
                upcome_matches.push(eachmatch);
                console.log(eachmatch)
                }
              count=count+1;
             }
            }
            return upcome_matches ;
    } catch (error) {
        console.log(error)
        }
    }
//upcomingMatch_cricket();
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
   
