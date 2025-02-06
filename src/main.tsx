import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "855310531469-ov6cskfb0sfirejqhg5q5irj4hblai9m.apps.googleusercontent.com";

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Impossible de trouver l'élément avec l'id 'root'.");
}