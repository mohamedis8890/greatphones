import React from "react";

import Header from "./components/Header";
import Jumbotron from "./components/Jumbotron";
import Album from "./components/Album";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main role="main">
        <Jumbotron />
        <Album />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
