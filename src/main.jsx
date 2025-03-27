// This is the entry point of the application. It renders the App component into the root element of the HTML document.
import React from 'react'
import  ReactDom  from 'react-dom/client'
//Imports global styles including Tailwind CSS and custom styles
import './index.css'
import App from './App.jsx'

//Renders the App component into the root element of the HTML document
ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
