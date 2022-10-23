import React from "react";

const BackdropBlur = props => {
	return (
		<div
			className="fixed top-0 left-0 w-full h-full z-20 backdrop-blur-sm"
			onClick={props.onClick}
		></div>
	);
};

export default BackdropBlur;