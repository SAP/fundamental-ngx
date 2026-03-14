import { ExecutorContext } from '@nx/devkit';
import { addKey } from './operations/add-key';
import { removeKey } from './operations/remove-key';
import { renameKey } from './operations/rename-key';
import { searchKeys } from './operations/search-keys';
import { sortKeys } from './operations/sort-keys';
import { updateKey } from './operations/update-key';
import { validate } from './operations/validate';
import { I18nManageExecutorSchema } from './schema';

export interface I18nManageResult {
    success: boolean;
    filesModified?: string[];
    error?: string;
}

export default async function runExecutor(
    options: I18nManageExecutorSchema,
    context: ExecutorContext
): Promise<I18nManageResult> {
    const { command } = options;

    try {
        switch (command) {
            case 'add':
                return await handleAdd(options, context);
            case 'rename':
                return await handleRename(options, context);
            case 'remove':
                return await handleRemove(options, context);
            case 'search':
                return await handleSearch(options, context);
            case 'validate':
                return await handleValidate(options, context);
            case 'update':
                return await handleUpdate(options, context);
            case 'sort':
                return await handleSort(options, context);
            default:
                throw new Error(`Unknown command: ${command}`);
        }
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function handleAdd(options: I18nManageExecutorSchema, context: ExecutorContext): Promise<I18nManageResult> {
    const { key, value, comment, commentType, propertiesPath } = options;

    // Validation
    if (!key || !value) {
        return {
            success: false,
            error: 'Both --key and --value are required for add command'
        };
    }

    if (!propertiesPath) {
        return {
            success: false,
            error: '--propertiesPath is required. Configure it in project.json'
        };
    }

    console.log(`\n🔧 Adding translation key: ${key}`);
    console.log(`   Value: "${value}"`);
    if (comment) {
        console.log(`   Comment: "${comment}"`);
    }
    if (commentType) {
        console.log(`   Type: ${commentType}`);
    }
    console.log('');

    const result = await addKey({
        key,
        value,
        comment,
        commentType,
        propertiesPath
    });

    if (result.success) {
        console.log(`✅ Success! Modified ${result.filesModified.length} .properties files`);
        console.log(`   Generated TypeScript files`);
        console.log('');
    } else {
        console.error(`❌ Error: ${result.error}`);
        console.log('');
    }

    return result;
}

async function handleRename(options: I18nManageExecutorSchema, context: ExecutorContext): Promise<I18nManageResult> {
    const { key, newKey, propertiesPath } = options;

    // Validation
    if (!key || !newKey) {
        return {
            success: false,
            error: 'Both --key and --newKey are required for rename command'
        };
    }

    if (!propertiesPath) {
        return {
            success: false,
            error: '--propertiesPath is required. Configure it in project.json'
        };
    }

    console.log(`\n🔧 Renaming translation key: ${key} → ${newKey}`);
    console.log('');

    const result = await renameKey({
        oldKey: key,
        newKey,
        propertiesPath
    });

    if (result.success) {
        console.log(`✅ Success! Modified ${result.filesModified.length} .properties files`);
        console.log(`   Generated TypeScript files`);
        console.log('');
    } else {
        console.error(`❌ Error: ${result.error}`);
        console.log('');
    }

    return result;
}

async function handleRemove(options: I18nManageExecutorSchema, context: ExecutorContext): Promise<I18nManageResult> {
    const { key, propertiesPath } = options;

    // Validation
    if (!key) {
        return {
            success: false,
            error: '--key is required for remove command'
        };
    }

    if (!propertiesPath) {
        return {
            success: false,
            error: '--propertiesPath is required. Configure it in project.json'
        };
    }

    console.log(`\n🔧 Removing translation key: ${key}`);
    console.log('');

    const result = await removeKey({
        key,
        propertiesPath
    });

    if (result.success) {
        console.log(`✅ Success! Modified ${result.filesModified.length} .properties files`);
        console.log(`   Generated TypeScript files`);
        console.log('');
    } else {
        console.error(`❌ Error: ${result.error}`);
        console.log('');
    }

    return result;
}

async function handleSearch(options: I18nManageExecutorSchema, context: ExecutorContext): Promise<I18nManageResult> {
    const { searchTerm, propertiesPath } = options;

    // Validation
    if (!searchTerm) {
        return {
            success: false,
            error: '--searchTerm is required for search command'
        };
    }

    if (!propertiesPath) {
        return {
            success: false,
            error: '--propertiesPath is required. Configure it in project.json'
        };
    }

    console.log(`\n🔍 Searching for: "${searchTerm}"`);
    console.log('');

    const result = await searchKeys({
        searchTerm,
        propertiesPath
    });

    if (result.success) {
        if (result.results.length === 0) {
            console.log('No matches found.');
        } else {
            console.log(`Found ${result.results.length} match(es):\n`);

            for (const match of result.results) {
                console.log(`  Key:   ${match.key}`);
                console.log(`  Value: ${match.value}`);
                if (match.comment) {
                    console.log(`  ${match.comment}`);
                }
                console.log('');
            }
        }
        console.log('');
        return { success: true };
    } else {
        console.error(`❌ Error: ${result.error}`);
        console.log('');
        return { success: false, error: result.error };
    }
}

async function handleUpdate(options: I18nManageExecutorSchema, context: ExecutorContext): Promise<I18nManageResult> {
    const { key, value, propertiesPath } = options;

    // Validation
    if (!key || !value) {
        return {
            success: false,
            error: 'Both --key and --value are required for update command'
        };
    }

    if (!propertiesPath) {
        return {
            success: false,
            error: '--propertiesPath is required. Configure it in project.json'
        };
    }

    console.log(`\n🔧 Updating translation key: ${key}`);
    console.log(`   New value: "${value}"`);
    console.log('');

    const result = await updateKey({
        key,
        value,
        propertiesPath
    });

    if (result.success) {
        console.log(`✅ Success! Modified ${result.filesModified.length} .properties files`);
        console.log(`   Generated TypeScript files`);
        console.log('');
    } else {
        console.error(`❌ Error: ${result.error}`);
        console.log('');
    }

    return result;
}

async function handleValidate(options: I18nManageExecutorSchema, context: ExecutorContext): Promise<I18nManageResult> {
    const { propertiesPath } = options;

    // Validation
    if (!propertiesPath) {
        return {
            success: false,
            error: '--propertiesPath is required. Configure it in project.json'
        };
    }

    console.log(`\n🔍 Validating .properties files...`);
    console.log('');

    const result = await validate(propertiesPath);

    if (result.success) {
        console.log(result.summary);
        console.log('');
        return { success: true };
    } else {
        console.log(result.summary);
        console.log('');

        // Group errors by type
        const errorsByType = new Map<string, typeof result.errors>();
        for (const error of result.errors) {
            if (!errorsByType.has(error.type)) {
                errorsByType.set(error.type, []);
            }
            errorsByType.get(error.type)!.push(error);
        }

        // Display errors by type
        for (const [type, errors] of errorsByType) {
            console.log(`\n${type.toUpperCase()} (${errors.length}):`);
            for (const error of errors.slice(0, 10)) {
                // Show first 10
                const location = error.line ? `:${error.line}` : '';
                console.log(`  ${error.file}${location}`);
                console.log(`    ${error.message}`);
                if (error.keys && error.keys.length > 0) {
                    const keysList = error.keys.slice(0, 5).join(', ');
                    const more = error.keys.length > 5 ? ` (and ${error.keys.length - 5} more)` : '';
                    console.log(`    Keys: ${keysList}${more}`);
                }
            }
            if (errors.length > 10) {
                console.log(`  ... and ${errors.length - 10} more errors of this type`);
            }
        }

        console.log('');
        return { success: false, error: `Found ${result.errors.length} validation error(s)` };
    }
}

async function handleSort(options: I18nManageExecutorSchema, context: ExecutorContext): Promise<I18nManageResult> {
    const { propertiesPath } = options;

    // Validation
    if (!propertiesPath) {
        return {
            success: false,
            error: '--propertiesPath is required. Configure it in project.json'
        };
    }

    console.log(`\n🔧 Sorting .properties files...`);
    console.log('');

    const result = await sortKeys({ propertiesPath });

    if (result.success) {
        if (result.filesModified.length === 0) {
            console.log('✅ All files already sorted');
        } else {
            console.log(`✅ Success! Sorted ${result.filesModified.length} file(s)`);
            for (const file of result.filesModified) {
                console.log(`   - ${file}`);
            }
            console.log(`   Generated TypeScript files`);
        }
        console.log('');
    } else {
        console.error(`❌ Error: ${result.error}`);
        console.log('');
    }

    return result;
}
