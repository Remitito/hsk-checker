import {NavBarStyled} from "../StyledComponents";
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (
        <div>
            <NavBarStyled>
                <Link to="/check"><label>Check a web page</label></Link>
                <Link to="/browse"><label>Browse ranked web pages</label></Link>
            </NavBarStyled>
        </div>
    )
}