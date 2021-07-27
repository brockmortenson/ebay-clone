import React, { useEffect, useState } from 'react';
import store from './redux/store';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [ profile, setProfile ] = useState(false);
  const [ user, setUser ] = useState();
  const [ userEmail, setUserEmail ] = useState();

  let data = store.getState().user.isLoggedIn;

  // useEffect(() => {
    // if (data) {
        // setUser(store.getState().user.user.username)
        // setUserEmail(store.getState().user.user.email)
        // return;
    // }
  // }, [data])

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
    {/* <div className="App"> */}
      <Header
        loggedIn={profile}
        userName={user}
        email={userEmail}
      />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
