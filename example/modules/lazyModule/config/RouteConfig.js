angular.module('lazyModule')

.config(function($routeProvider) {
	console.log("lazyModule config ....", $routeProvider);
	$routeProvider
	.when('/lazy/next', {
		templateUrl: 'views/next.html',
	})
});
