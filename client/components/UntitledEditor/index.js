/**
 * React dependencies
 */
import React, {Component} from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'

/**
 * Quill dependencies
 */
import QuillCursors from 'quill-cursors'

/**
 * Quill configuration
 */
Quill.register('modules/cursors', QuillCursors)
const quillModules = {
    cursors: {
        autoRegisterListener: false
    }
}

/**
 * React component
 */
class UntitledEditor extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }
        this.handleChange = this.handleChange.bind(this)
      }
    
      handleChange(value) {
        this.setState({ text: value })
      }
    
      render() {
        return (
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            modules={quillModules}
        />
        )
      }
    
}

export default UntitledEditor