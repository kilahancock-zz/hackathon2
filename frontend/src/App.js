import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/meta')
      .then(response => response.json())
      .then(data => console.log(data[0]));
  }, [])

  return (
    <div className="App">
      <h1>home</h1>
    </div>
  );
}

export default App;
