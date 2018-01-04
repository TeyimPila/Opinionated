/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import React from 'react'
import Link from "react-router-dom/es/Link";

const Contact = () => (
    <div className="well well-sm">

        <h2>Contact Page</h2>

        <p>Your details here</p>
        <p>You can contact Steve at aikidoshi@hotmail.com</p>

        <hr/>
        <h4><Link to="/">Home</Link></h4>
    </div>
)

export default Contact