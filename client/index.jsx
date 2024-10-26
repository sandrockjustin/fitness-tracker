import React from 'react'
import App from './components/App.jsx'
import { createRoot } from 'react-dom/client';

//clears existing html content
document.body.innerHTML = '<div id="app"></div>';


const domNode = document.getElementById('app');
const root = createRoot(domNode);

root.render( <App />)