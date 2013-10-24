// SERVER

var osc = require('omgosc')
var filed = require('filed')
var ws = require('ws').Server
var wss = require('websocket-stream')
var http = require('http')

var server = http.createServer(function (req,res) {
  if(req.url === '/') req.url = '/i.html'
  console.log('.'+req.url)
  filed('.'+req.url).pipe(res)
})

server.listen(80, function () {
  console.log('running')
})

var w = new ws({server:server})

w.on('connection', function (wsoc) {
  soc = wss(wsoc)
  console.log('new soc')
  soc.on('data', function (chunk) {
    var d = JSON.parse(chunk)
    var fins = 2
    var val = null
    var min = 50
    var max = 450
    for (f in d) {
      var y = p.pos[1]
      var p = d[f]
      fins++
      if (y < max && y >min) {
        var val = (p.pos[1]-min)/(max-min)
        console.log(val)
        sender.send('/LFO'+fins+'/Rate1','f',[val])
      }
    }
  })
  soc.on('close', function () {
    console.log('soc closed')
  })
})

var sender = new osc.UdpSender('127.0.0.1', 7777)

var receiver = new osc.UdpReceiver(7777)
receiver.on('', function(e) {
  console.log(e)
})
