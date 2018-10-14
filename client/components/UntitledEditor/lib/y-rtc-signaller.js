import RTCSignaller from './rtc-signaller'
import Y,{AbstractConnector} from 'yjs'
const bson = require('bson')

function extend (Y) {
    class ActuallyWorkingRTCTransport extends Y.AbstractConnector {
        constructor (y, options) {
          options.role = 'slave'
          super(y, options)

          const USER_ID = Math.floor(Math.random() * 10000000).toString()
          WebSocket = PUBNUB.ws
          const sub = 'sub-b8f4c07a-352e-11e2-bb9d-c7df1d04ae4a'
          const pub = 'pub-f986077a-73bd-4c28-8e50-2e44076a84e0'
          const channel = "jkjjjjjllk" // TODO vary this on url hash or something
          const url = 'wss://pubsub.pubnub.com/' + pub + '/' + sub + '/' + channel

          window.addEventListener('ewieruu', (ev) => console.log(ev))

          const signaller = new RTCSignaller(url, USER_ID, message => {
            window.m = message
            const reader = new FileReader()
            reader.onload = value => {
                this.recieveMessage(1234, bson.deserialize(value))
            }

            if (message.type != null) {
                reader.readAsArrayBuffer(message.data)
            }
        });
          this.signaller = signaller
        }
        disconnect () {
            console.log('disconnect')
        }
        reconnect () {
            console.log('reconnect')
        }
        send (uid, message) {
            if (this.signaller.channel) {
                this.signaller.sendMessage(message)
                console.log('send', uid, message)
            }
        }
        broadcast (message) {
            if (this.signaller.channel) {
                this.signaller.sendMessage(message)
                console.log('broadcast', message)
            }
        }
        isDisconnected () {
          return false
        }
    }
    Y['webrtc-signaller'] = ActuallyWorkingRTCTransport
}

export default extend