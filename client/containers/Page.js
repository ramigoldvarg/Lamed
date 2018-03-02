import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSinglePage, deletePage, editPage} from '../actions/index.js';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import SingleContent from '../components/SingleContent';

class Page extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isReadOnly: true
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteContent = this.handleDeleteContent.bind(this);
        this.renderContents = this.renderContents.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleUpdate= this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.getSinglePage(this.props.match.params.id);
    }

    componentWillUnmount() {
        tinyMCE.remove();
    }

    handleDelete() {
        this.props.deletePage(this.props.match.params.id, ()=> {
            this.props.history.push('/');
        });
    }

    handleDeleteContent(contentId) {
        let {contents} = this.props.singlePage;
        tinymce.remove();
        contents.splice(contents.indexOf(contents.find(curr=> curr.id == contentId)), 1);
        this.setState({contents});
    }

    renderContents() {
        return this.contents.map((curr,index)=> 
            <div key={index}>
                <SingleContent onDeleteContent={this.handleDeleteContent} passedId={curr.id} content={curr} isReadOnly = {this.state.isReadOnly}/>
            </div>
        );
    }

    handleModeChange(e) {
        this.setState({
            isReadOnly: (e.target.value == 'true')
        });
    }

    handleUpdate() {
        let contentsToSend = this.contents.map(element => {
            element.content = tinymce.editors.find(curr => curr.id == `text${element.id}`).getContent();
            return element;
        });

        this.props.editPage(this.props.match.params.id, {contents: contentsToSend}, (data) =>{
            // this.props.history.push("/pages/" + data.data.id);
            this.props.history.push("/");
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
                <div className="btn-group-vertical">
                    <button className="btn btn-secondary" defaultChecked = {true} onClick = {this.handleModeChange} value = {true}>צפייה</button> 
                    <button className="btn btn-secondary" onClick = {this.handleModeChange} value = {false}>עדכון</button> 
                </div>
                <br/><br/><br/><br/>
                <Link to="/">
                    חזור לדף בית
                </Link>
                <div>
                    <h2 className = "mini-header">{this.props.singlePage.name}</h2>
                </div>
                <button onClick={this.handleDelete}> מחק ערך </button>
                {this.renderContents()}
                <button disabled = {this.state.isReadOnly} onClick={this.handleUpdate}>עדכן</button>
            </div>
        )
    }
}

function mapStateToProps({singlePage}) {
    return {singlePage};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getSinglePage, deletePage, editPage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);