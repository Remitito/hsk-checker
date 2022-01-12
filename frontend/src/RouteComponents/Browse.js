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

    deletePage = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
        this.getPages();
    };

    suitableLevel = (levelArray) => {
        for(let h = 1; h <= levelArray.length; h++) {
            if(levelArray[h] >= 75) {
                return h;
            }
        }
    }

    getTitle = (urlString) => {
        // Show everything before first dot as the title, e.g. [TAOBAO].com
        let dotIndex = 0; 
        for(let i = 0; i < urlString.length; i++) {
            if(urlString[i] === ".") {
                dotIndex = i;
            }
        }
        return urlString.charAt(0).toUpperCase() + urlString.slice(1, dotIndex); // capitalize first letter
    }
    render() {
        const mapApi = this.state.pageCollection.map((item, i) => 
      <div key={i} className="postCont">
        <Post>
        <label class="otherText">{this.getTitle(item.title)}</label>
        <label class="otherText">Suitable for HSK 
        {this.suitableLevel([item.hsk1, item.hsk2, item.hsk3, item.hsk4, item.hsk5, item.hsk6])} and above</label>
        <button onClick={() => this.deletePage(item._id)}>Delete</button>
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