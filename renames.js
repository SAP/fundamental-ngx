require('fast-glob')
    .sync('libs/i18n/src/lib/translations/**/*.properties')
    .forEach((fileName) => {
        if (fileName.includes('en-US')) {
            require('fs').renameSync(fileName, fileName.replace('_en-US', ''));
        }
    });
