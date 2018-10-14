import RTCSignaller from './rtc-signaller'
import Y,{AbstractConnector} from 'yjs'
window.BinaryDecoder = Y.utils.BinaryDecoder
// import BinaryDecoder from 'yjs/src/Util/Binary/Decoder'
// const bson = require('bson')

function extend (Y) {
    class ActuallyWorkingRTCTransport extends Y.AbstractConnector {
        constructor (y, options) {
          options.role = 'slave'
          super(y, options)

          const USER_ID = Math.floor(Math.random() * 10000000).toString()
          this.userID = window.userId
        //   window.userID = this.userID
          WebSocket = PUBNUB.ws
          const sub = 'sub-b8f4c07a-352e-11e2-bb9d-c7df1d04ae4a'
          const pub = 'pub-f986077a-73bd-4c28-8e50-2e44076a84e0'
          const channel = "jkjjsseeeefegeufiehjfkjjjllk" // TODO vary this on url hash or something
          const url = 'wss://pubsub.pubnub.com/' + pub + '/' + sub + '/' + channel

          window.addEventListener('ewieruu', (ev) => console.log(ev))

          const signaller = new RTCSignaller(url, window.userId, message => {
              const t = document.querySelector('.ql-editor p')
              console.log(t)
              console.log(message.data)
              if (t.innerHTML == message.data) return
              t.innerHTML = message.data
            // const x = this.receiveMessage(window.otherUserId, message.data, true)
            // console.error('undefined p[lease', x)
                // .then(console.error)
          });

          this.userJoined(window.otherUserId, 'master', 'write')
          this._setSyncedWith(window.otherUserId)
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
                const t = document.querySelector('.ql-editor p').innerText
                this.signaller.sendMessage(t)
                console.log('send', uid, message)
            }
        }
        broadcast (message) {
            // message = JSON.stringify(message)
            // const array = new Uint32Array(message)
            if (this.signaller.channel) {
                const t = document.querySelector('.ql-editor p').innerText
                this.signaller.sendMessage(t)
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