import {
    PERSON_REQUEST,
    PERSON_SUCCESS,
    PERSON_FAILURE,
    ADD_PERSON_REQUEST,
    ADD_PERSON_SUCCESS,
    ADD_PERSON_FAILURE,
    SAVE_PERSON_REQUEST,
    SAVE_PERSON_SUCCESS,
    SAVE_PERSON_FAILURE,
    DELETE_PERSON_REQUEST,
    DELETE_PERSON_SUCCESS,
    DELETE_PERSON_FAILURE,
} from '../constants/PeopleConstants';

const initialState = {
    person: null,
    isFetching: false,
    error: null
};

function personReducer (state = initialState, action) {
    switch (action.type) {
        case PERSON_REQUEST:
            return {
                ...state,
                isFetching: true,
                person: null,
                error: null
            };
        case PERSON_SUCCESS:
            return {
                ...state,
                isFetching: false,
                person: action.payload
            };
        case PERSON_FAILURE:
            return {
                ...state,
                isFetching: false,
                person: null,
                error: action.error
            };
        case SAVE_PERSON_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case SAVE_PERSON_SUCCESS:
            return {
                ...state,
                isFetching: false,
                person: action.payload
            };
        case SAVE_PERSON_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case ADD_PERSON_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case ADD_PERSON_SUCCESS:
            return {
                ...state,
                isFetching: false,
                person: null
            };
        case ADD_PERSON_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case DELETE_PERSON_REQUEST:
            return {
                ...state,
                isFetching: true,
                person: null,
                error: null
            };
        case DELETE_PERSON_SUCCESS:
            return {
                ...state,
                isFetching: false,
                person: null
            };
        case DELETE_PERSON_FAILURE:
            return {
                ...state,
                isFetching: false,
                person: null,
                error: action.error
            };
        default:
            return state;
    }
}

export default personReducer
