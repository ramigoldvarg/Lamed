import React, {Component} from 'react';
import SearchBar from '../containers/SearchBar.js';
import SearchResults from '../containers/SearchResults.js';

class SearchContent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="search-content">
                <SearchBar />
                <SearchResults />
            </div>
        );
    }
}

export default SearchContent;