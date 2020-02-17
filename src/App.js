import React from "react";

import "./App.css";

import Header from './components/Header/Header';
import ImageList from "./components/Image/ImageList";

const App = () => {
  return (
    <div className="App">
      <Header />
      <ImageList />
    </div>
  );
};

export default App;
