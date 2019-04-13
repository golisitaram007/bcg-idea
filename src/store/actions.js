export const GET_IDEAS = 'GET_IDEAS';
export const ADD_IDEA = 'ADD_IDEA';
export const SORT_IDEAS = 'SORT_IDEAS';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const FORM_TOGGLE = 'FORM_TOGGLE';
export const API_CALL_ERROR = 'API_CALL_ERROR';

const URL = 'http://localhost:3001/ideas';
const headers = { "Content-Type": "application/json" };


export const getIdeas = () => {
    return dispatch => {
        fetchRequests("GET")
            .then(res => {
                dispatch({ type: GET_IDEAS, payload: res });
            })
            .catch(err => {
                dispatch({
                    type: API_CALL_ERROR, payload: { error: true, errorMessage: err.message }
                })
            })
    }
};

export const addIdea = (idea) => {
    return dispatch => {
        fetchRequests("POST", idea)
            .then(res => {
                dispatch({
                    type: ADD_IDEA,
                    payload: idea
                });
                dispatch(notify('Successfully Idea Created'));
                setTimeout(() => dispatch(notify('')), 3000);
            })
            .catch(err => {
                dispatch({
                    type: API_CALL_ERROR, payload: { error: true, errorMessage: err.message }
                })
            })
        
    }
}

export const updateIdea = (idea) => {
    return dispatch => {
        fetchRequests("PUT", idea, '/'+idea.id)
            .then(res => {
                dispatch(getIdeas());
                dispatch(notify('Successfully Idea Updated'));
                setTimeout(() => dispatch(notify('')), 3000);
            });
    }
}

export const deleteIdea = (idea) => {
    return dispatch => {
        fetchRequests("DELETE", null, '/'+idea.id)
            .then(res => {
                dispatch(getIdeas());
                dispatch(notify('Idea Deleted'));
                setTimeout(() => dispatch(notify('')), 3000);
            });
    }
}

export const sortIdeas = sortBy => {
    return dispatch => {
        dispatch({
            type: SORT_IDEAS,
            payload: sortBy 
        })
    }
}

export const notify = msg => {
    return dispatch => {
        dispatch({
            type: SET_NOTIFICATION,
            payload: msg
        })
    }
}

export const toggleForm = toggle => {
    return dispatch => {
        dispatch({
            type: FORM_TOGGLE,
            payload: toggle
        })
    }
}

const fetchRequests = (method, data = null, endPoint = '') => {
    const body = JSON.stringify(data);
    if(data) {
        return fetch(URL + endPoint, { method, headers, body }).then(res => res.json() ).catch(err => console.log(err));
    }else{
        return fetch(URL + endPoint, { method }).then(res => res.json() ).catch(err => console.log(err));
    }
}