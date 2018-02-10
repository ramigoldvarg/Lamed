import React, {Component} from 'react';
import {searchPage} from '../actions/index.js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../stylesheets/index.css';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            searchVal: "",
            errorMessage: ""
        }

        this.errorMessage = "";

        this.onTextChange = this.onTextChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onTextChange(event) {
        this.setState({searchVal: event.target.value});
        this.setState({errorMessage: ""});
    }

    onClickHandler() {
        if(this.state.searchVal != "") {
            this.props.searchPage(this.state.searchVal);
        } else {
             this.setState({errorMessage: "יש להזין ערך חיפוש..."});
        }
    }

    render() {
        return (
            <div className = "search-bar">
                <div>
                    <input 
                        className = "form-control col-lg-9" 
                        placeholder="חפש ערך..."
                        type="text" 
                        value={this.state.searchVal} 
                        onChange = {this.onTextChange} />
                </div>
                <br/>
                <button className = "btn btn-primary" onClick={this.onClickHandler}> חפש! </button>
                <br/><br/>
                <label className = "error">{this.state.errorMessage}</label>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchPage}, dispatch); 
}

export default connect(null, mapDispatchToProps)(SearchBar);