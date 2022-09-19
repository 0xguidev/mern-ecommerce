import { Card } from 'react-bootstrap';

function ProfileScreen() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProfileScreen;
