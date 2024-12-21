import { ExecutorContext } from '@nx/devkit';
import { affectedProjects } from './affected-projects';

/**
 * Returns a list of projects to run the executor on.
 * @param context
 * @param affected
 * @param base
 * @param head
 */
export async function getProjects(
    context: ExecutorContext,
    affected: boolean = false,
    base: string = 'origin/main',
    head: string = 'HEAD'
): Promise<string[]> {
    if (affected) {
        return await affectedProjects(base, head);
    }
    return Object.keys(context.projectsConfigurations?.projects || []).map((p) => p);
}
