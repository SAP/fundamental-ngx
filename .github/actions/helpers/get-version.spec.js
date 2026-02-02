// Mock dependencies before requiring the module
jest.mock('child_process');
jest.mock('./get-file-contents');

describe('get-version', () => {
    let getVersion;
    let mockedExecSync;
    let mockedGetFileContents;

    beforeEach(() => {
        jest.clearAllMocks();
        // Clear module cache to get fresh instance that uses our mocks
        jest.resetModules();
        // Re-require the mocked dependencies and store references
        mockedExecSync = require('child_process').execSync;
        mockedGetFileContents = require('./get-file-contents');
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
});
