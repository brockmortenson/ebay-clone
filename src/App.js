import React, { useState } from 'react';
import store from './redux/store';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [ profile, setProfile ] = useState(false);
  const [ user, setUser ] = useState();
  const [ userEmail, setUserEmail ] = useState();
  const [ userProfile, setUserProfile ] = useState();

  // useEffect was not updating properly when passing in redux state into the dependency array so I made a function that will update user state when the mouse is moved instead

  const update = () => {
      setProfile(store.getState().user.isLoggedIn)
      if (profile) {
        setUser(store.getState().user.user.username)
        setUserEmail(store.getState().user.user.email)
        setUserProfile(store.getState().user.user)
        return;
      }
  }

  return (
    <div className="App" onMouseMove={update}>
      <Header
        loggedIn={profile}
        userName={user}
        email={userEmail}
        userProfile={userProfile}
      />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
