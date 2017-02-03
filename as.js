cssmin: {
    target: {
        files: [{
            expand: true,
            cwd: 'release/css',
            src: ['*.css', '!*.min.css'],
            dest: 'release/css',
            ext: '.min.css'
        }]
    }
}