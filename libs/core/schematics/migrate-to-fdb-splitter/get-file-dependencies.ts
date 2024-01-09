import { execSync } from 'child_process';

/**
 * Returns the list of files that the given file depends on.
 * @param file
 * @param tsConfigPath
 */
export async function getFileDependencies(file: string, tsConfigPath: string): Promise<string[]> {
    const { toList: files } = await import('dependency-tree');
    const tsConfig = JSON.parse(execSync(`tsc -p ${tsConfigPath} --showConfig`).toString());
    return files({
        filename: file,
        tsConfig: {
            compilerOptions: {
                paths: tsConfig.compilerOptions.paths
            }
        },
        filter: (path) => path.indexOf('node_modules') === -1,
        directory: process.cwd()
    });
}
