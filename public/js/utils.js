const axios = require('axios');

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
        url : `http://127.0.0.1:5000/getUpcommingMatches`,
        method:'GET' ,
        headers :  {
            "Content-Type" : 'application/json',
        },
    })
    return res.data
  }

  module.exports.postresult  = async(json) =>{
    const res = await axios({
        url : `http://127.0.0.1:5000/userplayerselection`,
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
        url : `http://127.0.0.1:5000/userbase`,
        method:'POST' ,
        headers :  {
            "Content-Type" : 'application/json',
        },
        data:json
    })
    return res.data
  }