// LEAP

var through = require('through')

module.exports = function () {

  var s = through(function write (chunk) {
    var d = JSON.parse(chunk)
    console.log(d)
  }, function end () {
    this.emit('end')
  },{
    autoDestroy:false
  })

  console.log(Leap.loop)

  Leap.loop({
    enableGestures:true
  }, function(frame) {
    var hands = frame.hands
    var pointables = frame.pointables

    var FINGERS = {}
    
    for (var i = 0, pointable; pointable = pointables[i++];) {
      FINGERS[pointable.id] = {
        id : pointable.id,
        x: pointable.tipPosition[0],
        y: pointable.tipPosition[1],
        z: pointable.tipPosition[2],
        pos:pointable.tipPosition,
        staPos:pointable.stabilizedTipPosition,
        vel:pointable.tipVelocity
      } 
    }

    var allFingers = Object.keys(FINGERS)

    if (frame.gestures.length > 0) {
      frame.gestures.forEach(function (e) {
        console.log(e)
      })
    }

    if (allFingers.length > 0 && hands.length > 0) {
      var jFrame = JSON.stringify(FINGERS)
      s.emit('data',jFrame)
    }
  })

  return s
}
