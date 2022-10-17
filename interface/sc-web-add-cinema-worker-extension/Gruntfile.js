module.exports = function (grunt) {
    const employeeDirPath = './employee/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            employee: {
                src: [employeeDirPath + 'src/*.js'],
                dest: employeeDirPath + 'static/js/employee.js'
            },
        },
        copy: {
            employeeJs: {
                cwd: employeeDirPath + 'static/js/',
                src: 'employee.js',
                dest: clientJsDirPath + 'employee/',
                expand: true,
                flatten: true
            },
            employeeCss: {
                cwd: employeeDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            employeeHtml: {
                cwd: employeeDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            employeeImg: {
                cwd: employeeDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'employee/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            employeeJs: {
                files: employeeDirPath + 'src/**',
                tasks: ['concat:employee', 'copy:employeeJs'],
            },
            employeeCss: {
                files: employeeDirPath + 'static/css/**',
                tasks: ['copy:employeeCss'],
            },
            employeeHtml: {
                files: [employeeDirPath + 'static/html/**'],
                tasks: ['copy:employeeHtml'],
            },
            employeeImg: {
                files: [employeeDirPath + 'static/images/**'],
                tasks: ['copy:employeeImg'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};
