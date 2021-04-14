import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';
// import CommentsQuery from './components/CommentsQuery';
import CommentsSubscription from './components/CommentsSubscription';
import Input from './components/Input';

function App() {
  const { login, status } = useContext(AuthContext);

  if (!status || !status.github) {
    return (
      <>
        <h1>Log In</h1>
        <p>login with github</p>
        <button onClick={() => login('github')}>Github Login</button>
      </>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ minWidth: 400 }}>
          {/* <CommentsQuery /> */}
          <CommentsSubscription />
          <Input />
        </div>
      </header>
    </div>
  );
}

export default App;
