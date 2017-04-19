// Include React
var React = require("react");

// Here we include all of the sub-components

var Child = require("./Child");

//Her we create Parent, our main component
var Parent = React.createClass({
	//Here we describe this component's render method
	render: function() {
		<div className="container">
		  <div className="row">
		    <div className="jumbotron">
		     <h2>Chat Feature!</h2>
		     <p>
		       <em>Chat with an Administrator</em>
		     </p>
		    </div>
		    <div className="col-md-12">
		      <div className="panel panel-default">
		        <div className="panel heading">
		          <h3 className="panel title">Child</h3>
		         </div>
		         <div className="panel-body text-center">
		           <h3>Hey I'm the Child!</h3>
		       {/*Here we'll deploy the GrandChild Component*/}
		       <GrandChild />
		      </div>
		     </div>

	}
})