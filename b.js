// CLIENT

var host = window.document.location.host.replace(/:.*/, '')
var wss = require('websocket-stream')
var lp = require('./leap.js')
var ws = wss('ws://'+host)

var container = document.body

var cvsView = document.querySelector('.main')

paper.setup(cvsView)

var leap = new lp()

ws.on('open', function () {
  console.log('connection active')
})

ws.pipe(leap).pipe(ws)

ws.on('data', function (d) {
  var msg = JSON.parse(d)
  console.log(d)
})
