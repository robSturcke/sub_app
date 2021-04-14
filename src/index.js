import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createClient, Provider } from 'urql';
import { CLIENT_URL, auth } from './utils/auth';
import { AuthProvider } from './context/AuthContext';

const client = createClient({
  url: CLIENT_URL,
  fetchOptions: {
    headers: { ...auth.authHeaders() },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider auth={auth}>
      <Provider value={client}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
