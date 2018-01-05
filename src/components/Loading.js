/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */

import React from "react";
import Spinner from "react-spinner";
import "react-spinner/react-spinner.css";

const style = {
  height: 50,
  width: 50,
  backgroundColor: "blue"
};

const Loading = () => {
  return (
    <div>
      <h3>Fetching data - please wait</h3>
      <div style={style}>
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;
