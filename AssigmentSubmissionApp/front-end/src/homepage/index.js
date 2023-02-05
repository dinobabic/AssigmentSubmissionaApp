import React from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Homepage = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return (
        <div>
            <h1>Homepage</h1>
        </div>
    );
};

export default Homepage;