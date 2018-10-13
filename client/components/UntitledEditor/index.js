/**
 * React dependencies
 */
import React, {Component} from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'

/**
 * Y
 */
import Y from 'yjs'
import yWebsocketsClient from 'y-websockets-client'
Y.extend(yWebsocketsClient)

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

/**
 * React component
 */
class UntitledEditor extends Component {
    constructor(props) {
        super(props)
        this.quill = React.createRef()
      }

      componentDidMount() {
        const y = new Y('untitled-ws-channel', {
            db: {
                name: 'memory'
            },
            connector: {
                name: 'websockets-client',
                url: 'https://untitled-ws-server.herokuapp.com'
            }
        })
        const editorState = y.define('textState', Y.Text)
        const quillBinding = new Y.QuillBinding(editorState, this.quill.current.getEditor())

      }

      getYjsBinding(){}
    
      render() {
        return (
            <ReactQuill
                ref={this.quill}
                placeholder={"Untitled..."}
                onChange={this.handleChange}
                modules={quillModules}
            />
        )
      }
    
}

export default UntitledEditor