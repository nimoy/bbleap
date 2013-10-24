// LEAP

var osc = require('omgosc')
var ws = require('ws')
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
  data.pipe(soc)
  soc.on('data', function (d) {
    var cmd = JSON.parse(d)
    data.write(cmd)
  })
  soc.on('close', function () {
    data.end()
  })
})


var sender = new osc.UdpSender('127.0.0.1', 7777);

var receiver = new osc.UdpReceiver(7777);
receiver.on('', function(e) {
  console.log(e);
});

var i = 0;

setInterval(function() {
  sender.send('/osc_data',
              'sfiTFNI',
              ['hello', Math.random(), i++, true, false, null, undefined]);
}, 1000/10);
