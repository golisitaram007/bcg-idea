import React, {
    PureComponent
} from 'react'

class IdeaForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = () => { this.props.newIdea(this.state) }

    render() {
        return (
            <div className="form">
                <div className="form-fields">
                    <div className="form-group" style={{flexGrow: 1}}>
                        <label>Title*: </label>
                        <input className="inputEle"
                               id="title"
                               type="text"
                               placeholder="Idea Title"
                               onChange={e => this.handleInputChange(e)} 
                               autoFocus/>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea className="inputEle"
                                  id="body"
                                  maxLength="140"
                                  placeholder="Idea Description"
                                  onChange={e => this.handleInputChange(e)}></textarea>
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn btn2" disabled={!this.state.title} onClick={() => this.handleSubmit()}><i className="far fa-plus-square"></i> Submit</button>
                    <button className="btn btn3" onClick={() => this.props.closeForm()}><i className="fas fa-times-circle"></i> Cancel</button>
                </div>
            </div>
        )
    }
}

export default IdeaForm;