import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSinglePage, deletePage} from '../actions/index.js';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

class Page extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderContents = this.renderContents.bind(this);
    }

    componentDidMount() {
        this.props.getSinglePage(this.props.match.params.id);
    }

    handleDelete() {
        this.props.deletePage(this.props.match.params.id, ()=> {
            this.props.history.push('/');
        });
    }

    renderContents() {
        return this.props.singlePage.contents.map(curr=> (
            <div key={curr.permission}>
                <h3>{curr.permission}</h3>
                <div dangerouslySetInnerHTML={{__html:curr.content}}>
                </div>
            </div>
        ));
    }

    render() {
        if (!this.props.singlePage) {
            return <h3> טוען</h3>;
        }

        return (
            <div>
                <Link to="/">
                    חזור לדף בית
                </Link>
                <div>
                    <h2> {this.props.singlePage.name} </h2>
                </div>
                <button onClick={this.handleDelete}> X </button>
                {this.renderContents()}
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