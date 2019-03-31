const net = require('net')
const fs = require('fs')

var counter = 0
class UnixStream {
  constructor (stream, onSocket) {
    const path = './' + (++counter) + '.sock'
    this.url = 'unix:' + path

    try {
      fs.statSync(path)
      fs.unlinkSync(path)
    } catch (err) {}
    const server = net.createServer(onSocket)
    stream.on('finish', () => {
      server.close()
    })
    server.listen(path)
  }
}

function StreamInput (stream) {
  return new UnixStream(stream, socket => stream.pipe(socket))
}
module.exports.StreamInput = StreamInput

function StreamOutput (stream) {
  return new UnixStream(stream, socket => socket.pipe(stream))
}
module.exports.StreamOutput = StreamOutput
