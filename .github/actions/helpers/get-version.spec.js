const { execSync } = require('child_process');
const getFileContents = require('./get-file-contents');

// Mock dependencies
jest.mock('child_process');
jest.mock('./get-file-contents');

describe('get-version', () => {
    let getVersion;

    beforeEach(() => {
        jest.clearAllMocks();
        // Clear module cache to get fresh instance
        jest.resetModules();
        getVersion = require('./get-version');
    });

    describe('when branch is specified', () => {
        it('should return version from libs/core/package.json for specific branch', () => {
            getFileContents.mockReturnValue({ version: '0.57.0' });

            const result = getVersion('main');

            expect(result).toBe('0.57.0');
            expect(getFileContents).toHaveBeenCalledWith('libs/core/package.json', 'main');
        });

        it('should fallback to root package.json if libs/core/package.json fails', () => {
            getFileContents.mockImplementation((file) => {
                if (file === 'libs/core/package.json') {
                    throw new Error('File not found');
                }
                return { version: '0.57.0' };
            });

            const result = getVersion('main');

            expect(result).toBe('0.57.0');
            expect(getFileContents).toHaveBeenCalledWith('libs/core/package.json', 'main');
            expect(getFileContents).toHaveBeenCalledWith('package.json', 'main');
        });
    });

    describe('when no branch is specified (current branch)', () => {
        describe('git tag resolution', () => {
            it('should return latest stable version and ignore prerelease tags', () => {
                // Simulate scenario: v0.58.0 exists, plus v0.58.0-rc.113, rc.114, rc.115
                execSync.mockImplementation((cmd) => {
                    if (cmd.includes('grep -v -- "-"')) {
                        // Return latest stable version
                        return Buffer.from('v0.58.0\n');
                    }
                    // Should not reach here in this test
                    return Buffer.from('v0.58.0-rc.115\n');
                });

                const result = getVersion();

                expect(result).toBe('0.58.0');
                expect(execSync).toHaveBeenCalledWith(expect.stringContaining('--merged HEAD'), expect.any(Object));
                expect(execSync).toHaveBeenCalledWith(expect.stringContaining('grep -v -- "-"'), expect.any(Object));
            });

            it('should return latest prerelease when no stable version exists', () => {
                execSync.mockImplementation((cmd) => {
                    if (cmd.includes('grep -v -- "-"')) {
                        // No stable version found
                        return Buffer.from('');
                    }
                    // Return latest prerelease
                    return Buffer.from('v0.58.0-rc.5\n');
                });

                const result = getVersion();

                expect(result).toBe('0.58.0-rc.5');
                // Should call both commands
                expect(execSync).toHaveBeenCalledTimes(2);
            });

            it('should prefer v0.59.0 over v0.58.0-rc.200', () => {
                execSync.mockImplementation((cmd) => {
                    if (cmd.includes('grep -v -- "-"')) {
                        return Buffer.from('v0.59.0\n');
                    }
                    return Buffer.from('v0.58.0-rc.200\n');
                });

                const result = getVersion();

                expect(result).toBe('0.59.0');
            });

            it('should handle version with v prefix correctly', () => {
                execSync.mockImplementation((cmd) => {
                    if (cmd.includes('grep -v -- "-"')) {
                        return Buffer.from('v1.0.0\n');
                    }
                    return Buffer.from('');
                });

                const result = getVersion();

                expect(result).toBe('1.0.0');
            });

            it('should remove v prefix from prerelease versions', () => {
                execSync.mockImplementation((cmd) => {
                    if (cmd.includes('grep -v -- "-"')) {
                        return Buffer.from('');
                    }
                    return Buffer.from('v0.58.0-rc.0\n');
                });

                const result = getVersion();

                expect(result).toBe('0.58.0-rc.0');
            });
        });

        describe('fallback to package.json', () => {
            it('should fallback to libs/core/package.json when git command fails', () => {
                execSync.mockImplementation(() => {
                    throw new Error('git command failed');
                });
                getFileContents.mockReturnValue({ version: '0.57.0' });

                const result = getVersion();

                expect(result).toBe('0.57.0');
                expect(getFileContents).toHaveBeenCalledWith('libs/core/package.json');
            });

            it('should fallback to root package.json when libs/core/package.json fails', () => {
                execSync.mockImplementation(() => {
                    throw new Error('git command failed');
                });
                getFileContents.mockImplementation((file) => {
                    if (file === 'libs/core/package.json') {
                        throw new Error('File not found');
                    }
                    return { version: '0.57.0' };
                });

                const result = getVersion();

                expect(result).toBe('0.57.0');
                expect(getFileContents).toHaveBeenCalledWith('libs/core/package.json');
                expect(getFileContents).toHaveBeenCalledWith('package.json');
            });

            it('should throw error when all methods fail', () => {
                execSync.mockImplementation(() => {
                    throw new Error('git command failed');
                });
                getFileContents.mockImplementation(() => {
                    throw new Error('File not found');
                });

                expect(() => getVersion()).toThrow('Could not determine current version from git tags or package.json');
            });
        });

        describe('edge cases', () => {
            it('should handle empty git tag output', () => {
                execSync.mockImplementation((cmd) => Buffer.from(''));
                getFileContents.mockReturnValue({ version: '0.57.0' });

                const result = getVersion();

                expect(result).toBe('0.57.0');
                expect(getFileContents).toHaveBeenCalledWith('libs/core/package.json');
            });

            it('should handle tags with extra whitespace', () => {
                execSync.mockImplementation((cmd) => {
                    if (cmd.includes('grep -v -- "-"')) {
                        return Buffer.from('  v0.58.0  \n');
                    }
                    return Buffer.from('');
                });

                const result = getVersion();

                expect(result).toBe('0.58.0');
            });
        });
    });

    describe('real-world scenarios', () => {
        it('should handle the v0.58.0 release bug scenario', () => {
            // Scenario: v0.58.0 was released, but v0.58.0-rc.113, rc.114, rc.115 exist after it
            // The bug would return rc.115, the fix should return 0.58.0
            execSync.mockImplementation((cmd) => {
                if (cmd.includes('grep -v -- "-"')) {
                    // Return stable version
                    return Buffer.from('v0.58.0\n');
                }
                // Without the fix, this would be returned
                return Buffer.from('v0.58.0-rc.115\n');
            });

            const result = getVersion();

            // Should return stable version, not rc.115
            expect(result).toBe('0.58.0');
        });

        it('should correctly identify next version base after stable release', () => {
            // After v0.58.0 is released, the version detector should see 0.58.0 as latest
            // So the next version would be 0.58.1-rc.0 or 0.59.0-rc.0, not 0.58.0-rc.116
            execSync.mockImplementation((cmd) => {
                if (cmd.includes('grep -v -- "-"')) {
                    return Buffer.from('v0.58.0\n');
                }
                return Buffer.from('v0.58.0-rc.112\n');
            });

            const result = getVersion();

            expect(result).toBe('0.58.0');
            // This would allow bumped-release.js to correctly calculate
            // the next version as 0.58.1-rc.0 or 0.59.0-rc.0
        });

        it('should handle only prerelease tags (pre-1.0.0 scenario)', () => {
            execSync.mockImplementation((cmd) => {
                if (cmd.includes('grep -v -- "-"')) {
                    // No stable versions yet
                    return Buffer.from('');
                }
                return Buffer.from('v0.58.0-rc.0\n');
            });

            const result = getVersion();

            expect(result).toBe('0.58.0-rc.0');
        });

        it('should handle hotfix branches correctly', () => {
            // Scenario: On branch docs/0.56 with v0.56.3 tag
            // Main has v0.58.0, but hotfix should only see v0.56.3
            // Using --merged HEAD ensures only tags reachable from current HEAD
            execSync.mockImplementation((cmd) => {
                if (cmd.includes('--merged HEAD')) {
                    if (cmd.includes('grep -v -- "-"')) {
                        // Return latest stable on this branch
                        return Buffer.from('v0.56.3\n');
                    }
                    return Buffer.from('v0.56.3-rc.0\n');
                }
                // Should never reach here - not using global tags
                return Buffer.from('v0.58.0\n');
            });

            const result = getVersion();

            expect(result).toBe('0.56.3');
            expect(execSync).toHaveBeenCalledWith(expect.stringContaining('--merged HEAD'), expect.any(Object));
        });
    });
});
