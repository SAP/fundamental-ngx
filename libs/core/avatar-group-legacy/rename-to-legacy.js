const rename = require('fs').renameSync;
const parse = require('path').parse;
const files = require('fast-glob').sync('libs/docs/core/avatar-group-legacy/**/*');

for (const fileName of files) {
    const parsed = parse(fileName);
    if (parsed.name.includes('avatar-group')) {
        const newName = parsed.name.replace('avatar-group', 'avatar-group-legacy');
        rename(fileName, `${parsed.dir}/${newName}${parsed.ext}`);
    }
}
