import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import App from './App'
import './assets/images/icons.svg'
import '../node_modules/@plake492/t_css_utils/src/index.scss'
import '../../scss/index.scss'

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(<App />)
