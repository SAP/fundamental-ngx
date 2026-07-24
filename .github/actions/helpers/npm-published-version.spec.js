// Mock dependencies before requiring the module
jest.mock('child_process');
jest.mock('@actions/core', () => ({
    info: jest.fn(),
    warning: jest.fn()
}));

describe('npm-published-version', () => {
    let npmPublishedVersion;
    let mockedExecFileSync;
    let mockedWarning;
    let packageNames;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        mockedExecFileSync = require('child_process').execFileSync;
        mockedWarning = require('@actions/core').warning;
        npmPublishedVersion = require('./npm-published-version');
        packageNames = npmPublishedVersion.RELEASE_PACKAGE_NAMES;
    });

    // Helper: make execFileSync respond per package name based on a { name: distTags } map.
    // Any package not present in the map throws (simulating an unpublished package / error).
    const mockRegistry = (distTagsByPackage) => {
        mockedExecFileSync.mockImplementation((cmd, args) => {
            const name = args[1]; // ['view', <name>, 'dist-tags', '--json']
            if (Object.prototype.hasOwnProperty.call(distTagsByPackage, name)) {
                return JSON.stringify(distTagsByPackage[name]);
            }
            throw new Error(`E404 - not found: ${name}`);
        });
    };

    it('should return the highest version across all packages (prerelease dist-tag)', () => {
        const map = {};
        packageNames.forEach((name) => {
            map[name] = { prerelease: '0.64.1-rc.4', latest: '0.64.0' };
        });
        mockRegistry(map);

        expect(npmPublishedVersion()).toBe('0.64.1-rc.4');
    });

    it('should prefer latest when it is higher than prerelease', () => {
        const map = {};
        packageNames.forEach((name) => {
            map[name] = { prerelease: '0.64.1-rc.4', latest: '0.65.0' };
        });
        mockRegistry(map);

        expect(npmPublishedVersion()).toBe('0.65.0');
    });

    it('should take the max across packages when versions drift (partial publish)', () => {
        // All packages at rc.3 except one that reached rc.4 — floor must be rc.4.
        const map = {};
        packageNames.forEach((name) => {
            map[name] = { prerelease: '0.64.1-rc.3' };
        });
        map['@fundamental-ngx/core'] = { prerelease: '0.64.1-rc.4' };
        mockRegistry(map);

        expect(npmPublishedVersion()).toBe('0.64.1-rc.4');
    });

    it('should ignore packages that error and use the ones that resolve', () => {
        // Only one package published; the rest 404. Floor comes from the published one.
        mockRegistry({ '@fundamental-ngx/core': { prerelease: '0.64.1-rc.4' } });

        expect(npmPublishedVersion()).toBe('0.64.1-rc.4');
        // 12 of 13 threw -> 12 warnings
        expect(mockedWarning).toHaveBeenCalledTimes(packageNames.length - 1);
    });

    it('should return null when every package lookup fails (total npm failure)', () => {
        mockedExecFileSync.mockImplementation(() => {
            throw new Error('getaddrinfo ENOTFOUND registry.npmjs.org');
        });

        expect(npmPublishedVersion()).toBeNull();
        expect(mockedWarning).toHaveBeenCalledTimes(packageNames.length);
    });

    it('should return null when dist-tags contain no valid semver', () => {
        const map = {};
        packageNames.forEach((name) => {
            map[name] = { prerelease: undefined, latest: undefined };
        });
        mockRegistry(map);

        expect(npmPublishedVersion()).toBeNull();
    });

    it('should handle empty stdout from npm as a non-contributing package', () => {
        mockedExecFileSync.mockReturnValue('');

        expect(npmPublishedVersion()).toBeNull();
    });

    it('should invoke npm via argv array (no shell string) and pass a registry when given', () => {
        mockRegistry({ '@fundamental-ngx/core': { prerelease: '0.64.1-rc.4' } });

        npmPublishedVersion('https://registry.npmjs.org/');

        const call = mockedExecFileSync.mock.calls[0];
        expect(call[0]).toBe('npm');
        expect(Array.isArray(call[1])).toBe(true);
        expect(call[1]).toEqual(
            expect.arrayContaining(['view', 'dist-tags', '--json', '--registry', 'https://registry.npmjs.org/'])
        );
    });
});
