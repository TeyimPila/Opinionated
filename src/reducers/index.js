/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import peopleReducer from './PeopleReducer'
import personReducer from './PersonReducer'

const rootReducer = combineReducers({
    people: peopleReducer,
    person: personReducer,
    form: formReducer
});

export default rootReducer;
