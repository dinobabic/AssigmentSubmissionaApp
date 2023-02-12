import React, { useState, useEffect } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../services/fetchService';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");  
    const [assigments, setAssigments] = useState(null);

    useEffect(() => {
        ajax("api/assigments", "get", jwt, null)
        .then((assigmentsData) => {
            setAssigments(assigmentsData);
        });
    }, []);

    function createAssigment() {
        ajax("/api/assigments", "post", jwt, null)
        .then((assigment) => {
            window.location.href = `/assigments/${assigment.id}`;
        });
    }

    return (
        <div style={{margin: "2em"}}>
            <Container>
                <Row className='d-flex justify-content-center mb-5'>
                    <Col>
                        <Button size='lg' onClick={() => createAssigment()}>Submit New Assigment</Button>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <span style={{cursor: "pointer"}} href="#" onClick={() => {
                            setJwt(null);
                            window.location.href = "/login"
                        }}>Logout</span>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} className="g-4">
                {assigments ? assigments.sort((x, y) => x.number - y.number).map(assigment => 
                <Col key={assigment.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Container className='d-flex align-items-center justify-content-between'>   
                            <Card.Title>Assigment <br></br> #{assigment.number}</Card.Title>
                                        <Badge className='' pill bg='primary' style={{fontSize: "10px"}}>
                                            <Card.Subtitle className="text-white">{assigment.status}</Card.Subtitle>
                                        </Badge>
                            </Container>
                            <Card.Text style={{marginTop: "15px"}}>
                                    GitHub URL: {assigment.githubUrl} <br></br>                 
                                    Branch: {assigment.branch}
                            </Card.Text>
                            <Row className='ms-3 me-3'>
                                <Button variant='secondary' onClick={() => window.location.href=`/assigments/${assigment.id}`}>
                                    Edit
                                </Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                ) : <></>}
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;