import React, { useState } from 'react';
import store from './redux/store';
import routes from './routes';
import Header from './components/Header';
import './App.css';

function App() {
  const [ profile, setProfile ] = useState(false);
  const [ user, setUser ] = useState();
  const [ userEmail, setUserEmail ] = useState();

  const update = () => {
      setProfile(store.getState().user.isLoggedIn)
      if (profile) {
        setUser(store.getState().user.user.username)
        setUserEmail(store.getState().user.user.email)
        return;
      }
  }

  return (
    <div className="App" onMouseMove={update}>
      <Header
        loggedIn={profile}
        userName={user}
        email={userEmail} />
      {routes}
    </div>
  );
}

export default App;
