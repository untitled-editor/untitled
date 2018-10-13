const React = require('react')
const ReactQuill = require('react-quill')
require('react-quill/dist/quill.snow.css')

class UntitledEditor extends React.Component {
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
          <ReactQuill value={this.state.text}
                      onChange={this.handleChange} />
        )
      }
    
}

module.exports = UntitledEditor