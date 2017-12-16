import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSinglePage, deletePage} from '../actions/index.js';
import {bindActionCreators} from 'redux';

class Page extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.getSinglePage(this.props.match.params.id);
    }

    handleDelete() {
        this.props.deletePage(this.props.match.params.id, ()=> {
            this.props.history.push('/');
        });
    }

    render() {
        if (!this.props.singlePage) {
            return <h3> טוען</h3>;
        }

        return (
            <div>
                <div>
                    <h2> {this.props.singlePage.name} </h2>
                </div>
                <div>
                    Lorem ipsum
                </div>
                <button onClick={this.handleDelete}> X </button>
            </div>
        )
    }
}

function mapStateToProps({singlePage}) {
    return {singlePage};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getSinglePage, deletePage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);