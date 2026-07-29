// Mock dependencies before requiring the module
jest.mock('child_process');

describe('npm-published-version', () => {
    let npmPublishedVersion;
    let mockedExecFileSync;
    let mockedWarn;
    let packageNames;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        mockedExecFileSync = require('child_process').execFileSync;
        mockedWarn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        npmPublishedVersion = require('./npm-published-version');
        packageNames = npmPublishedVersion.RELEASE_PACKAGE_NAMES;
    });

    // Helper: make execFileSync respond per package name based on a { name: distTags } map.
    // Any package not in the map throws (simulating a 404 / network error).
    const mockRegistry = (distTagsByPackage) => {
        mockedExecFileSync.mockImplementation((cmd, args) => {
            const url = args.find((a) => a.startsWith('https://'));
            const match = Object.keys(distTagsByPackage).find((name) => url && url.includes(name.replace('/', '%2f')));
            if (match) {
                return JSON.stringify(distTagsByPackage[match]);
            }
            throw new Error(`E404 - not found: ${url}`);
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
        const map = {};
        packageNames.forEach((name) => {
            map[name] = { prerelease: '0.64.1-rc.3' };
        });
        map['@fundamental-ngx/core'] = { prerelease: '0.64.1-rc.4' };
        mockRegistry(map);

        expect(npmPublishedVersion()).toBe('0.64.1-rc.4');
    });

    it('should ignore packages that error and use the ones that resolve', () => {
        mockRegistry({ '@fundamental-ngx/core': { prerelease: '0.64.1-rc.4' } });

        expect(npmPublishedVersion()).toBe('0.64.1-rc.4');
        expect(mockedWarn).toHaveBeenCalledTimes(packageNames.length - 1);
    });

    it('should return null when every package lookup fails (total npm failure)', () => {
        mockedExecFileSync.mockImplementation(() => {
            throw new Error('getaddrinfo ENOTFOUND registry.npmjs.org');
        });

        expect(npmPublishedVersion()).toBeNull();
        expect(mockedWarn).toHaveBeenCalledTimes(packageNames.length);
    });

    it('should return null when dist-tags contain no valid semver', () => {
        const map = {};
        packageNames.forEach((name) => {
            map[name] = { prerelease: undefined, latest: undefined };
        });
        mockRegistry(map);

        expect(npmPublishedVersion()).toBeNull();
    });

    it('should handle empty stdout from curl as a non-contributing package', () => {
        mockedExecFileSync.mockReturnValue('{}');

        expect(npmPublishedVersion()).toBeNull();
    });

    it('should invoke curl with the registry URL containing the encoded package name', () => {
        mockRegistry({ '@fundamental-ngx/core': { prerelease: '0.64.1-rc.4' } });

        npmPublishedVersion();

        const coreCall = mockedExecFileSync.mock.calls.find((c) => c[1].some((a) => a.includes('%2fcore')));
        expect(coreCall[0]).toBe('curl');
        expect(coreCall[1].find((a) => a.startsWith('https://'))).toBe(
            'https://registry.npmjs.org/-/package/@fundamental-ngx%2fcore/dist-tags'
        );
    });
});
