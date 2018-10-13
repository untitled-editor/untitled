export default function extend (Y) {
    class Connector extends Y.AbstractConnector {
        constructor (y, options = {}) {
        if (options.room == null) {
            throw new Error('You must define a room name!')
        }
        //   options.role = 'slave'
        options.generateUserId = options.generateUserId || false
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
        // isDisconnected () {
        //   return false
        // }
    }
    Y.extend('simplewebrtc', Connector)
    // Y['simplewebrtc'] = Connector
}