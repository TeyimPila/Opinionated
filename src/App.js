/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import React, {Component} from 'react';
import {Routes} from './Routes'
import {Header} from './header/Header'

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <Routes/>
            </div>
        );
    }
}

export default App;
