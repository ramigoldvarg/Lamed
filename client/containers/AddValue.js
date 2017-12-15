import React, { Component } from 'react';

import Editor from './Editor.js'

import DropZone from 'react-dropzone';
import axios from 'axios';

import '../stylesheets/index.css'

class AddValue extends Component {
    constructor() {
        super();
        this.state = { files: [] };
        this.onDrop = this.onDrop.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.SelectText = this.SelectText.bind(this);
    }

    onDrop(files) {
        let data = new FormData();
        
        files.map(file=> {
            data.append(file.name, file, file.name);
        });

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        const request = axios.post('/pages/images', data, config);
        request.then(result => {
            this.setState({files: result.data.imageUrls});
        })
    }

    handleClick(event) {
        event.target.select();
        document.execCommand("Copy");
    }

    renderContentAdd() {
        
    }

    render() {
        return (
            <div className = "addDocumentBody">
                <h1>הוספת ערך חדש</h1>
                <br/><br/>
                <div className = "row">
                    <label className="col-lg-1">בחר הרשאה:</label>
                    <Editor className = "col-lg-6"/>
                    <div className="col-lg-2">
                        <DropZone onDrop={this.onDrop}>
                            <p>מה עם איזה תמונה?</p>
                        </DropZone>
                        <span>
                            {
                                this.state.files.map(file => <input value={file} onClick={this.handleClick} key={file} readOnly/>)
                            }
                            {
                                this.state.files.map(file => <span key={file}> <img style={{width: "60px", height:"60px"}} src={file}/> </span>)
                            }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddValue;