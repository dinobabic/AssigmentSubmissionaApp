import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useLocalState } from '../util/useLocalStorage';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        if (!jwt) {
            const requestBody = {
                "username": username,
                "password": password
            };
            
            fetch("api/auth/login", {
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody),
                method: "post"
            })
            .then(response => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers])
                }
                else {
                    return Promise.reject("Invalid Login Attempt");
                }
            })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "/dashboard";
            }).catch((message) => {
                alert(message);
            });
        }
    }

    return (
        <Container >
            <Row className='justify-content-center'>
                <Col md="10" lg="8">
                    <Card className='mt-5'>
                        <Card.Header style={{textAlign: "center"}}>
                            <Card.Title style={{fontSize: "30px"}}>
                                Please Login
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>    
                                    <Form.Group className='mt-3'>
                                        <Form.Label htmlFor='username' style={{fontSize: "22px"}}>Username</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        id="username" 
                                        placeholder='joe@gmail.com'
                                        value={username} 
                                        onChange={(event) => setUsername(event.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className='mt-3'>
                                        <Form.Label htmlFor='password' style={{fontSize: "22px"}}>Passowrd</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            id="password"
                                            placeholder='Type in your password' 
                                            value={password} 
                                            onChange={(event) => setPassword(event.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className='mt-3 d-flex flex-column gap-2 flex-md-row justify-content-md-between'>
                                        <Button size='lg' id="submit" type="button" onClick={() => sendLoginRequest()}>
                                            Login
                                        </Button>
                                        <Button variant="secondary" size='lg' type="button" onClick={() => window.location.href = "/"}>
                                            Exit
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;