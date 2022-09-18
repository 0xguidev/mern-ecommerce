import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Router from './Router';
import SideBarMenu from './components/SideBarMenu'

const App = () => {
    return (
        <Container className="app-container">
            <Header />
            <Row className="main-page-row fixed-left">
                <Col sm={2}>
                    <SideBarMenu />
                </Col>
                <Col sm={10}>
                    <main >
                        <Container>
                            <Router />
                        </Container>
                    </main>
                </Col>
            </Row>
            <Footer />
        </Container>
    );
};

export default App;
