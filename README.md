AngularLazyModule
=================

Angular module to lazy load modules

This angular module can lazy load modules into your application. Base on routing the specified scripts will be loaded into the vm. All controllers, directive, filter, factory and service are registerd into the current module.

This library is a angular module which injects the lazyLoadingProvider. This provider enabels you to lazy load modules into your applicatoin. 

Example
-----------
lazy loading modules will be registerd base on a routing pattern.

````
angular.module('dialog', ['ngRoute', 'lazyLoading'])

.config(function($routeProvider, lazyLoadingProvider) {
			
  $routeProvider
	
	.when('/home', {
		templateUrl: 'app/views/main.html',
		controller: 'MainCtrl',
	})
	
	.when('/lazy', lazyLoadingProvider.loadModule("lazyModule"))
	
	.otherwise({
		redirectTo: '/home'
	});
})
````

Module configuration
-----------
Modules will be made availible by a small json configuration file.
````
{
	"module" : "../modules/lazyModule/app/module.js",
	
	"templateUrl" : "views/index.html",
	"controller" : "IndexController",
	
	"scripts" : [
		"../modules/lazyModule/app/config/RouteConfig.js", 
		"../modules/lazyModule/app/controller/LazyCtrl.js",
		"../modules/lazyModule/app/service/LazyService.js"
	]
}
````
