import React, { Component } from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';

import SingleContent from './SingleContent.js';

import '../stylesheets/index.css'

class AddValue extends Component {
    constructor() {
        super();
        this.state = { 
            files: [],
            contents: [""]
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderContentAdd = this.renderContentAdd.bind(this);
        this.addContent = this.addContent.bind(this);
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

    addContent() {
        let newContentes = this.state.contents.slice();
        newContentes.push("");
        this.setState({
            contents: newContentes
        });

        console.log(newContentes);
    }

    renderContentAdd() {
        if (this.state.contents.length == 0) {
            return (
                <div>
                    <SingleContent content = "" />
                </div>
            );
        }
        else {
            return this.state.contents.map((currContent, currIndex) => {
                return (
                    <SingleContent key = {currIndex} content = {currContent} />
                );
            });
        }
    }

    render() {
        return (
            <div className = "addDocumentBody">
                <h1>הוספת ערך חדש</h1>
                <br/><br/>
                {
                    this.renderContentAdd()    
                }
                <br/>
                <div>
                    <button className = "col-lg-2" onClick = {this.addContent}>הוסף תוכן נוסף!</button>
                </div>
                <br/><br/>
                <div>
                    <label>האשטגים:</label>
                    <input type="checkbox" />
                </div>

                <br/><br/>
                <br/><br/>
                <br/><br/>
                <br/><br/>

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
        );
    }
}

export default AddValue;