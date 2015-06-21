'use strict';

module.exports = function (grunt) {
    // Unified Watch Object
    var watchFiles = {
        serverJS: ['server.js', 'app/src/*.js'],
        mochaTests: ['app/test/*.js']
    };
    var antlrFiles = {
        grammar: ['./app/src/lang/BugHunts.g']
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.serverJS,
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ext: 'js,html',
                    watch: watchFiles.serverJS
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true,
                limit: 10
            }
        },
        mochaTest: {
            src: watchFiles.mochaTests,
            options: {
                require: 'server.js'
            }
        },
        exec: {
            antlr: {
                command: 'java -Xmx500M -cp ./lang/antlr-4.5-complete.jar: org.antlr.v4.Tool -Dlanguage=JavaScript ' + antlrFiles.grammar
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {
        grunt.config.set('applicationJavaScriptFiles', 'server.js');
    });

    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);

    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint']);

    // Build task(s).
    grunt.registerTask('build', ['lint', 'loadConfig']);

    // Test task.
    grunt.registerTask('test', ['mochaTest']);

    // Antlr task.
    grunt.registerTask('antlr', ['exec:antlr']);
};
