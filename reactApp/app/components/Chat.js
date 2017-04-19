
// Include React
var React = require("react");
//var io = require('socket.io')(http);
import io from 'socket.io-client';
var socket = window.io.connect("http://localhost:3000");
//var socket = window.io("http://localhost:3000");

var ChatApp = React.createClass({
	getInitialState: function (){
		return {
			messages: [],
			sockets:socket,
			//socket:window.io("http://localhost:3000"),
			user: undefined
		}
	},
	componentDidMount: function () {
		//var socket = io('http://localhost');
		var self = this;
		this.state.sockets.on('receive-message', function(msg){
		//socket.on('receive-message', function(msg){
			var messages = self.state.messages;
			  messages.push(msg);
			self.setState({messages:messages});
			console.log(self.state.messages);
		});
	},
	submitMessage: function(){
		var body = document.getElementById("message").value;
		var message = {
			body: body,
			user: this.state.user ||  "guest"
		};
        //var messages = document.getElementById("message").value;
		this.state.sockets.emit("new-message", message);
		console.log(message);
	},

	pickUser: function() {
		var user = document.getElementById("user").value;
		this.setState({user:user});
	},
	render: function () {
		var self = this;
		var messages = self.state.messages.map(function(msg){
			//return <li><strong>{msg.user}</strong><span>{msg.body}</span></li>
			return <li>{msg.body}</li>
		});
		return (
			<div className="container text-center">
			  <div className="row">
			    <div className="panel panel-default">
			       <div className="panel-heading"><h1>You can chat with us </h1></div>
			         <div className="panel-body">
						<ul>
					      {messages}
					    </ul>
					    <input className="input-lg" id="message" type="text"/><br/><br/><button type="button" className="btn btn-primary" onClick={()=> self.submitMessage()}>Send Message</button><br/><hr/>
					    <input className="input-lg" id="user" type="text" placeholder="choose a username"/><br/><br/><button type="button" className="btn btn-primary" onClick={()=> self.pickUser()}>Select User</button><br/><hr/>
					    
                    </div>
                </div>
              </div>
			</div>
		)
	}
});

module.exports = ChatApp;