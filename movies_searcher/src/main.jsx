import React from 'react'
import ReactDOM from 'react-dom/client'
import { MoviesSearcher } from './MoviesSearcher'
import "./styles/main.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MoviesSearcher></MoviesSearcher>
  </React.StrictMode>,
)
