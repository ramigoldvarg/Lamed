import React, { Component } from 'react';
import DropZone from 'react-dropzone';

class AddValue extends Component {
    constructor() {
        super();
        this.state = { files: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        this.setState(prevState=> {
            return {
                files: prevState.files.concat(files)
            }
        });
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
                        this.state.files.map(file => <li key={file.name}> {file.name} </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default AddValue;