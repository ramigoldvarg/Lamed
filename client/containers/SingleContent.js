import React, { Component } from 'react';
import Editor from './Editor.js';

import '../stylesheets/index.css'

class SingleContent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className = "row">
                <label className="col-lg-2">בחר הרשאה:</label>
                <Editor className = "col-lg-8"/>
            </div>
        );
    }
}

export default SingleContent;