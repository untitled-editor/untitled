const React = require('react')
const ReactDOM = require('react-dom')

const UntitledApp = require('./components/App')

const untitledEditorMount = document.querySelector('#untitled-editor-app')

ReactDOM.render(<UntitledApp />, untitledEditorMount)