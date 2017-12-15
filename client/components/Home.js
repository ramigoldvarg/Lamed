import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>למד</h1>
                <Link to="/AddValue">
                    +
                </Link>
                <Link to="/tiny">
                    Go To Tiny!
                </Link>
            </div>
        );
    }
}

export default Home;