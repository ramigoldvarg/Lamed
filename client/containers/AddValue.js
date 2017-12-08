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
        event.target.select();
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
                <span>
                    {
                        this.state.files.map(file => <input id="a" value={file} onClick={this.handleClick} key={file} readOnly/>)
                    }
                </span>
            </div>
        );
    }
}

export default AddValue;