var hapi = require('hapi');  
var port = 3000;  
var _ = require('lodash');

// Create hapi server instance
var server = new hapi.Server();

// add connection parameters
server.connection({  
    host: 'localhost',
    port: process.env.PORT || port
});

server.connection({  
    host: 'localhost',
    port: process.env.PORT + 1 || port + 1
});

// Start the server
server.start(function () {  
    // Log to the console the host and port info
    _.forEach(server.connections, function(connection) {
        console.log('Server started at: ' + connection.info.uri);
    });
});