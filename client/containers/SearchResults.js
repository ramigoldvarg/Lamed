import React, {Component} from 'react';

import {connect} from 'react-redux';

import SingleResult from '../components/SingleResult.js';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.renderResults = this.renderResults.bind(this);
    }

    renderResults() {
        if (this.props.pages.length == 0) {
            return <h3>לא מצאנו.. נסה משהו שונה..</h3>;
        }

        return this.props.pages.map((curr)=> <SingleResult key={curr._id} page={curr}/>);
    }

    render() {
        if (!this.props.pages) {
            return (<h2 dir="rtl"> נסה את המזל ותראה מה אתה יכול עוד ללמוד</h2>);
        }

        return (
        <div>
            {
                this.renderResults()
            }
        </div>);
    }
}

function mapStateToProps({pages}) {
    return {pages};
}

export default connect(mapStateToProps)(SearchResults);