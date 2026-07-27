// Mock dependencies before requiring the module
jest.mock('child_process');
jest.mock('./get-file-contents');
jest.mock('./npm-published-version', () => jest.fn());

describe('get-version', () => {
    let getVersion;
    let mockedExecSync;
    let mockedGetFileContents;
    let mockedNpmPublishedVersion;

    beforeEach(() => {
        jest.clearAllMocks();
        // Clear module cache to get fresh instance that uses our mocks
        jest.resetModules();
        // Re-require the mocked dependencies and store references
        mockedExecSync = require('child_process').execSync;
        mockedGetFileContents = require('./get-file-contents');
        mockedNpmPublishedVersion = require('./npm-published-version');
        // Default: npm floor contributes nothing unless a test opts in.
        mockedNpmPublishedVersion.mockReturnValue(null);
        // Now require the module under test (it will use the mocked dependencies)
        getVersion = require('./get-version');
    });

    describe('when branch is specified', () => {
        it('should return version from libs/core/package.json for specific branch', () => {
            mockedGetFileContents.mockImplementation((file, branch) => {
                if (file === 'libs/core/package.json' && branch === 'main') {
                    return { version: '0.57.0' };
                }
                throw new Error('Unexpected call');
            });

            const result = getVersion('main');

            expect(result).toBe('0.57.0');
            expect(mockedGetFileContents).toHaveBeenCalledWith('libs/core/package.json', 'main');
        });

        it('should fallback to root package.json if libs/core/package.json fails', () => {
            mockedGetFileContents.mockImplementation((file, branch) => {
                if (file === 'libs/core/package.json') {
                    throw new Error('File not found');
                }
                if (file === 'package.json' && branch === 'main') {
                    return { version: '0.57.0' };
                }
                throw new Error('Unexpected call');
            });

            const result = getVersion('main');

            expect(result).toBe('0.57.0');
            expect(mockedGetFileContents).toHaveBeenCalledWith('libs/core/package.json', 'main');
            expect(mockedGetFileContents).toHaveBeenCalledWith('package.json', 'main');
        });
    });

    describe('when no branch is specified (current branch)', () => {
        describe('git tag resolution with semver sorting', () => {
            it('should return the highest version using semver comparison', () => {
                // Simulates: v0.58.0, v0.58.0-rc.113, v0.58.0-rc.114, v0.58.0-rc.115
                // semver comparison: 0.58.0 > 0.58.0-rc.115 (stable > prerelease of same version)
                mockedExecSync.mockReturnValue('v0.58.0\nv0.58.0-rc.115\nv0.58.0-rc.114\nv0.58.0-rc.113\n');

                const result = getVersion();

                expect(result).toBe('0.58.0');
                expect(mockedExecSync).toHaveBeenCalledWith(
                    expect.stringContaining('--merged HEAD'),
                    expect.any(Object)
                );
            });

            it('should return prerelease when it is higher than stable', () => {
                // Simulates: v0.59.0-rc.0 exists alongside v0.58.1
                // semver comparison: 0.59.0-rc.0 > 0.58.1 (because 0.59.0 > 0.58.1)
                mockedExecSync.mockReturnValue('v0.59.0-rc.0\nv0.58.1\nv0.58.0\n');

                const result = getVersion();

                expect(result).toBe('0.59.0-rc.0');
            });

            it('should prefer higher prerelease number', () => {
                // Simulates: multiple RC versions
                mockedExecSync.mockReturnValue('v0.58.0-rc.5\nv0.58.0-rc.4\nv0.58.0-rc.3\n');

                const result = getVersion();

                expect(result).toBe('0.58.0-rc.5');
            });

            it('should handle version with v prefix correctly', () => {
                mockedExecSync.mockReturnValue('v1.0.0\nv0.99.0\n');

                const result = getVersion();

                expect(result).toBe('1.0.0');
            });

            it('should remove v prefix from prerelease versions', () => {
                mockedExecSync.mockReturnValue('v0.58.0-rc.0\n');

                const result = getVersion();

                expect(result).toBe('0.58.0-rc.0');
            });

            it('should correctly sort mixed stable and prerelease versions', () => {
                // Complex scenario with mixed versions
                mockedExecSync.mockReturnValue('v0.57.0\nv0.58.0-rc.1\nv0.58.0-rc.0\nv0.57.1\n');

                const result = getVersion();

                // 0.58.0-rc.1 > 0.58.0-rc.0 > 0.57.1 > 0.57.0
                expect(result).toBe('0.58.0-rc.1');
            });
        });

        describe('fallback to package.json', () => {
            it('should fallback to libs/core/package.json when git command fails', () => {
                mockedExecSync.mockImplementation(() => {
                    throw new Error('git command failed');
                });
                mockedGetFileContents.mockImplementation((file) => {
                    if (file === 'libs/core/package.json') {
                        return { version: '0.57.0' };
                    }
                    throw new Error('Unexpected call');
                });

                const result = getVersion();

                expect(result).toBe('0.57.0');
                expect(mockedGetFileContents).toHaveBeenCalledWith('libs/core/package.json');
            });

            it('should fallback to root package.json when libs/core/package.json fails', () => {
                mockedExecSync.mockImplementation(() => {
                    throw new Error('git command failed');
                });
                mockedGetFileContents.mockImplementation((file) => {
                    if (file === 'libs/core/package.json') {
                        throw new Error('File not found');
                    }
                    if (file === 'package.json') {
                        return { version: '0.57.0' };
                    }
                    throw new Error('Unexpected call');
                });

                const result = getVersion();

                expect(result).toBe('0.57.0');
                expect(mockedGetFileContents).toHaveBeenCalledWith('libs/core/package.json');
                expect(mockedGetFileContents).toHaveBeenCalledWith('package.json');
            });

            it('should throw error when all methods fail', () => {
                mockedExecSync.mockImplementation(() => {
                    throw new Error('git command failed');
                });
                mockedGetFileContents.mockImplementation(() => {
                    throw new Error('File not found');
                });

                expect(() => getVersion()).toThrow('Could not determine current version from git tags or package.json');
            });
        });

        describe('edge cases', () => {
            it('should handle empty git tag output', () => {
                mockedExecSync.mockReturnValue('');
                mockedGetFileContents.mockImplementation((file) => {
                    if (file === 'libs/core/package.json') {
                        return { version: '0.57.0' };
                    }
                    throw new Error('Unexpected call');
                });

                const result = getVersion();

                expect(result).toBe('0.57.0');
                expect(mockedGetFileContents).toHaveBeenCalledWith('libs/core/package.json');
            });

            it('should handle tags with extra whitespace', () => {
                mockedExecSync.mockReturnValue('  v0.58.0  \n  v0.57.0  \n');

                const result = getVersion();

                expect(result).toBe('0.58.0');
            });

            it('should filter out invalid semver tags', () => {
                mockedExecSync.mockReturnValue('v0.58.0\ninvalid-tag\nv0.57.0\nnot-a-version\n');

                const result = getVersion();

                expect(result).toBe('0.58.0');
            });
        });
    });

    describe('real-world scenarios', () => {
        it('should handle the PR #13773 bug scenario - prerelease should be highest', () => {
            // Scenario: v0.59.0-rc.0 was created, then PR #13773 merged
            // The bug was returning v0.58.1 because prereleases were excluded
            // The fix should return v0.59.0-rc.0 as it's semantically higher
            mockedExecSync.mockReturnValue('v0.59.0-rc.0\nv0.58.1\nv0.58.0\nv0.57.0\n');

            const result = getVersion();

            // Should return 0.59.0-rc.0 because it's higher than 0.58.1
            expect(result).toBe('0.59.0-rc.0');
        });

        it('should handle the v0.58.0 release scenario - stable higher than its prereleases', () => {
            // Scenario: v0.58.0 was released, but v0.58.0-rc.113, rc.114, rc.115 exist
            // In semver, 0.58.0 > 0.58.0-rc.115 (stable is higher than prerelease of same base)
            mockedExecSync.mockReturnValue('v0.58.0\nv0.58.0-rc.115\nv0.58.0-rc.114\nv0.58.0-rc.113\n');

            const result = getVersion();

            // Should return 0.58.0 as stable is higher than prereleases of same version
            expect(result).toBe('0.58.0');
        });

        it('should correctly identify next version base after stable release', () => {
            // After v0.58.0 is released, if no new prereleases exist,
            // the version should be 0.58.0 so next can be 0.58.1-rc.0 or 0.59.0-rc.0
            mockedExecSync.mockReturnValue('v0.58.0\nv0.57.0\nv0.56.0\n');

            const result = getVersion();

            expect(result).toBe('0.58.0');
        });

        it('should handle only prerelease tags (pre-1.0.0 scenario)', () => {
            mockedExecSync.mockReturnValue('v0.58.0-rc.2\nv0.58.0-rc.1\nv0.58.0-rc.0\n');

            const result = getVersion();

            expect(result).toBe('0.58.0-rc.2');
        });

        it('should handle hotfix branches correctly', () => {
            // Scenario: On hotfix branch for 0.56.x, only tags merged to HEAD are visible
            // Using --merged HEAD ensures only tags reachable from current HEAD
            mockedExecSync.mockReturnValue('v0.56.3\nv0.56.2\nv0.56.1\n');

            const result = getVersion();

            expect(result).toBe('0.56.3');
            expect(mockedExecSync).toHaveBeenCalledWith(expect.stringContaining('--merged HEAD'), expect.any(Object));
        });

        it('should return higher RC version over lower stable version', () => {
            // Key fix scenario: 0.59.0-rc.1 should be recognized as higher than 0.58.1
            // This ensures the next prerelease is 0.59.0-rc.2, not 0.58.2-rc.0
            mockedExecSync.mockReturnValue('v0.59.0-rc.1\nv0.59.0-rc.0\nv0.58.1\nv0.58.0\n');

            const result = getVersion();

            expect(result).toBe('0.59.0-rc.1');
        });

        it('should use package.json version when it is ahead of git tags', () => {
            // Scenario: Previous release bumped package.json but tag creation failed
            // Git tags: v0.59.1-rc.19
            // Package.json: 0.59.1-rc.20
            // Should return package.json version (0.59.1-rc.20) as it's higher
            mockedExecSync.mockReturnValue('v0.59.1-rc.19\nv0.59.1-rc.18\nv0.59.1-rc.17\n');
            mockedGetFileContents.mockReturnValue({ version: '0.59.1-rc.20' });

            const result = getVersion();

            expect(result).toBe('0.59.1-rc.20');
        });

        it('should use git tag when it is ahead of package.json', () => {
            // Normal scenario: tags are created successfully, package.json may lag
            mockedExecSync.mockReturnValue('v0.59.1-rc.20\nv0.59.1-rc.19\nv0.59.1-rc.18\n');
            mockedGetFileContents.mockReturnValue({ version: '0.59.1-rc.19' });

            const result = getVersion();

            expect(result).toBe('0.59.1-rc.20');
        });

        it('should handle package.json read errors gracefully', () => {
            // If package.json can't be read, should still use git tag version
            mockedExecSync.mockReturnValue('v0.59.1-rc.19\nv0.59.1-rc.18\n');
            mockedGetFileContents.mockImplementation(() => {
                throw new Error('File not found');
            });

            const result = getVersion();

            expect(result).toBe('0.59.1-rc.19');
        });
    });

    describe('npm published version floor', () => {
        // Root cause of the failed release run 30101584110: a prior run published
        // 0.64.1-rc.4 to npm and pushed tag v0.64.1-rc.4, but its release commit
        // orphaned (never landed on main). The next run's `git tag --merged HEAD`
        // could not see the orphaned tag, so it recomputed rc.4 and got a 403 on
        // publish. npm is the authority on "already published" and must act as a floor.

        it('should return the npm-published version when it is higher than the highest reachable tag (the rc.4 bug)', () => {
            // Reachable tags top out at rc.3 (orphaned rc.4 tag is invisible to --merged HEAD)
            mockedExecSync.mockReturnValue('v0.64.1-rc.3\nv0.64.1-rc.2\nv0.64.1-rc.1\n');
            mockedGetFileContents.mockReturnValue({ version: '0.64.1-rc.3' });
            // npm already has rc.4
            mockedNpmPublishedVersion.mockReturnValue('0.64.1-rc.4');

            const result = getVersion();

            // Must return rc.4 so the bump produces rc.5, not another rc.4
            expect(result).toBe('0.64.1-rc.4');
        });

        it('should NOT lower the result when npm is behind the git tags', () => {
            mockedExecSync.mockReturnValue('v0.64.1-rc.5\nv0.64.1-rc.4\n');
            mockedGetFileContents.mockReturnValue({ version: '0.64.1-rc.5' });
            mockedNpmPublishedVersion.mockReturnValue('0.64.1-rc.4');

            const result = getVersion();

            expect(result).toBe('0.64.1-rc.5');
        });

        it('should return the npm version when npm latest is higher than tags and package.json', () => {
            mockedExecSync.mockReturnValue('v0.64.1-rc.4\nv0.64.1-rc.3\n');
            mockedGetFileContents.mockReturnValue({ version: '0.64.1-rc.4' });
            mockedNpmPublishedVersion.mockReturnValue('0.65.0');

            const result = getVersion();

            expect(result).toBe('0.65.0');
        });

        it('should fall back to the git tag version when the npm lookup returns null (query failed)', () => {
            mockedExecSync.mockReturnValue('v0.64.1-rc.3\nv0.64.1-rc.2\n');
            mockedGetFileContents.mockReturnValue({ version: '0.64.1-rc.3' });
            // Total npm failure is represented as null by the helper
            mockedNpmPublishedVersion.mockReturnValue(null);

            const result = getVersion();

            expect(result).toBe('0.64.1-rc.3');
        });

        it('should use the npm floor over package.json when both are considered', () => {
            // Simulates partial-publish drift surfaced via the npm helper's own max:
            // helper already reduced across all packages and returned rc.4
            mockedExecSync.mockReturnValue('v0.64.1-rc.3\n');
            mockedGetFileContents.mockReturnValue({ version: '0.64.1-rc.2' });
            mockedNpmPublishedVersion.mockReturnValue('0.64.1-rc.4');

            const result = getVersion();

            expect(result).toBe('0.64.1-rc.4');
        });

        it('should NOT query npm when a specific branch is requested', () => {
            mockedGetFileContents.mockImplementation((file, branch) => {
                if (file === 'libs/core/package.json' && branch === 'main') {
                    return { version: '0.64.0' };
                }
                throw new Error('Unexpected call');
            });

            const result = getVersion('main');

            expect(result).toBe('0.64.0');
            expect(mockedNpmPublishedVersion).not.toHaveBeenCalled();
        });
    });
});
