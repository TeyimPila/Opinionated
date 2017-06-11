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
    PEOPLE_ROOT_URL
} from '../constants/PeopleConstants'

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

    console.log("getPerson ID:", id)

    dispatch(personRequest());

    let url = PEOPLE_ROOT_URL + 'gp/' + id

    console.log("getPerson URL:", url)

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

    //console.log("deletePerson ID:", id)

    dispatch(deletePersonRequest());

    let url = PEOPLE_ROOT_URL + 'api/People/' + id

    //console.log("deletePerson URL:", url)

    fetch(url, {method: 'DELETE', credentials: 'include'})
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

    //console.log("savePerson values:", values)

    dispatch(savePersonRequest());

    let url = PEOPLE_ROOT_URL + 'api/People/' + values.ID

    //console.log("savePerson URL:", url)
    let dat = JSON.stringify(values, null, 2)
    fetch(url, {
        method: 'PUT',
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
            dispatch(savePersonSuccess(data));
        })
        .catch(error => {
            dispatch(savePersonError(error));
        });
};

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

    //console.log("addPerson values:", values)

    dispatch(addPersonRequest());

    let url = PEOPLE_ROOT_URL + 'api/People/'

    //console.log("addPerson URL:", url)
    let dat = JSON.stringify(values, null, 2)
    fetch(url, {
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
        })
        .catch(error => {
            dispatch(addPersonError(error));
        });
};

