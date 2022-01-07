import React from 'react';
import axios from 'axios';
import {Container, Post} from '../StyledComponents';
import { map } from 'cheerio/lib/api/traversing';
import '../index.css';

export default class Browse extends React.Component {
    constructor() {
        super()
        this.state = {
            pageCollection: [], 
        }
    }

    getPages = () => {
        axios.get('http://localhost:5000/browse')
        .then((getResponse) => {
          this.setState({pageCollection: getResponse.data})});
    };

    componentDidMount = async() => {
        axios.get('http://localhost:5000/browse')
        .then((getResponse) => {
          this.setState({pageCollection: getResponse.data})});
        
    };

    suitableLevel = (levelArray) => {
        for(let h = 1; h <= levelArray.length; h++) {
            if(levelArray[h] >= 75) {
                return h;
            }
        }
    }

    getTitle = (urlString) => {
        // Extract website title from URL
        let firstDot = 0;
        let lastDot = 0; // for finding the middle of the URL
        for(let i = 0; i < urlString.length; i++) {
            if(urlString[i] === "." && firstDot === 0) {
                firstDot = i;
            }
            else if(urlString[i] === "." && firstDot > 0) {
                lastDot = i;
            }
        }
        let urlMain = "";
        for(let e = firstDot + 1; e < lastDot; e++) {
            urlMain += urlString[e]
        }
        return urlMain.charAt(0).toUpperCase() + urlMain.slice(1); // capitalize first letter
    }
    render() {
        const mapApi = this.state.pageCollection.map((item, i) => 
      <div key={i} className="postCont">
        <Post>
        <label class="otherText">{this.getTitle(item.title)}</label>
        <label class="otherText">Suitable for HSK 
        {this.suitableLevel([item.hsk1, item.hsk2, item.hsk3, item.hsk4, item.hsk5, item.hsk6])} and above</label>
        </Post>
      </div>
    )
        return (
            <div className="App">
                <Container>
                    <div>{mapApi}</div>
                    <button>Get Books</button>
                </Container>
            </div>
        )
    }
}