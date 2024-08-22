import React from 'react';
import './App.css';
import Search from './components/Search';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
