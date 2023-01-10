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