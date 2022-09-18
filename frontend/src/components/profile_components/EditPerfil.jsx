import {Card, ListGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";

function EditPerfil() {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://images.pexels.com/photos/544113/pexels-photo-544113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Card.Body>
                <Card.Title>User Name</Card.Title>
                <Card.Text>User Email</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item><Link to={'#'}>Editar perfil</Link></ListGroup.Item>
                <ListGroup.Item><Link to={'#'}>Trocar Senha</Link></ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default EditPerfil;