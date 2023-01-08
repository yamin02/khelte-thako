
const puppeteer = require('puppeteer');
const fs = require('fs');

const getTableFixture = (async () => {
  const browser = await puppeteer.launch({
   executablePath: '/usr/bin/chromium',
   headless:false ,
  });
  const page = await browser.newPage();

  await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/8213/Stages/21479/Fixtures/');

  // Wait for the results page to load and display the results.
  const tableFixture = '.divtable-body .divtable-row';
  await page.waitForSelector(tableFixture);

  // Extract the results from the page.
  const tableFixtureJson = await page.evaluate(tableFixture => {
    var jsonAll ={} ;
    var date ='';var arr = [] ;
    var eachMatch = document.querySelectorAll(tableFixture);
    // return eachMatch ;
    for(var i of eachMatch){
      if(i.textContent.includes('2022')){
         date = i.textContent.split(' ')[1] +i.textContent.split(' ')[2] ;
         arr =[]
      }else{
       // var link = i.querySelector('a.ns-match-link').href;
        var dataId = i.getAttribute('data-id')
          var json = {
            'time' : i.querySelector('.time').textContent ,
            'link' : dataId ,
            'teams' : [i.querySelectorAll('.team-link')[0].textContent ,
                       i.querySelectorAll('.team-link')[1].textContent ],
        };
        arr.push(json);
        jsonAll[date] = arr ;
      } 
      }
      console.log(jsonAll);
      return jsonAll ;
    },tableFixture );
    console.log(tableFixtureJson);
    fs.writeFile("fixtures.json", JSON.stringify(tableFixtureJson), function(err) {
      console.log('file saved')
      if (err) {
          console.log(err);
      }}); 

  await browser.close();
})
//getTableFixture() ;



///this one will be used for the project
module.exports.optaStat_getPoint = (async (match_link) => {
  const browser = await puppeteer.launch({
   executablePath: '/usr/bin/chromium',
   headless:false ,
  });
  const page = await browser.newPage();
  await page.goto(match_link);
  await page.waitForSelector('.Opta-Striped tr');

    const playerStatss = await page.evaluate( () => {
      var tableData = document.querySelectorAll('.Opta-Striped tr')
      var json = {} ;
      for(var i = 1 ; i< (tableData.length-1)/2 ; i=i+1){
       var data = tableData[i].querySelectorAll('td') ;
       var arr = []
       for(var pp of data){arr.push(pp.textContent)};
       json[`${tableData[i].querySelector('th').textContent}`] = arr
      }
      return json ;
  
    });
    console.log(playerStatss);
 await browser.close();
});

//optaStat_getPoint();


///this one will be used for the project
const optaStat_getupcomingMatch = (async () => {
  const browser = await puppeteer.launch({
   executablePath: '/usr/bin/chromium',
   headless:false ,
  });
  const page = await browser.newPage();
  await page.goto('');
  await page.waitForSelector('.Opta-Striped tr');

    const playerStatss = await page.evaluate( () => {
      var tableData = document.querySelectorAll('.Opta-Striped tr')
      var json = {} ;
      for(var i = 1 ; i< (tableData.length-1)/2 ; i=i+1){
       var data = tableData[i].querySelectorAll('td') ;
       var arr = []
       for(var pp of data){arr.push(pp.textContent)};
       json[`${tableData[i].querySelector('th').textContent}`] = arr
      }
      return json ;
  
    });
    console.log(playerStatss);
 await browser.close();
});

optaStat_getupcomingMatch();