import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../services/fetchService';

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
            {assigments ? assigments.map(assigment => 
            <div key={assigment.id}>
                <Link to={`/assigments/${assigment.id}`}>Assigments ID: {assigment.id}</Link>
            </div>
            ) : <></>}
            <button onClick={() => createAssigment()}>Submit New Assigment</button>
        </div>
    );
};

export default Dashboard;