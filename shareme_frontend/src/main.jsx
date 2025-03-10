import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider
		clientId={String(import.meta.env.VITE_APP_GOOGLE_API_TOKEN)}
	>
		<Router>
			<App />
		</Router>
	</GoogleOAuthProvider>
)
