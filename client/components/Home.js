import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchContent from './SearchContent.js';
import '../stylesheets/index.css';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className = "content">
                <h1 className="header">למד</h1> 
                <br />
                <SearchContent />
                <div className="add-document-button"> 
                    <Link to="/AddDocument">
                        <button className = "btn btn-success" onClick={this.onClickHandler}> הוסף ערך חדש! </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;