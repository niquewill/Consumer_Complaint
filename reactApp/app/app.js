// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// We need to include all of the components we"re utilizing
// Include the Header, Results, and Search components
var Chat = require("./components/Chat");

ReactDOM.render(
// Here we dump all of the components into a single main-container
// Again, treat them like they are any other HTML elements.
  <div className="container">
    <Chat />
  </div>
  , document.getElementById("app")
);
