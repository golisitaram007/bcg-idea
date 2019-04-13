import React, { PureComponent } from 'react';

class IdeaTile extends PureComponent {

    state = {
        titleEdit: false,
        bodyEdit: false,
        bodyLen: 0
    }
    componentDidMount() {
        this.setState({
            bodyLen: 140 - this.props.idea.body.length
        })
    }

    editTitle() { this.setState({ titleEdit: true }) }
    editBody() { this.setState({ bodyEdit: true }) }

    updateIdea(e) { 
        this.setState({ titleEdit: false, bodyEdit: false }) 
        const updatedIdea = {
            ...this.props.idea,
            [e.id]: e.value
        };
        this.props.updatedIdea(updatedIdea);
    }

    handleBodyChange(e) {
        this.setState({
            bodyLen: 140 - e.value.length
        })
    }

    render() {
        const { title, body } = this.props.idea;
        return ( 
            <div className="idea ideaStyle">
                
                { 
                    !this.state.titleEdit ?  <h4 onClick={() => this.editTitle()}>{ title }</h4>
                                         : <input type="text" 
                                                  id="title"
                                                  className="textEditable"
                                                  defaultValue={ title } 
                                                  onBlur={(e) => this.updateIdea(e.target)}/>
                }
                { 
                    !this.state.bodyEdit ?  <small className="description" onClick={() => this.editBody()}>{ body }</small>
                                         : <textarea id="body"
                                                     className="textEditable"
                                                     maxLength="140" 
                                                     defaultValue={ body }
                                                     onChange={(e) => this.handleBodyChange(e.target)} 
                                                     onBlur={(e) => this.updateIdea(e.target)}/>
                }
                <small>
                    { 
                        this.state.bodyLen < 15 && this.state.bodyEdit ? this.state.bodyLen : ''
                    }
                </small>
                <div className="actions">
                    <i className="fas fa-trash-alt" onClick={() => this.props.deleteIdea(this.props.idea)}></i>
                </div>
            </div>
            
        )
    }
}

export default IdeaTile;