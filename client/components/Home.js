import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchContent from './SearchContent.js';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>למד</h1>
                <Link to="/AddDocument">
                    +
                </Link>
                <Link to="/tiny">
                    Go To Tiny!
                </Link>
                <br />
                <SearchContent />
            </div>
        );
    }
}

export default Home;