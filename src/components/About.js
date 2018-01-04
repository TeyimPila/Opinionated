/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import React from 'react'
import {Link} from "react-router-dom";

const About = () => (
    <div className="well well-sm">
        <h2>Welcome to Steve's Opinionated Starter</h2>
        <p>Put whatever you like here, or scrap it altogether</p>
        <hr/>
        <h4><Link to="/">Home</Link></h4>
    </div>
)

export default About