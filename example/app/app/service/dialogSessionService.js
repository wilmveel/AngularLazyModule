angular.module('dialog').service('dialogSessionService', function($http) {		this.customer = {};	this.bridge = {		"auth" : "4",		"customer" : "riviera1",		"endpoint": "app/index.html#/list",		"enviroment": "http://riviera.test.ing.intranet/klantakkoord",		"project": "mcp-klantakkoord",		"requestor": "LISA"	}		this.setBridge = function(){		var url = "http://mcp-simulator.ing.intranet:8080/simulator/rest/bridge/set/"		$http.post(url, this.bridge)		.success(function(data){			console.log("Post server", data);		})		.error(function(){			console.log("Cannot set bridge");		})	}});