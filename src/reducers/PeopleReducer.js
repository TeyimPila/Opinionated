/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import {
    PEOPLE_SEARCH_REQUEST,
    PEOPLE_SEARCH_SUCCESS,
    PEOPLE_SEARCH_FAILURE,
} from '../constants/PeopleConstants';

const initialState = {
    people: [],
    isFetching: false,
    error: null
};

function peopleReducer (state = initialState, action) {
    switch (action.type) {
        case PEOPLE_SEARCH_REQUEST:
            return {
                ...state,
                isFetching: true,
                people: [],
                error: null
            };
        case PEOPLE_SEARCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                people: action.payload
            };
        case PEOPLE_SEARCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                people: [],
                error: action.error
            };
        default:
            return state;
    }
}

export default peopleReducer
