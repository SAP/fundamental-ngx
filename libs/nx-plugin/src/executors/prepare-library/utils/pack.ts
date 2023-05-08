import { detectPackageManager, ExecutorContext, getPackageManagerCommand, logger } from '@nx/devkit';
import { execSync } from 'child_process';
import { PrepareOptions } from './prepare.options';

export default async function pack(
    targetOptions: PrepareOptions,
    context: ExecutorContext
): Promise<{ success: boolean }> {
    logger.info(`=== Packing ${context.projectName} ===`);
    const { distPath } = targetOptions;
    const packageManager = detectPackageManager('./');
    execSync(getPackageManagerCommand(packageManager).run('pack', ''), { cwd: distPath, stdio: 'inherit' });
    return {
        success: true
    };
}
