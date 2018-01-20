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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleContentChange(content) {
        this.props.content.content = content;
    }

    handlePermissionChoose(e) {
        this.props.onPermissionChange(e.target);
    }

    renderPermissions() {
        return (
            // Added the id so could find the content more easily
            <select id={`permission${this.props.passedId}`} value={this.props.content.permission} onChange = {this.handlePermissionChoose}>
                {
                    permissions.map((currPermission, currIndex) => {
                        return <option value = {currPermission} key={currIndex}> {currPermission} </option>
                    })
                }
            </select>
        )
    }

    handleDelete() {
        this.props.onDeleteContent(this.props.passedId);
    }

    render() {
        return (
            <div className = "row">
                {
                    this.renderPermissions()
                }
                <Editor passedId={this.props.passedId} content={this.props.content.content}
                        className = "col-lg-8" isReadOnly = {this.props.isReadOnly} handleContentChage={this.handleContentChange}/>
                <button onClick={this.handleDelete}>X</button>
            </div>
        );
    }
}

export default SingleContent;