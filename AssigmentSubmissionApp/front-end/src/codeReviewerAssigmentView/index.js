import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import ajax from '../services/fetchService';
import { useLocalState } from '../util/useLocalStorage';

const CodeReviewerAssigmentView = () => {
    const assigmentId = window.location.href.split("/assigments/")[1];
    const [assigment, setAssigment] = useState({
        branch: "",
        githubUrl: "",
        number: null,
        status: null
    });
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assigmentEnums, setAssigmentEnums] = useState([]);
    const [assigmentStatuses, setAssigmentStatuses] = useState([]);

    const previousAssigmentValue = useRef(assigment);

    function updateAssigment(property, value) {
        const newAssigment = {...assigment};
        newAssigment[property] = value;
        setAssigment(newAssigment);
    }

    function save(status) {
        if (status && assigment.status !== status) {
            updateAssigment("status", status);
            window.location.href = "/dashboard"
        }
        else {
            ajax(`/api/assigments/${assigmentId}`, "put", jwt, assigment)
            .then((dataAssigment) => {
                setAssigment(dataAssigment);
                window.location.href = "/dashboard"
            });
        }
    }

    useEffect(() => {
        if (previousAssigmentValue.current.status !== assigment.status) {
            ajax(`/api/assigments/${assigmentId}`, "put", jwt, assigment)
            .then((dataAssigment) => {
                setAssigment(dataAssigment);
            });
        }
        previousAssigmentValue.current = assigment;
    }, [assigment]);

    useEffect(() => {
        ajax(`/api/assigments/${assigmentId}`, "get", jwt, null)
        .then((assigmentResponse) => {
            let assigmentFetched = assigmentResponse.assigment;
            setAssigmentEnums(assigmentResponse.assigmentEnums);
            setAssigment(assigmentFetched);
            setAssigmentStatuses(assigmentResponse.statusEnums);
        });
    }, []);

    return (
        <Container className="mt-5">
            <Row className='justify-content-center'>
                <Col md="10" lg="8">
                    {assigment ? (
                        <Card>
                            <Card.Header className='text-center'>
                                {assigment.number ? <h1>Assigment {assigment.number}</h1> : <h1>Select an Assigment</h1>}
                            </Card.Header>
                            <Card.Body>
                                <Row className='d-grid justify-content-start'>
                                    <Card.Subtitle className='rounded-pill bg-primary text-white'>
                                        {assigment.status}
                                    </Card.Subtitle>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='mt-3'>
                                            <Form.Label htmlFor='githubUrl' style={{fontSize: "22px"}}>GitHub URL</Form.Label>
                                            <Form.Control 
                                                type="url" 
                                                id="githubUrl"
                                                readOnly
                                                placeholder='Type in your GitHub URl' 
                                                value={assigment.githubUrl} 
                                                onChange={(event) => updateAssigment("githubUrl", event.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='mt-3'>
                                            <Form.Label htmlFor='branch' style={{fontSize: "22px"}}>Branch</Form.Label>
                                            <Form.Control
                                             type='text'
                                             id="branch"
                                             readOnly
                                             placeholder='Type in branch name'
                                             value={assigment.branch}
                                             onChange={(event) => updateAssigment("branch", event.target.value)}/>
                                        </Form.Group>
                                    </Col> 
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='mt-3'>
                                            <Form.Label htmlFor='videoUrl' style={{fontSize: "22px"}}>Video Review URL</Form.Label>
                                            <Form.Control 
                                                type="url" 
                                                id="videoUrl"
                                                placeholder='Type in your Video Review URl' 
                                                value={assigment.codeReviewVideoUrl} 
                                                onChange={(event) => updateAssigment("codeReviewVideoUrl", event.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='d-flex mt-3'>
                                    <Col className='d-flex justify-content-between'>
                                        <div>
                                        <Button className='me-2' onClick={() => {save(assigmentStatuses[4].status);}}>Complete Reviewe</Button>
                                        <Button variant="warning" onClick={() => {save(assigmentStatuses[3].status);}}>Needs Update</Button>
                                        </div>
                                        <Button variant='secondary' onClick={() => {window.location.href = "/dashboard"}}>Back</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ) 
                    : (
                    <></>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CodeReviewerAssigmentView;