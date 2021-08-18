import './App.css';
import React from 'react';
import axios from 'axios';
import {Container, SearchBar} from './Components';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      theUrl: "taobao.com",
      summaryParts: [],
    }
  }

  updateState = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  callAPI = () => {
    axios.post('http://localhost:5000/check', {
      url: this.state.theUrl
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
    axios.get('http://localhost:5000/check')
    .then((getResponse) => {
      this.setState({summaryParts: getResponse.data});
    })
}

  render() {
    const mapApi = this.state.summaryParts.map((item, i) => 
      <div key={i}>
        <label style={{height: '30%', fontSize: "1.5rem", paddingTop: "10%"}} 
        class="otherText">{item}</label>
      </div>
    )
    return (
      <div className="App">
        <Container>
          <h1 id="mainHeader">HSK Level Checker</h1>
          {this.state.summaryParts.length < 1 ?
          <ul class="otherText">
            <li>Paste the URL into the searchbar</li>
            <li>Select your HSK level</li>
            <li>Click to check what % of your web page's Chinese characters you will know</li>
          </ul> : <div>{mapApi}</div>
            }
          <SearchBar>
            <input placeholder="Enter a URL" type="text" id="searchBox" onChange={this.updateState} 
            style={{height: "65px"}} className="searchItems" name="theUrl" value={this.state.theUrl}></input>
            <button id="checkButton" onClick={this.callAPI} className="searchItems" >Submit</button>

          </SearchBar>
          <label style={{marginTop: "20%"}} class="otherText">Background provided by <a href='https://www.freepik.com/vectors/floral' class="links">rawpixel.com</a></label>
          <label>{this.state.summaryString}</label>
        </Container>
      </div>
    );
  }
}

export default App;
