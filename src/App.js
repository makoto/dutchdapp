import React, { Component } from 'react'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import logo from './logo.png'

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="pure-u-1-1 header">
        <a href="/"><h1>Cooperative Dutch auction for live event ticketing</h1></a>
      </div>

      <main className="container">
        <div className="pure-g">
            {this.props.children}
        </div>
      </main>
      </div>
      
    );
  }
}

export default App
