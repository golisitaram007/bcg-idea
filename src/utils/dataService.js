import * as moment from 'moment';

class Data {

    createdDate() {
        return moment().format("DD/MM/YYYY HH:mm:ss");
    }

    getAllIdeas() {
        return JSON.parse(localStorage.getItem('ideas')) || [];
    }

    setIdeas(data) {
        localStorage.setItem('ideas', JSON.stringify(data));
    }

    max = (a, b) =>  a > b ? a : b;

    getNewIdea() {
        const currentMaxId = this.getAllIdeas()
            .map(idea => idea.id)
            .reduce(this.max, 0);
        return {
            id: currentMaxId + 1,
            created_date: this.createdDate()
        }
    }

    updateIdea(idea) {
        const ind = this.getAllIdeas().findIndex(e => e.id === idea.id);
        const data = [...this.getAllIdeas()];
        data.splice(ind, 1, idea);
        this.setIdeas(data);
    }

    addNewIdea(idea) {
        const data = [...this.getAllIdeas(), idea];
        this.setIdeas(data);
    }

    deleteIdea(idea) {
        const ind = this.getAllIdeas().findIndex(e => e.id === idea.id);
        const data = [...this.getAllIdeas()];
        data.splice(ind, 1);
        this.setIdeas(data);
    }
}


export default Data;