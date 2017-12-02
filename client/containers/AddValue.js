import React, { Component } from 'react';

class AddValue extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            הוספת ערך חדש
            <input type="file" multiple />
            </div>
        );
    }
}

export default AddValue;