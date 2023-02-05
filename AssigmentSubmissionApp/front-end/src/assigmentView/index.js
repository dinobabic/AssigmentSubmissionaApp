import React, { useEffect, useState } from 'react';
import ajax from '../services/fetchService';
import { useLocalState } from '../util/useLocalStorage';

const AssigmentView = () => {
    const assigmentId = window.location.href.split("/assigments/")[1];
    const [assigment, setAssigment] = useState({
        branch: "",
        githubUrl: ""
    });
    const [jwt, setJwt] = useLocalState("", "jwt");

    function updateAssigment(property, value) {
        const newAssigment = {...assigment};
        newAssigment[property] = value;
        setAssigment(newAssigment);
    }

    function save() {
        ajax(`/api/assigments/${assigmentId}`, "put", jwt, assigment)
        .then((dataAssigment) => {
            setAssigment(dataAssigment);
        });
    }

    useEffect(() => {
        ajax(`/api/assigments/${assigmentId}`, "get", jwt, null)
        .then((assigmentFetchd) => {
            if (assigmentFetchd.branch === null) {
                assigmentFetchd.branch = "";
            }
            if (assigmentFetchd.githubUrl === null) {
                assigmentFetchd.githubUrl = "";
            }
            setAssigment(assigmentFetchd);
        });
    }, []);

    return (
        <div>
            <h1>Assigment {assigmentId}</h1>
            {assigment ? (
                <>
                    <h2>Status: {assigment.status}</h2>
                    <h2>Github URL: 
                        <input type="url" id="githubUrl"
                        value={assigment.githubUrl}
                        onChange={(event) => updateAssigment("githubUrl", event.target.value)}/>
                    </h2>
                    <h2>Branch: 
                        <input type="text" id="branch"
                        value={assigment.branch}
                        onChange={(event) => updateAssigment("branch", event.target.value)}/>
                    </h2>
                    <button onClick={() => save()}>Submit Assigment</button>
                </>
            ) 
            : (
            <></>
            )}
        </div>
    );
};

export default AssigmentView;