angular.module('lazyModuleLoader', [])

.provider('lazyLoading', function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
	
	var loaded = [];
	
	// make providers availible
	var routeProvider = $routeProvider;
	var controller = $controllerProvider.register;
	var directive = $compileProvider.directive;
	var filter = $filterProvider.register;
	var factory = $provide.factory;
	var service = $provide.service;
	
	var config = {};
	  
	this.$get = function() {

    };
	
	this.setBasePath = function(path){
		config.basePath = path;
	}
 	
	this.loadModule = function(moduleName){

			return {
				resolve:{
					deps:function($q, $rootScope, $http, $location){
						
						console.log("$location:", $location.path());		
						
						if(!containsModule(moduleName)){
							
							loaded.push(moduleName);
							var deferred = $q.defer();
							
							console.log("Loaded modules:", loaded);		
							
							// Load module descriptor
							var moduleUrl = config.basePath + "/" + moduleName + "/module.json";
							console.log("moduleUrl", moduleUrl);		
							$http.get(moduleUrl).success(function(descriptor){
								console.log("Module descriptor: ", descriptor);	
								
								$routeProvider
								.when( $location.path() + '/index', {
									templateUrl: config.basePath + "/" + moduleName + "/" + descriptor.templateUrl,
									controller: descriptor.controller
								})
								
								
								// Load the module
								$script(config.basePath + "/" + moduleName + "/" + descriptor.module, function()
								{
								
									var module = angular.module(moduleName);
									console.log("Test", moduleName, module);
												
									module.config = function(func){
										console.log("Load configuration", func);
										func(routeProvider);
									}
									
												
									module.controller = function(name, func){
										console.log("Register controller", name, func);
										controller(name, func);
									}
									
									module.directive = function(name, func){
										console.log("Register directive", name, func);
										directive(name, func);
									}
									
									module.filter = function(name, func){
										console.log("Register filter", name, func);
										filter(name, func);
									}
									
									module.factory = function(name, func){
										console.log("Register factory", name, func);
										factory(name, func);
									}
												
									module.service = function(name, func){
										console.log("Register service", name, func);
										service(name, func);
									}
									
									// build urls
									var files = [];
									for (i in descriptor.files){
										files.push(config.basePath + "/" + moduleName + "/" + descriptor.files[i])
									}
									
									$script(files, function()
									{
										// all dependencies have now been loaded by so resolve the promise
										$rootScope.$apply(function()
										{
											deferred.resolve();
											$location.path($location.path() + '/index');
										});
									})
								});
							}).error(function(){
								console.error("Cannot load module descriptor");
							});

							return deferred.promise;
						}else {
							console.log("Module already loaded:", moduleName);
							$location.path($location.path() + '/index');
						}
					}
				}
			}
		}
		
		function containsModule (obj) {
			var i = loaded .length;
			while (i--) {
			   if (loaded [i] === obj) {
				   return true;
			   }
			}
			return false;
		}
	
});





