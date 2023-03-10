import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import ajax from '../services/fetchService';
import { useLocalState } from '../util/useLocalStorage';

const AssigmentView = () => {
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

    function save() {
        if (assigment.status === assigmentStatuses[0].status) {
            updateAssigment("status", assigmentStatuses[1].status);
            window.location.href = "/dashboard";
        }
        else if (assigment.status === assigmentStatuses[3].status) {
            updateAssigment("status", assigmentStatuses[2].status);
            window.location.href = "/dashboard";
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
                                    <Col className='d-flex align-content-center justify-content-start'>
                                        <Form.Group className='mt-3'>
                                            <Form.Label className='me-4' htmlFor='assigmentName' style={{fontSize: "22px"}}>Assigment Number</Form.Label>
                                            <DropdownButton
                                                as={ButtonGroup}
                                                id="assigmentName"
                                                variant={"info"}
                                                title={assigment.number ? `Assigment ${assigment.number}` : "Select an Assigment"}
                                                onSelect={(selectedElement) => {
                                                    updateAssigment("number", selectedElement);
                                                }}>
                                                {assigmentEnums.map((assigmentEnum) => 
                                                    <Dropdown.Item key={assigmentEnum.assigmentNumber} eventKey={assigmentEnum.assigmentNumber}>
                                                        {assigmentEnum.assigmentNumber}
                                                    </Dropdown.Item>
                                                )}
                                            </DropdownButton>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='mt-3'>
                                            <Form.Label htmlFor='githubUrl' style={{fontSize: "22px"}}>GitHub URL</Form.Label>
                                            <Form.Control 
                                                type="url" 
                                                id="githubUrl"
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
                                             placeholder='Type in branch name'
                                             value={assigment.branch}
                                             onChange={(event) => updateAssigment("branch", event.target.value)}/>
                                        </Form.Group>
                                    </Col> 
                                </Row>
                                {assigment.status === "Completed" ? 
                                (   <div>
                                    <Row>
                                        <Col>
                                            <Form.Group className='mt-3'>
                                                <Form.Label htmlFor='videoUrl' style={{fontSize: "22px"}}>Review Video URL</Form.Label>
                                                <Form.Control
                                                type='url'
                                                id="videoUrl"
                                                placeholder='Type in branch name'
                                                value={assigment.codeReviewVideoUrl}
                                                onChange={(event) => updateAssigment("codeReviewVideoUrl", event.target.value)}/>
                                            </Form.Group>
                                        </Col> 
                                    </Row>
                                    <Row className='d-flex mt-3'>
                                        <Col className='d-flex justify-content-between'>
                                            <Button variant='secondary' onClick={() => {window.location.href = "/dashboard"}}>Back</Button>
                                        </Col>
                                    </Row>
                                    </div>
                                )
                                : (
                                    <Row className='d-flex mt-3'>
                                        <Col className='d-flex justify-content-between'>
                                            <Button onClick={() => {save(); /*window.location.href= "/dashboard"*/}}>Submit Assigment</Button>
                                            <Button variant='secondary' onClick={() => {window.location.href = "/dashboard"}}>Back</Button>
                                        </Col>
                                    </Row>
                                )}
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

export default AssigmentView;