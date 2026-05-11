jest.mock('../helpers/git-semver-tags');
jest.mock('../helpers/current-version', () => '0.62.0');

describe('closest-version', () => {
    let closestVersion;
    let mockedSemverTags;

    beforeEach(() => {
        jest.resetModules();
        jest.mock('../helpers/current-version', () => '0.62.0');
        mockedSemverTags = require('../helpers/git-semver-tags');
        closestVersion = require('./closest-version');
    });

    describe('stable release (non-prerelease)', () => {
        it('should find the previous stable version as closest', async () => {
            mockedSemverTags.mockReturnValue([
                'v0.62.0',
                'v0.62.0-rc.101',
                'v0.62.0-rc.100',
                'v0.62.0-rc.0',
                'v0.61.4',
                'v0.61.3',
                'v0.61.0'
            ]);

            const result = await closestVersion();

            expect(result.closest).toBe('v0.61.4');
        });

        it('should NOT include the current version tag in tagsTillClosest', async () => {
            mockedSemverTags.mockReturnValue([
                'v0.62.0',
                'v0.62.0-rc.101',
                'v0.62.0-rc.100',
                'v0.62.0-rc.0',
                'v0.61.4',
                'v0.61.3'
            ]);

            const result = await closestVersion();

            expect(result.tagsTillClosest).not.toContain('v0.62.0');
        });

        it('should include only prerelease tags in tagsTillClosest', async () => {
            mockedSemverTags.mockReturnValue(['v0.62.0', 'v0.62.0-rc.2', 'v0.62.0-rc.1', 'v0.62.0-rc.0', 'v0.61.4']);

            const result = await closestVersion();

            expect(result.tagsTillClosest).toEqual(['v0.62.0-rc.2', 'v0.62.0-rc.1', 'v0.62.0-rc.0']);
        });

        it('should handle case with no RC tags between current and closest', async () => {
            mockedSemverTags.mockReturnValue(['v0.62.0', 'v0.61.0']);

            const result = await closestVersion();

            expect(result.closest).toBe('v0.61.0');
            expect(result.tagsTillClosest).toEqual([]);
        });
    });

    describe('prerelease (RC) release', () => {
        beforeEach(() => {
            jest.resetModules();
            jest.mock('../helpers/current-version', () => '0.62.0-rc.5');
            mockedSemverTags = require('../helpers/git-semver-tags');
            closestVersion = require('./closest-version');
        });

        it('should find the previous version (any) as closest for prerelease', async () => {
            mockedSemverTags.mockReturnValue(['v0.62.0-rc.5', 'v0.62.0-rc.4', 'v0.62.0-rc.3', 'v0.61.4']);

            const result = await closestVersion();

            expect(result.closest).toBe('v0.62.0-rc.4');
        });

        it('should NOT include the current prerelease version in tagsTillClosest', async () => {
            mockedSemverTags.mockReturnValue(['v0.62.0-rc.5', 'v0.62.0-rc.4', 'v0.62.0-rc.3']);

            const result = await closestVersion();

            expect(result.tagsTillClosest).not.toContain('v0.62.0-rc.5');
        });
    });
});
