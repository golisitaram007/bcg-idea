import React, { PureComponent } from 'react';
import IdeaActions from './IdeaActions';
import IdeaTile from './IdeaTile';
import IdeaForm from './IdeaForm';
import Data from '../utils/dataService';

class Ideas extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            ideas: [],
            showForm: false,
            notification: '',
            sortBy: 'id'
        }
        this.data = new Data();
    }

    handleFormUpdate = f => {
        this.setState({
            form: { ...f, ...this.data.getNewIdea() }
        }, () => {
            this.closeForm();
            this.setIdeas([...this.data.getAllIdeas(), this.state.form]);
            this.data.addNewIdea(this.state.form);
            this.notify("Successfully Idea Created");
        })
    }

    setIdeas(ideas) {
        this.setState({ ideas })
    }

    notify(msg) {
        this.setState({
            notification: msg
        });
        setTimeout(() => {
            this.setState({
                notification: ''
            })
        }, 3000)
    }

    componentDidMount() {
        this.setIdeas(this.data.getAllIdeas());
    }
    
    newIdeaForm() {
        this.setState({
            showForm: true
        })
    }

    closeForm() {
        this.setState({
            showForm: false
        })
    }

    deleteIdea(idea) {
        this.data.deleteIdea(idea);
        this.setIdeas(this.data.getAllIdeas());
        this.notify("Idea Deleted");
    }

    updatedIdea(idea) {
        idea.title && this.data.updateIdea(idea);
        this.setIdeas(this.data.getAllIdeas());
        this.notify("Successfully Idea Updated");
    }
    sortIdeas(key) {
        return this.data
                   .getAllIdeas()
                   .sort((a, b) => (a[key] > b[key]) ? 1 : -1 );
        
    }
    handlesortBy(key) {
        this.setState({
            sortBy: key
        }, () => {
            this.setIdeas(this.sortIdeas(key));
        })
    }

    render() {
        return (
        <div className="container">
            <IdeaActions notification={this.state.notification} 
                         sort={this.state.sortBy} 
                         sortBy={(e) => this.handlesortBy(e)} 
                         newIdeaForm={() => this.newIdeaForm()} />
            { 
                this.state.showForm 
                    ? <IdeaForm newIdea={(idea) => this.handleFormUpdate(idea)} 
                                closeForm={() => this.closeForm()} />
                    : null 
            }
            <div className="ideas">
                { 
                    this.state.ideas.length ?
                        this.state.ideas.map(idea => {
                            return <IdeaTile idea={ idea } 
                                             key={ idea.id } 
                                             deleteIdea={(idea) => this.deleteIdea(idea)}
                                             updatedIdea={(idea) => this.updatedIdea(idea)}/>
                        })
                        :
                        <div>No Ideas Created yet.</div>
                        
                }
            </div>
        </div>
        )
    }
}

export default Ideas;