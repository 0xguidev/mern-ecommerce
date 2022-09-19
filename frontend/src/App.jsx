import React from 'react';
import {Container} from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Router from './Router';

const App = () => {
    return (<>
            <Header/>
            <main>
                <Container>
                    <Router/>
                </Container>
            </main>
            <Footer/>
        </>
    );
};

export default App;
