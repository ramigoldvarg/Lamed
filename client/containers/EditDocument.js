import React, { Component } from 'react';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editPage, getSinglePage} from '../actions/index.js';
import SingleContent from './SingleContent.js';
import Editor from './Editor.js';
import {Link} from 'react-router-dom';

import '../stylesheets/index.css'

class EditDocument extends Component {
    constructor(props) {
        super(props);
        this.renderContents = this.renderContents.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteContent = this.handleDeleteContent.bind(this);
    }

    componentWillUnmount() {
        tinyMCE.remove();
    }

    componentDidMount() {
        this.props.getSinglePage(this.props.match.params.id);
    }

    renderContents() {
        return this.contents.map((curr,index)=> <div key={index}><SingleContent onDeleteContent={this.handleDeleteContent} passedId={curr.id} content={curr}/></div>);
        // return this.contents.map((curr,index)=> <div key={index}>{curr.permission} {curr.content} </div>)
    }

    handleDeleteContent(contentId) {
        let {contents} = this.props.singlePage;
        tinymce.remove();
        contents.splice(contents.indexOf(contents.find(curr=> curr.id == contentId)), 1);
        this.setState({contents});
    }

    handleUpdate() {
        let contentsToSend = this.contents.map(element => {
            element.content = tinymce.editors.find(curr => curr.id == `text${element.id}`).getContent();
            return element;
        });

        this.props.editPage(this.props.match.params.id, {contents: contentsToSend}, (data) =>{
            this.props.history.push("/pages/" + data.data.id);
        })
    }

    render() {
        if (!this.props.singlePage) {
            return <h3> טוען</h3>;
        }
        
        // Doing it so i could get the info from the editors
        this.contents = this.props.singlePage.contents.map((curr,index)=> {
            if (curr.id == undefined) {
                curr.id = new Date().getTime() + index;
            }

            return curr;
        });
        
        return (
        <div>
            <Link to="/"> חזור לדף בית</Link>
            {this.renderContents()}
            <button onClick={this.handleUpdate}>עדכן</button>
        </div>);
    }
}

function mapStateToProps({singlePage}) {
    return {singlePage};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editPage, getSinglePage}, dispatch); 
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);