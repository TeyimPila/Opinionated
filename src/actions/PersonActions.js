import 'whatwg-fetch'
import {
    PERSON_REQUEST,
    PERSON_SUCCESS,
    PERSON_FAILURE,
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

