import {Container} from '../StyledComponents';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div className="App">
        <Container>
          <h1 id="mainHeader">HSK Level Checker</h1>
          <div>
            <h3 class="otherText">Welcome to the HSK Level Checker</h3>
            <p style={{width: '80%', margin: 'auto'}} class="otherText">This tool compares web pages to HSK vocabulary lists, showing what % of Chinese characters you should understand
                on your selected web page (according to your HSK level)
            </p>
          </div>
          <Link to='/check'><button style={{margin: 'auto'}}>Click to get started!</button></Link>
          <label style={{marginTop: "20%"}} class="otherText">Background provided by <a href='https://www.freepik.com/vectors/floral' class="links">rawpixel.com</a></label>
        </Container>
      </div>
    )
}