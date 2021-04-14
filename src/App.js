import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';
import Comments from './components/Comments';
import Input from './components/Input';

function App() {
  const { login, status } = useContext(AuthContext);

  if (!status || !status.github) {
    return (
      <div>
        <h1>Log In</h1>
        <p>login with github</p>
        <button onClick={() => login('github')}>Github Login</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ minWidth: 400 }}>
          <Comments />
          <Input />
        </div>
      </header>
    </div>
  );
}

export default App;
