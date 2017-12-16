import React, {Component} from 'react';
import {searchPage} from '../actions/index.js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            searchVal: ""
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onTextChange(event) {
        this.setState({searchVal: event.target.value});
    }

    onClickHandler() {
        this.props.searchPage(this.state.searchVal);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.searchVal} onChange = {this.onTextChange} />
                <button onClick={this.onClickHandler}> תן בראש טיט! </button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchPage}, dispatch); 
}

export default connect(null, mapDispatchToProps)(SearchBar);