import React, { Component } from 'react';
import Editor from './Editor.js';

import '../stylesheets/index.css'

class SingleContent extends Component {
    constructor(content) {
        super(content);
        this.state = { 
            files: [],
            contents: []
        };
    }

    render() {
        return (
            <div className = "row">
                <label className="col-lg-2">בחר הרשאה:</label>
                <Editor content = {this.props.content} className = "col-lg-8"/>
            </div>
        );
    }
}

export default SingleContent;