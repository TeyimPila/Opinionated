/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */

import 'whatwg-fetch'
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
    CLEAR_PERSON,
    PEOPLE_ROOT_URL
} from '../constants/PeopleConstants'

//====================================================================
// Clear the found Person in the state
//====================================================================

const clearPersonRequest = () => ({
    type: CLEAR_PERSON
});

export const clearPerson = () => (dispatch) => {
    dispatch(clearPersonRequest());
}

//====================================================================
// Get a Person
//====================================================================

const personRequest = () => ({
    type: PERSON_REQUEST
});

const personSuccess = data => ({
    type: PERSON_SUCCESS,
    payload: data
});

const personError = error => ({
    type: PERSON_FAILURE,
    error
});

export const getPerson = (id) => (dispatch) => {

    dispatch(personRequest());

    let url = PEOPLE_ROOT_URL + 'gp/' + id

    fetch(url, {credentials: 'include'})
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            dispatch(personSuccess(data));
        })
        .catch(error => {
            dispatch(personError(error));
        });
};

//====================================================================
// Delete a Person in the db
//====================================================================

const deletePersonRequest = () => ({
    type: DELETE_PERSON_REQUEST
});

const deletePersonSuccess = data => ({
    type: DELETE_PERSON_SUCCESS,
    payload: data
});

const deletePersonError = error => ({
    type: DELETE_PERSON_FAILURE,
    error
});

export const deletePerson = (id) => (dispatch) => {

    dispatch(deletePersonRequest());

    let url = PEOPLE_ROOT_URL + 'api/People/' + id

    return fetch(url, {method: 'DELETE', credentials: 'include'})
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            dispatch(deletePersonSuccess(data));
        })
        .catch(error => {
            dispatch(deletePersonError(error));
        });
};

//====================================================================
// Save Person details
//====================================================================

const savePersonRequest = () => ({
    type: SAVE_PERSON_REQUEST
});

const savePersonSuccess = data => ({
    type: SAVE_PERSON_SUCCESS,
    payload: data
});

const savePersonError = error => ({
    type: SAVE_PERSON_FAILURE,
    error
});

export const savePerson = (values) => (dispatch) => {

    dispatch(savePersonRequest());

    let url = PEOPLE_ROOT_URL + 'api/People/' + values.ID

    fetch(url, {
        method: 'PUT',
        body: values,
        headers: new Headers({'content-type': 'application/json'}),
        credentials: 'include'})
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            dispatch(savePersonSuccess(data));
        })
        .catch(error => {
            dispatch(savePersonError(error));
        });
};

//====================================================================
// Add a new person to the db
//====================================================================

const addPersonRequest = () => ({
    type: ADD_PERSON_REQUEST
});

const addPersonSuccess = data => ({
    type: ADD_PERSON_SUCCESS,
    payload: data
});

const addPersonError = error => ({
    type: ADD_PERSON_FAILURE,
    error
});

export const addPerson = (values) => (dispatch) => {

    dispatch(addPersonRequest());

    let url = PEOPLE_ROOT_URL + 'api/People/'

    let dat = JSON.stringify(values, null, 2)
    return fetch(url, {
        method: 'POST',
        body: dat,
        headers: new Headers({'content-type': 'application/json'}),
        credentials: 'include'})
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            dispatch(addPersonSuccess(data));
            return data;
        })
        .catch(error => {
            dispatch(addPersonError(error));
        });
};

