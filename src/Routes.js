import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PeopleContainer from './containers/PeopleContainer'
import DetailContainer from './containers/DetailContainer'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

export const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/people" component={PeopleContainer} />
    <Route path="/details/:id" component={DetailContainer} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </Switch>
)
