import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import axios from 'axios';

class AddValue extends Component {
    constructor() {
        super();
        this.state = { files: [] };
        this.onDrop = this.onDrop.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        event.target.name.select();
        document.execCommand("Copy");
    }

    render() {
        return (
            <div>
                הוספת ערך חדש
                <textarea />
                <DropZone onDrop={this.onDrop}>
                    <p>מה עם איזה תמונה?</p>
                </DropZone>
                <ul>
                    {
                        this.state.files.map(file => <li name={file} onClick={this.handleClick} key={file}> {file} </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default AddValue;