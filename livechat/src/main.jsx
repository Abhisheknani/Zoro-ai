import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';
import Cookies from "js-cookie";
import theme from './Components/Pages/ThemeProvider.jsx'
import { ThemeProvider } from '@emotion/react'

// axios.defaults.baseURL = 'http://127.0.0.1:8000/'
axios.defaults.baseURL = 'https://zoro-ai-api.onrender.com/'


const token = Cookies.get('token');

if(token){
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
}


createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
)
