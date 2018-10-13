import Y,{AbstractConnector} from 'yjs'

class DummyTransport extends Y.AbstractConnector {
    constructor (y, options) {
      options.role = 'slave'
      super(y, options)
    }
    disconnect () {
        console.log('disconnect')
    }
    reconnect () {
        console.log('reconnect')
    }
    send (uid, message) {
        console.log('send', uid, message)
    }
    broadcast (message) {
        console.log('broadcast', message)
    }
    isDisconnected () {
      return true
    }
}

function extend (Y) {
    Y.extend('dummytransport', DummyTransport)
}

export default extend