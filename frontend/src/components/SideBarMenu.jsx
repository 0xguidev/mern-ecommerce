import {Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

function SideBarMenu() {
    return (
        <Container className="sidebar-menu">
            <Card.Body>
                <Card.Title><Link to={'/profile/edit'}>Edit perfil</Link></Card.Title>
            </Card.Body>
            <Card.Body>
                <Card.Title><Link to={'/profile/orders'}>You Orders</Link></Card.Title>
            </Card.Body>
            <Card.Body>
                <Card.Title><Link to={'/profile/mail'}>Your Messages</Link></Card.Title>
            </Card.Body>
            <Card.Body>
                <Card.Title><Link to={'/profile/settings'}>Settings</Link></Card.Title>
            </Card.Body>
        </Container>
    );
}

export default SideBarMenu;