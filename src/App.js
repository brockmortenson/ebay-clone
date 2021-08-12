import React, { useEffect } from 'react';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {

  useEffect(() => {
    alert('Fake Store API is currently experiencing a bad gateway which in turn will not allow this website to fetch the necessary data. Please try again later')
  }, [])

  return (
    <div className="App">
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;