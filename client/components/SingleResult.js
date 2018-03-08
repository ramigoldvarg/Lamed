import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SingleResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                <li><Link to={"/pages/" + this.props.page._id}>
                    {this.props.page.name}
                </Link>
                </li>
            </ul>
        );
    }
}

export default SingleResult;