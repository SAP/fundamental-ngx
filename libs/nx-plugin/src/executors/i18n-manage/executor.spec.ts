import { ExecutorContext } from '@nx/devkit';
import { I18nManageExecutorSchema } from './schema';

// Mock ALL operations BEFORE importing executor to prevent transitive imports
jest.mock('./operations/add-key', () => ({
    addKey: jest.fn()
}));

jest.mock('./operations/remove-key', () => ({
    removeKey: jest.fn()
}));

jest.mock('./operations/rename-key', () => ({
    renameKey: jest.fn()
}));

jest.mock('./operations/search-keys', () => ({
    searchKeys: jest.fn()
}));

jest.mock('./operations/validate', () => ({
    validate: jest.fn()
}));

// Mock transform-translations executor to prevent Prettier import
jest.mock('../transform-translations/executor', () => ({
    default: jest.fn()
}));

import executor from './executor';
import { addKey } from './operations/add-key';

const mockContext: ExecutorContext = {
    root: '/test',
    cwd: '/test',
    isVerbose: false,
    projectName: 'i18n',
    projectsConfigurations: {
        version: 2,
        projects: {}
    }
};

describe('I18nManage Executor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('command routing', () => {
        it('should route to add handler and call addKey operation', async () => {
            (addKey as jest.Mock).mockResolvedValue({
                success: true,
                filesModified: ['file1.properties', 'file2.properties']
            });

            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            const options: I18nManageExecutorSchema = {
                command: 'add',
                key: 'coreTest.label',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(true);
            expect(addKey).toHaveBeenCalledWith({
                key: 'coreTest.label',
                value: 'Test',
                comment: undefined,
                commentType: undefined,
                propertiesPath: 'libs/i18n/translations'
            });
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Adding translation key'));

            consoleSpy.mockRestore();
        });

        it('should handle add command validation errors', async () => {
            const options: I18nManageExecutorSchema = {
                command: 'add',
                key: 'test',
                // Missing value
                propertiesPath: 'libs/i18n/translations'
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(false);
            expect(output.error).toContain('--key and --value are required');
            expect(addKey).not.toHaveBeenCalled();
        });

        it('should handle missing propertiesPath', async () => {
            const options: I18nManageExecutorSchema = {
                command: 'add',
                key: 'test.key',
                value: 'value'
                // Missing propertiesPath
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(false);
            expect(output.error).toContain('propertiesPath is required');
        });

        it('should route to rename handler', async () => {
            const options: I18nManageExecutorSchema = {
                command: 'rename',
                key: 'old.key',
                newKey: 'new.key'
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(false); // Not implemented yet
        });

        it('should route to remove handler', async () => {
            const options: I18nManageExecutorSchema = {
                command: 'remove',
                key: 'deprecated.key'
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(false); // Not implemented yet
        });

        it('should route to search handler', async () => {
            const options: I18nManageExecutorSchema = {
                command: 'search',
                searchTerm: 'cancel'
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(false); // Not implemented yet
        });

        it('should route to validate handler', async () => {
            const options: I18nManageExecutorSchema = {
                command: 'validate'
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(false); // Not implemented yet
        });
    });

    describe('error handling', () => {
        it('should handle unknown command', async () => {
            const options = {
                command: 'invalid' as any
            };

            const output = await executor(options, mockContext);

            expect(output.success).toBe(false);
            expect(output.error).toContain('Unknown command');
        });
    });
});
