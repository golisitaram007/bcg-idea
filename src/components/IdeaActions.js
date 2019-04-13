import React from 'react';
import PropTypes from 'prop-types';

const IdeaActions = (props) => {
  const { notification } = props;
  return (
    <div className="ideaActions">
        <button className="btn btn1" 
                onClick={() => props.newIdeaForm()}>New Idea</button>
        {
          notification ? <div className="notification blink">{ notification }</div> : <div></div>
        }
        <div>
            <label>Sort By: </label>
            <select className="sorting" value={props.sort} onChange={e => props.sortBy(e.target.value)}>
                <option value="id">ID</option>
                <option value="title">Title</option>
                <option value="created_date">Created Date</option>
            </select>
        </div>
    </div>
  )
}

IdeaActions.propTypes = {
  newIdea: PropTypes.func,
  closeForm: PropTypes.func
}

export default IdeaActions;