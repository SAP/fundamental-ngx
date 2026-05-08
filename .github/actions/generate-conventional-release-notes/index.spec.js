jest.mock('./closest-version', () => jest.fn());
jest.mock('child_process', () => ({ execSync: jest.fn() }));
jest.mock('@actions/core', () => ({ setOutput: jest.fn() }));
jest.mock('conventional-changelog', () => jest.fn());
jest.mock('through2', () => jest.fn());

const { PassThrough } = require('stream');
const closestVersion = require('./closest-version');
const childProcess = require('child_process');
const core = require('@actions/core');
const conventionalChangelog = require('conventional-changelog');
const through = require('through2');

describe('index.js - run()', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        through.mockImplementation(() => new PassThrough());
    });

    function setupChangelog(content = '') {
        const stream = new PassThrough();
        conventionalChangelog.mockReturnValue(stream);
        process.nextTick(() => {
            if (content) {
                stream.push(content);
            }
            stream.end();
        });
    }

    it('should not call git tag -d when tagsTillClosest is empty', async () => {
        closestVersion.mockResolvedValue({
            closest: 'v0.61.0',
            tagsTillClosest: []
        });
        setupChangelog('## some notes');

        jest.isolateModules(() => {
            require('./index');
        });
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(childProcess.execSync).not.toHaveBeenCalled();
    });

    it('should call git tag -d with tags when tagsTillClosest is not empty', async () => {
        closestVersion.mockResolvedValue({
            closest: 'v0.61.0',
            tagsTillClosest: ['v0.62.0-rc.2', 'v0.62.0-rc.1', 'v0.62.0-rc.0']
        });
        setupChangelog('## some notes');

        jest.isolateModules(() => {
            require('./index');
        });
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(childProcess.execSync).toHaveBeenCalledWith('git tag -d v0.62.0-rc.2 v0.62.0-rc.1 v0.62.0-rc.0');
    });
});
