import React, { useState, useEffect } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../services/fetchService';
import jwt_decode from "jwt-decode";
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';

const CodeReviewerDashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");  
    const [assigments, setAssigments] = useState(null);

    useEffect(() => {
        ajax("api/assigments", "get", jwt, null)
        .then((assigmentsData) => {
            setAssigments(assigmentsData);
        });
    }, []);

    function claimAssigment(assigment) {
        const jwtDecoded = jwt_decode(jwt);
        const user = {
            username: jwtDecoded.sub
        };
        assigment.codeReviewer = user;
        assigment.status = "In Review";
        ajax(`api/assigments/${assigment.id}`, "put", jwt, assigment)
            .then((updatedAssigment) => {
                const assigmentCopy = [...assigments];
                const i = assigmentCopy.findIndex((a) => a === assigment.id);
                assigmentCopy[i] = updatedAssigment;
                setAssigments(assigmentCopy);
            })
    }

    function editReview(assigment) {
        window.location.href = `assigments/${assigment.id}`
    }

    return (
        <div style={{margin: "2em"}}>
            <Container>
                <Row className='d-flex justify-content-center mb-5'>
                    <Col className='d-flex justify-content-end'>
                        <span style={{cursor: "pointer"}} href="#" onClick={() => {
                            setJwt(null);
                            window.location.href = "/login"
                        }}>Logout</span>
                    </Col>
                </Row>

                <Row xs={1} md={2} lg={3} className="g-4">
                
                    <Col className="submitted assigment-wrapper">
                        <div className='d-flex justify-content-center'>
                            <h3>Awaiting Review</h3>
                        </div>
                        {assigments ? assigments.sort((x, y) => x.number - y.number).filter((assigment) => assigment.status === "Submitted").map(assigment => 
                        <Col key={assigment.id} className="d-flex justify-content-center">
                            <Card style={{ width: '18rem' }} className="mt-4">
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
                                        <Button variant='secondary' onClick={() => claimAssigment(assigment)}>
                                            Claim
                                        </Button>
                                    </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    ) : <></>}
                </Col>
                <Col className="in-review assigment-wrapper">
                    <div className='d-flex justify-content-center'>
                            <h3>In Review</h3>
                    </div>
                    {assigments ? assigments.sort((x, y) => x.number - y.number).filter((assigment) => assigment.status === "In Review").map(assigment => 
                    <Col key={assigment.id} className="d-flex justify-content-center">
                        <Card style={{ width: '18rem' }} className="mt-4">
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
                                    <Button variant='secondary' onClick={() => editReview(assigment)}>
                                        Edit Review
                                    </Button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    ) : <></>}
                </Col>
                <Col className="needs-update assigment-wrapper">
                    <div className='d-flex justify-content-center'>
                        <h3>Needs Update</h3>
                    </div>
                    {assigments ? assigments.sort((x, y) => x.number - y.number).filter((assigment) => assigment.status === "Needs Update").map(assigment => 
                    <Col key={assigment.id} className="d-flex justify-content-center">
                        <Card style={{ width: '18rem' }} className="mt-4">
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
                                    <Button variant='secondary' onClick={() => editReview(assigment)}>
                                        View
                                    </Button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    ) : <></>}
                </Col>
            </Row>
        </Container>
    </div>
    );
};

export default CodeReviewerDashboard;