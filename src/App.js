import React from 'react';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {

  return (
    <div className="App">
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;