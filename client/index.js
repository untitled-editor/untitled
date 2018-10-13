import React from 'react'
import ReactDOM from 'react-dom'

import UntitledApp from './components/App'

const Y = require('./lib/Y/index.js')

const untitledEditorMount = document.querySelector('#untitled-editor-app')
ReactDOM.render(<UntitledApp />, untitledEditorMount)