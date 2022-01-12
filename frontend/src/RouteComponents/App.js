import React from 'react';
import axios from 'axios';
import {Container, SearchBar} from '../StyledComponents';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      theUrl: "",
      summaryParts: [],
      postResponse: '',
    }
  }

  updateState = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  postReq = async() => {
    if(this.state.theUrl.length > 0) {
    await axios.post('http://localhost:5000/check', {
      url: this.state.theUrl
    }).then(function(response) {
      console.log("Success")
    }).catch(function(error) {
      console.log(error)});
    }
    else {
      return 1;
    }
    return "Finished"
  }
  
  getReq = async(result) => {
    if(result != 'Finished') {
      console.log("Failed")
    }
    else {
      axios.get('http://localhost:5000/check')
      .then((getResponse) => {
        this.setState({summaryParts: getResponse.data, postResponse: ""})});
    }
  };

  callApi = async() => {
    let result = await this.postReq();
    await this.getReq(result);
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
            <button id="checkButton" onClick={this.callApi} className="searchItems" >API</button>
          </SearchBar>
          <label style={{marginTop: "20%"}} class="otherText">Background provided by <a href='https://www.freepik.com/vectors/floral' class="links">rawpixel.com</a></label>
        </Container>
      </div>
    );
  }
}

export default App;
