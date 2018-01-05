/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="jumbotron">
        <h2>Welcome to Steve's Opinionated Starter Project</h2>
        <small>
          I sincerely hope it helps you get started with the best of everything
          React
        </small>
      </div>
      <div className="well well-sm">
        <h3>This project provides everything you need to get started with:</h3>
        <ul>
          <li>SQL Server Database Setup</li>
          <li>.NET Web API 2 and Entity Framework</li>
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
        <hr />
        <h4>
          See the <Link to="/about">About</Link> page to find out more about
          this project or <Link to="/contact">Contact</Link> to find out more
          about relevant contacts
        </h4>
      </div>
    </div>
  );
};

export default Home;
