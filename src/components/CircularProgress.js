import React from "react";
//external package
import CircularProgressbar from "react-circular-progressbar";

const CircularProgress = props => {
  return (
    <CircularProgressbar
			initialAnimation={true}
			percentage={props.percentage}
			text={props.text}
    />
  )
};

export default CircularProgress;
