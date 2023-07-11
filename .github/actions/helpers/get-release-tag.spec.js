const scenarios = [
    {
        hotfix: true,
        prerelease: false,
        currentVersion: '0.40.1',
        mocks: {
            localAngularVersion: 12,
            mainAngularVersion: 12,
            latestVersion: '0.40.0'
        },
        expected: 'latest'
    },
    {
        hotfix: true,
        prerelease: false,
        currentVersion: '0.40.1',
        mocks: {
            localAngularVersion: 12,
            mainAngularVersion: 12,
            latestVersion: '0.40.2'
        },
        expected: 'hotfix'
    },
    {
        hotfix: false,
        prerelease: true,
        currentVersion: '0.40.1-rc.0',
        mocks: {
            localAngularVersion: 12,
            mainAngularVersion: 12,
            latestVersion: '0.40.0'
        },
        expected: 'prerelease'
    },
    {
        hotfix: false,
        prerelease: false,
        currentVersion: '0.40.1',
        mocks: {
            localAngularVersion: 12,
            mainAngularVersion: 12,
            latestVersion: '0.40.1-rc.0'
        },
        expected: 'latest'
    },
    {
        hotfix: true,
        prerelease: false,
        currentVersion: '0.40.1',
        mocks: {
            localAngularVersion: 11,
            mainAngularVersion: 12,
            latestVersion: '0.40.2'
        },
        expected: 'ng11'
    }
];

let mockMainAngularVersion;
let mockLocalAngularVersion;
let mockLatestVersion;

jest.mock('./angular-version', () => (branch) => {
    if (branch === 'origin/main') {
        return mockMainAngularVersion;
    }
    return mockLocalAngularVersion;
});
jest.mock('./get-version', () => () => mockLatestVersion);
const getReleaseTag = require('./get-release-tag');

describe('get-release-tag', () => {
    for (const scenario of scenarios) {
        it(`should return ${scenario.expected} for ${JSON.stringify(scenario)}`, async () => {
            mockLatestVersion = scenario.mocks.latestVersion;
            mockLocalAngularVersion = scenario.mocks.localAngularVersion;
            mockMainAngularVersion = scenario.mocks.mainAngularVersion;
            const result = await getReleaseTag(scenario.hotfix, scenario.prerelease, scenario.currentVersion);
            expect(result).toBe(scenario.expected);
        });
    }
});
