import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Router from './Router';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default App;
