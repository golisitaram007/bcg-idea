import React from 'react';
import IdeaActions from './IdeaActions';
import IdeaTile from './IdeaTile';
import IdeaForm from './IdeaForm';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addIdea, updateIdea, deleteIdea, sortIdeas, toggleForm } from '../store/actions';

const Ideas = (props) => {
    return (
        <div className="container">
            <IdeaActions notification={props.notification} 
                         sort={props.sortBy} 
                         sortBy={(key) => props.sortIdeas(key)} 
                         newIdeaForm={(e) => props.toggleForm(e)} />
            { 
                props.showForm ? 
                    <IdeaForm newIdea={(idea) => props.addIdea(idea)} 
                              closeForm={() => props.toggleForm(false)} />
                              : null 
            }
            <div className="ideas">
                { 
                    props.ideas.length ?
                    props.ideas.map((idea, ind) => {
                            return <IdeaTile idea={ idea } 
                                             key={ ind } 
                                             deleteIdea={(idea) => props.deleteIdea(idea)}
                                             updatedIdea={(idea) => props.updateIdea(idea)}/>
                        })
                        :
                        <div>No Ideas Created yet.</div>
                        
                }
            </div>
        </div>
    )
}

Ideas.propTypes = {
    ideas: PropTypes.array,
    sortBy: PropTypes.string,
    notification: PropTypes.string,
    showForm: PropTypes.bool,
    addIdea: PropTypes.func, 
    updateIdea: PropTypes.func,
    deleteIdea: PropTypes.func,
    sortIdeas: PropTypes.func,
    toggleForm: PropTypes.func
}


const mapStateToProps = (state) => ({
    ideas: state.ideas,
    sortBy: state.sortBy,
    notification: state.notification,
    showForm: state.showForm
});

const mapDispatchToProps = dispatch => bindActionCreators({addIdea, updateIdea, deleteIdea, sortIdeas, toggleForm}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);