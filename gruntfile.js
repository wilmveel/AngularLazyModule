module.exports = function(grunt) {

	require('corpapp-grunt')(grunt);

	grunt.registerTask('default', [
		'bower',
		'jshint:all', 
		'concat:all',
		'concat_css:all',
		'connect',
		'watch'
	]);
	
};