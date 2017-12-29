import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import EditDocument from '../containers/EditDocument';

class SingleResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <Link to={"/pages/" + this.props.page._id}>
                {this.props.page.name}
            </Link>
            <Link to = {"/pages/edit/" + this.props.page._id}>
                Edit {this.props.page.name}
            </Link>
        </div>);
    }
}

export default SingleResult;