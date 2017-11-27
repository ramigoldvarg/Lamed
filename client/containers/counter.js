import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { increaseCounter } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
 
/**
* A counter button: tap the button to increase the count.
*/
class Counter extends Component {
 constructor(props) {
    super(props);
 }

 render() {
   return (
     <div>
       <Link to="/">
        go back
       </ Link>
      <button
        onClick={() => {
          this.props.increaseCounter();
        }}
      >
        Count: {this.props.counter}
      </button>
     </div>
   );
 }
}

function mapStateToProps({counter}) {
  return {counter};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increaseCounter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);