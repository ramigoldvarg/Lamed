import React, { Component } from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addPage} from '../actions/index.js';
import {hashtags} from '../globals.js';
import {permissions} from '../globals.js'
import SingleContent from '../components/SingleContent.js';
import { Link } from 'react-router-dom';

import '../stylesheets/index.css'

class AddDocument extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            files: [],
            documentName: "",
            contents: [ {
                "permission": permissions[0],
                "content": ""
            }],
            chosenHashtags: [],
            // lastPermission: permissions[0]
        };

        this.onDrop = this.onDrop.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderContentAdd = this.renderContentAdd.bind(this);
        this.addContent = this.addContent.bind(this);
        this.renderHashtags = this.renderHashtags.bind(this);
        this.hashtagClicked = this.hashtagClicked.bind(this);
        this.handleDocumentNameChange = this.handleDocumentNameChange.bind(this);
        this.addDocument = this.addDocument.bind(this);
        this.handleLastPermissionChange = this.handleLastPermissionChange.bind(this);
        this.handleDeleteContent = this.handleDeleteContent.bind(this);
    }

    componentWillUnmount() {
        tinyMCE.remove();
    }

    // Handles the drop event on the dropzone.
    onDrop(files) {
        let data = new FormData();
        
        // Goes through every single file that was chosen and adds it to the data
        // that will be sent
        files.map(file=> {
            data.append(file.name, file, file.name);
        });

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        // Uploading the pictures to the server
        const request = axios.post('/pages/images', data, config);

        // Shows the images that were added
        request.then(result => {
            let updatedContentWithImages = tinyMCE.activeEditor.getContent();

            // Adds the images to the current text with fixed size
            updatedContentWithImages = result.data.imageUrls.reduce((acu,curr)=>acu + "<img src='" + curr + "' height='200' width='200'/>", updatedContentWithImages);

            // Set the content of the editor
            tinyMCE.activeEditor.setContent(updatedContentWithImages);
        })
    }

    handleClick(event) {
        event.target.select();
        document.execCommand("Copy");
    }

    handleDocumentNameChange(e) {
        this.setState({
            documentName: e.target.value
        });
    }

    hashtagClicked(e) {
        let newChosenHashtags = this.state.chosenHashtags.slice();
        if(e.target.checked) {
            newChosenHashtags.push(e.target.value);
        } else {
            newChosenHashtags.splice(newChosenHashtags.indexOf(e.target.value), 1);
        }

        this.setState({
            chosenHashtags: newChosenHashtags
        });
    }

    addContent() {
        const newContents = this.state.contents.slice().map(curr=> {
            if (tinyMCE.editors["text"+curr.passedId] != undefined) {
                curr.content = tinyMCE.editors["text"+curr.passedId].getContent();
            } else {
                curr.content = tinyMCE.editors.find(currEd => currEd.id == "text" + curr.passedId).getContent();
            }

            return curr;
        });

        const newestContent = { 
            content: "",
            permission: permissions[0]
        };

        newContents.push(newestContent);

        this.setState({
            contents: newContents,
        });
    }

    addDocument() {
        const newContents = this.state.contents.slice().map(curr=> {
            if (tinyMCE.editors["text"+curr.passedId] != undefined) {
                curr.content = tinyMCE.editors["text"+curr.passedId].getContent();
            } else {
                curr.content = tinyMCE.editors.find(currEd => currEd.id == "text" + curr.passedId).getContent();
            }
            
            return curr;
        });

        const documentToAdd = {
            name: this.state.documentName,
            contents: newContents,
            hashtags: this.state.chosenHashtags
        }
        
        this.props.addPage(documentToAdd, ()=> {
            this.props.history.push("/");
        });
    }

    handleDeleteContent(contentId) {
        let {contents} = this.state;
        tinyMCE.remove();
        contents = contents.filter(curr => curr.passedId != contentId);
        this.setState({contents});
    }

    handleLastPermissionChange(permission) {
        let {contents} = this.state;
        let contentToEdit = this.state.contents.find(curr => curr.passedId == permission.id.split("permission")[1]);
        const permissionIndex = contents.indexOf(contentToEdit);
        contentToEdit.permission = permission.value;

        // Removing the old content and inserting the new permission
        contents.splice(contents.indexOf(contentToEdit), 1, contentToEdit);

        this.setState({
            contents: contents
        })
    }

    renderContentAdd() {
        return this.state.contents.map((currContent, currIndex) => {
            if (currContent.passedId == undefined) {
                currContent.passedId = new Date().getTime() + currIndex + 1;
            }

            return (
                 <SingleContent isReadOnly={false} passedId={currContent.passedId} onDeleteContent={this.handleDeleteContent} key = {currIndex} content={currContent} onPermissionChange = {this.handleLastPermissionChange} />
            );
        });
    }

    renderHashtags() {
        return (
            <div>
                <label>בחר האשטגים:</label>
                {
                    hashtags.map((currHashtag, currIndex) => {
                        return (
                            <div key={currIndex}>
                                <input onClick = {this.hashtagClicked} type="checkbox" value={currHashtag} />
                                {currHashtag}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div className = "addDocumentBody container">
                <Link to="/">
                    חזור לדף בית
                </Link>
                <h1>הוספת ערך חדש</h1>
                <br/><br/>
                <label>שם המסמך:</label>
                <input type="text" onChange={this.handleDocumentNameChange} />
                <br/>
                <div>
                    {/* <SingleContent isReadOnly = {false} passedId={new Date().getTime()} content={{permission: undefined}} onPermissionChange = {this.handleLastPermissionChange} /> */}
                    {
                        this.renderContentAdd()    
                    }
                </div>
                <br/>
                <div>
                    <button className = "col-lg-2" onClick = {this.addContent}>הוסף תוכן נוסף!</button>
                </div>
                <div>
                    <span>
                        {
                            this.state.files.map(file => <input value={file} onClick={this.handleClick} key={file} readOnly/>)
                        }
                        {
                            this.state.files.map(file => <span key={file}> <img style={{width: "60px", height:"60px"}} src={file}/> </span>)
                        }
                    </span>
                </div>
                <br/><br/>
                <div>
                    {
                        this.renderHashtags()    
                    }
                </div>
                <br/><br/>
                <button onClick = {this.addDocument}>הוסף מסמך!</button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addPage}, dispatch); 
}

export default connect(null, mapDispatchToProps)(AddDocument);