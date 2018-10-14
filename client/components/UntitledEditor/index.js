/**
 * React dependencies
 */
import React, {Component} from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'quill/dist/quill.snow.css'
import 'quill-cursors/dist/quill-cursors.css'

/**
 * Y
 */
import Y from 'yjs'
import yRtcSignaller from './lib/y-rtc-signaller'
Y.extend(yRtcSignaller)
// import yWebsocketsClient from 'y-websockets-client'
// Y.extend(yWebsocketsClient)
// import ySocketIoRtcTransport from './lib/y-socket.io-p2p'
// Y.extend(ySocketIoRtcTransport)
// import yPeerJs from './lib/y-peerjs'
// Y.extend(yPeerJs)

/**
 * Quill dependencies
 */
import QuillCursors from 'quill-cursors'

/**
 * Quill configuration
 */
Quill.register('modules/cursors', QuillCursors)
const quillModules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['link', 'image'],
        ['link', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }]
    ],
    cursors: {
        hideDelay: 500
    }  
}
const quillRuntime = quill => {}

/**
 * React component
 */
class UntitledEditor extends Component {
    constructor(props) {
        super(props)
        this.quill = React.createRef()
        this.state = {y: null}
      }

      start() {
        if (this.state.y) {
          this.state.y.connector.signaller.startBroadcasting()
        }
      }

      componentDidMount() {
        const y = new Y('untitled-ws-channel', {
            db: {
                name: 'memory'
            },
            connector: {
              name: 'webrtc-signaller'
            }
        })
        this.setState({y})
        const users = y.define('users', Y.Array)
        const editorState = y.define('textState', Y.Text)

        const quill = this.quill.current.getEditor()
        const quillBinding = new Y.QuillBinding(editorState, quill)

        const me = new Y.Map()
        me.set('name', 'Alex')
        me.set('color', 'red')
        users.push([me])

        const cursors = quill.getModule('cursors')
        cursors.registerTextChangeListener()
        function drawCursors() {
          cursors.clearCursors()
          users.map((user, userId) => {
            if (user == me) return
              const relativeRange = user.get('range')
              const lastUpdated = new Date(user.get('updated'))
              if (lastUpdated != null && new Date() - lastUpdated < 60000 && relativeRange != null) {
                const start = Y.utils.fromRelativePosition(y, relativeRange.start).offset
                const end = Y.utils.fromRelativePosition(y, relativeRange.end).offset
                cursors.setCursor(userId + '', { index: start, length: end - start }, user.get('name'), user.get('color'))
              }
            }
          )
        }

        drawCursors()
        users.observeDeep(drawCursors)

        quill.on('selection-change', function (range) {
          if (range != null) {
            me.set('range', {
              start: Y.utils.getRelativePosition(editorState, range.index),
              end: Y.utils.getRelativePosition(editorState, range.index + range.length)
            })
          }
          me.set('updated', new Date().toString())
        })
        
      }
    
      render() {
        return (<div>
            <button onClick={this.start.bind(this)}>Start</button>
              <ReactQuill
                  ref={this.quill}
                  placeholder={"Untitled..."}
                  onChange={this.handleChange}
                  modules={quillModules}
              />
            </div>
        )
      }
    
}

export default UntitledEditor