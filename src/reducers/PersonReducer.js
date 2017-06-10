import {
    PERSON_REQUEST,
    PERSON_SUCCESS,
    PERSON_FAILURE,
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
        default:
            return state;
    }
}

export default personReducer
