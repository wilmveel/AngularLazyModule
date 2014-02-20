var dialogModule = angular.module('dialog', ['ngRoute', 'lazyModuleLoader'])

.config(function($routeProvider, lazyLoadingProvider) {
	
	lazyLoadingProvider.setBasePath("../modules");

	$routeProvider
	.when('/home', {
		templateUrl: 'app/views/main.html',
	})
	.when('/lazy', lazyLoadingProvider.loadModule("lazyModule"))
	.when('/second', lazyLoadingProvider.loadModule("secondModule"))
	.otherwise({
		redirectTo: '/home'
	});
})