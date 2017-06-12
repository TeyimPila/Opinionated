import React from 'react'
import {Link} from "react-router-dom";

const About = () => (
    <div className="well well-sm">
        <h2>Welcome to Steve's Opinionated Starter</h2>
        <p>I work in a typical Microsoft technology environment, where we have lots of vendor and internally developed applications, that each have existing SQL Server databases and (in the case of our in-house applications) a mix of classic ASP or .NET webistes.</p>
        <p>Introducing SPAs with React was a big step, and without the help I got along the way would never have happened.</p>
        <p>When I first started working with Web APIs and React I had no idea what tools and libraries I would need for the React side. Not a clue about such things as Routing, CORS & API documentation.</p>
        <p>For each project in turn my starting point was to setup a Web API (assuming the db exists that is), and then test it using Postman. At that point I don't really need to touch the db side again.</p>
        <p>With databases and APIs there are traps, pitfalls and shortcuts as well as different approaches one can take, so I hope to make that experience easier for you.</p>
        <p>On the React side I struggled with the 'un-opinionated' nature of the react environment, complaining many times to my son and only mentor (Chris Bond) that I wish it <b>would</b> have an opinion just to help me decide what to add in to my projects. Flux/Redux, fetch/axios/bluebird, promises/sagas/generators. Aaargh!</p>
        <p>In the end I settled on the components you see in the list below because I was able to get them to work, love working with them and really like what Redux Forms and React Bootstrap can do together.</p>
        <hr/>
        <p>I hope this project will help someone in my position get started and ease the way.</p>
        <h4>This project provides everything you need to get started with:</h4>
        <ul>
            <li>SQL Server Database Setup</li>
            <li>.NET Web API 2 and Entity Framework</li>
            <li>React</li>
            <li>Redux</li>
            <li>Redux Form WITH React-Bootstrap</li>
            <li>React Router v4 with working Link and IndexLink (thanks Chris Bond!)</li>
            <li>Fetch & Redux Thunk</li>
            <li>React Bootstrap</li>
            <li>Working Menus</li>
            <li>Asynchronous Typeahead</li>
            <li>Working Confirm Modal</li>
            <li>Multiple Build Environments</li>
            <ul>
                <li>Local</li>
                <li>Development</li>
                <li>Staging</li>
                <li>Production</li>
            </ul>
        </ul>
        <hr/>
        <h4><Link to="/">Home</Link></h4>
    </div>
)

export default About