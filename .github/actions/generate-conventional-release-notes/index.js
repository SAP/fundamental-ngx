const conventionalChangelog = require('conventional-changelog');
const core = require('@actions/core');
const through = require('through2');
const closestVersion = require('./closest-version');
const childProcess = require('child_process');

const run = async () => {
    const { closest, tagsTillClosest } = await closestVersion();
    childProcess.execSync(`git tag -d ${tagsTillClosest.join(' ')}`);
    const changelog = await conventionalChangelog(
        {
            preset: 'angular',
            releaseCount: 1
        },
        null,
        { from: closest },
        null,
        { headerPartial: '' }
    );
    let generatedReleaseNotes = '';
    changelog
        .pipe(
            through(function (chunk, _enc, callback) {
                this.push(chunk);
                generatedReleaseNotes += chunk.toString();
                callback();
            })
        )
        .on('finish', () => {
            core.setOutput('generatedReleaseNotes', generatedReleaseNotes);
        });
};

run();
