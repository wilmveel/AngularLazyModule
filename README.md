AngularLazyModule
=================

Angular module to lazy load modules

This angular module can lazy load modules into your application. Base on routing the specified scripts will be loaded into the vm. All controllers, directive, filter, factory and service are registerd into the current module.

This library is a angular module which injects the lazyLoadingProvider. To inject scripts into the vm $scripts is required for the lazy loading.

Example
-----------
Lazy loading modules are registerd base on a routing pattern. In the when method the path of the module is specified. Second argument is the lazyLoadingProvider to include the module. The basepath can be set to tell let the provider know where to find all the modules. Modules are loaded based on the module name and an configuration file which must be availible in the route of the module.

````
angular.module('dialog', ['ngRoute', 'lazyLoading'])

.config(function($routeProvider, lazyLoadingProvider) {
			
  lazyLoadingProvider.setBasePath("../modules");
  
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
Modules will be made availible by a small configuration file in the base directory of the module. The default name of the config file is module.json.
````
{
	"module" : "module.js",
	
	"templateUrl" : "views/index.html",
	"controller" : "IndexController",
	
	"scripts" : [
		"config/RouteConfig.js", 
		"controller/LazyCtrl.js",
		"service/LazyService.js"
	]
}
````

Contact
-----------
willem.veelenturf@gmail.com
http://willemveelenturf.nl
