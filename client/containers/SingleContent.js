import React, { Component } from 'react';
import Editor from './Editor.js';
import {permissions} from '../globals.js'

import '../stylesheets/index.css'

class SingleContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenPermission: permissions[0]
        }

        this.handlePermissionChoose = this.handlePermissionChoose.bind(this);
        this.renderPermissions = this.renderPermissions.bind(this);
    }

    handlePermissionChoose(e) {
        this.props.onPermissionChange(e.target.value);
    }

    renderPermissions() {
        return (
            // Added the id so could find the content more easily
            <select defaultValue={this.props.content.permission || permissions[0]} onChange = {this.handlePermissionChoose}>
                {
                    permissions.map((currPermission, currIndex) => {
                        return <option value = {currPermission} key={currIndex}> {currPermission} </option>
                    })
                }
            </select>
        )
    }

    render() {
        return (
            <div className = "row">
                {
                    this.renderPermissions()
                }
                <Editor passedId={this.props.passedId} content={this.props.content.content} className = "col-lg-8"/>
            </div>
        );
    }
}

export default SingleContent;