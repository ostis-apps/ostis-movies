module.exports = function (grunt) {
    const filmstudioDirPath = './filmstudio/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            filmstudio: {
                src: [filmstudioDirPath + 'src/*.js'],
                dest: filmstudioDirPath + 'static/js/filmstudio.js'
            },
        },
        copy: {
            filmstudioJs: {
                cwd: filmstudioDirPath + 'static/js/',
                src: 'filmstudio.js',
                dest: clientJsDirPath + 'filmstudio/',
                expand: true,
                flatten: true
            },
            filmstudioCss: {
                cwd: filmstudioDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            filmstudioHtml: {
                cwd: filmstudioDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            filmstudioImg: {
                cwd: filmstudioDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'filmstudio/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            filmstudioJs: {
                files: filmstudioDirPath + 'src/**',
                tasks: ['concat:filmstudio', 'copy:filmstudioJs'],
            },
            filmstudioCss: {
                files: filmstudioDirPath + 'static/css/**',
                tasks: ['copy:filmstudioCss'],
            },
            filmstudioHtml: {
                files: [filmstudioDirPath + 'static/html/**'],
                tasks: ['copy:filmstudioHtml'],
            },
            filmstudioImg: {
                files: [filmstudioDirPath + 'static/images/**'],
                tasks: ['copy:filmstudioImg'],
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
