/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */

import 'whatwg-fetch'
import {
    PEOPLE_SEARCH_REQUEST,
    PEOPLE_SEARCH_SUCCESS,
    PEOPLE_SEARCH_FAILURE,
    PEOPLE_ROOT_URL
} from '../constants/PeopleConstants'

//====================================================================
// Search for people using Firstname or Lastname
//====================================================================

const peopleSearchRequest = () => ({
    type: PEOPLE_SEARCH_REQUEST
});

const peopleSearchSuccess = data => ({
    type: PEOPLE_SEARCH_SUCCESS,
    payload: data
});

const peopleSearchError = error => ({
    type: PEOPLE_SEARCH_FAILURE,
    error
});

export const peopleSearch = (values) => (dispatch) => {

    let fname = values.firstname ? values.firstname : ''
    let lname = values.lastname ? values.lastname : ''

    dispatch(peopleSearchRequest());

    let url = PEOPLE_ROOT_URL + 'p?f=' + fname + '&l=' + lname

    fetch(url, {credentials: 'include'})
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            dispatch(peopleSearchSuccess(data));
        })
        .catch(error => {
            dispatch(peopleSearchError(error));
        });
};

