/**
 *
 */

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		terser: {
			options: {},
			target: {
				mangle: {},
				compress: {},
				sourceMap: {
					url: 'inline'
				},
				files: {
					'public/js/modals/CreatePlayer.min.js': ['public/js/modals/CreatePlayer.js'],
					'public/js/modals/CreateScheduledMessage.min.js': ['public/js/modals/CreateScheduledMessage.js'],
					'public/js/modals/EditPlayer.min.js': ['public/js/modals/EditPlayer.js'],
					'public/js/modals/EditScheduledMessage.min.js': ['public/js/modals/EditScheduledMessage.js'],
					'public/js/widgets/ComponentScheduledMessagesWidget.min.js': ['public/js/widgets/ComponentScheduledMessagesWidget.js'],
					'public/js/widgets/ComponentUserListWidget.min.js': ['public/js/widgets/ComponentUserListWidget.js'],
					'public/js/AjaxManager.min.js': ['public/js/AjaxManager.js'],
					'public/js/index.min.js': ['public/js/index.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-terser');

	// Default task(s).
	grunt.registerTask('default',['terser']);
};
