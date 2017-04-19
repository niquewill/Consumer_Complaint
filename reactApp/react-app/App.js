// Include the main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Parent component
var Parent = require(":/component/Parent");
//This code here allows us to render our main component (in this case Parent)
ReactDOM.render(<Parent />, document.getById("app"));