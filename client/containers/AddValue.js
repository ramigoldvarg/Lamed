import React, { Component } from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addPage} from '../actions/index.js';

import SingleContent from './SingleContent.js';
import '../stylesheets/index.css'

class AddValue extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            files: [],
            contents: [""],
            hashtags: [
                'עת"פ',
                'תר"צ',
                'שלום',
                'רובוקופ',
                'יוניק',
                
            ]
        };

        this.onDrop = this.onDrop.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderContentAdd = this.renderContentAdd.bind(this);
        this.addContent = this.addContent.bind(this);
        this.renderHashtags = this.renderHashtags.bind(this);
        this.hashtagClicked = this.hashtagClicked.bind(this);
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

    hashtagClicked(e) {
        cosnole.log("hashteg clicked");
    }

    addContent() {
        let newContentes = this.state.contents.slice();
        newContentes.push("");
        this.setState({
            contents: newContentes
        });
    }

    addDocument() {
        console.log(tinyMCE.activeEditor.getContent());
        // this.props.addPage(tinyMCE.activeEditor.getContent());
    }

    renderContentAdd() {
        if (this.state.contents.length == 0) {
            return (
                <div>
                    <SingleContent />
                </div>
            );
        }
        else {
            return this.state.contents.map((currContent, currIndex) => {
                return (
                    <SingleContent key = {currIndex} />
                );
            });
        }
    }

    renderHashtags() {
        return (
            <div>
                <label>בחר האשטגים:</label>
                {
                    this.state.hashtags.map((currHashtag, currIndex) => {
                        return (
<<<<<<< HEAD
                            <div key={currIndex}>
                                <input onClick = {this.hashTagClicked} type="checkbox" value={currHashtag} />
=======
                            <div key={currHashtag}>
                                <input type="checkbox" value={currHashtag} />
>>>>>>> b43dbc05591ad13e0d13eb455d2bf1d3fa6d8a4f
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
                <div>
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

export default connect(null, mapDispatchToProps)(AddValue);