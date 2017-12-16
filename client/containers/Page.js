import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSinglePage} from '../actions/index.js';
import {bindActionCreators} from 'redux';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSinglePage(this.props.match.params.id);
    }

    render() {
        if (!this.props.singlePage) {
            return <h3> טוען</h3>;
        }

        return (
            <div>
                <h2> {this.props.singlePage.name} </h2>
                <div>
                    Lorem ipsum
                    </div>
            </div>
        )
    }
}

function mapStateToProps({singlePage}) {
    return {singlePage};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getSinglePage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);