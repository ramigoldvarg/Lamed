import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
            <div>
                Lorem ipsum
            </div>
        </div>);
    }
}

export default SingleResult;