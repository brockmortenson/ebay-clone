import React, { useState } from 'react';
import store from './redux/store';
import routes from './routes';
import Header from './components/Header';
import './App.css';

function App() {
  const [ profile, setProfile ] = useState(false);

  const update = () => {
      setProfile(store.getState().user.isLoggedIn)
  }

  return (
    <div className="App" onMouseMove={update}>
      <Header profileName={profile} />
      {routes}
    </div>
  );
}

export default App;
