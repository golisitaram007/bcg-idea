import React from 'react'
import Navbar from '../components/Navbar';
import Ideas from '../components/Ideas';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIdeas } from '../store/actions';

const MainSection = (props) => {
  props.getIdeas();
  return (
    <React.Fragment>
        <Navbar />
        <Ideas />
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({getIdeas}, dispatch);

export default connect(null, mapDispatchToProps)(MainSection);

