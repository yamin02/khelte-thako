const axios = require('axios');
var url = `https://plankton-app-9bcl3.ondigitalocean.app` ;
//var url = `http://localhost:5000`

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