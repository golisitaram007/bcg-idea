import { GET_IDEAS, ADD_IDEA, API_CALL_ERROR, SORT_IDEAS, SET_NOTIFICATION, FORM_TOGGLE } from './actions';

const initState = {
    ideas: [],
    sortBy: 'id',
    notification: '',
    showForm: false
};

const ideaReducer = (state = initState, { type, payload }) => {
    switch(type) {
        case GET_IDEAS:
            return {
                ...state, ideas: payload
            }
        case ADD_IDEA:
            return {
                ...state,
                showForm: false,
                ideas: [...state.ideas, payload]
            }
        case SORT_IDEAS:
            const sortedIdeas = state.ideas.sort((a, b) => (a[payload] > b[payload]) ? 1 : -1 );
            return {
                ...state,
                sortBy: payload,
                ideas: sortedIdeas
            }
        case SET_NOTIFICATION:
            return {
                ...state,
                notification: payload
            }
        case FORM_TOGGLE:
            return {
                ...state,
                showForm: payload
            }
        case API_CALL_ERROR:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
};

export default ideaReducer;