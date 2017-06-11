import React from 'react';

const Home = () => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h2>Welcome to Steve's Opinionated Starter</h2><small>Hope it helps you get started</small>
            </div>
            <div className="well well-sm">
                <p>This project provides everything you need to get started with:</p>
                <ul>
                    <li>React</li>
                    <li>Redux</li>
                    <li>Redux Form WITH React-Bootstrap</li>
                    <li>React Router v4</li>
                    <li>Redux Thunk</li>
                    <li>Web API Fetching</li>
                    <li>React Bootstrap</li>
                    <li>Working Menus</li>
                    <li>Asynchronous Typeahead</li>
                    <li>Working Confirm Modal</li>
                    <li>Multiple Environments</li>
                    <ul>
                        <li>Local</li>
                        <li>Development</li>
                        <li>Staging</li>
                        <li>Production</li>
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default Home;
