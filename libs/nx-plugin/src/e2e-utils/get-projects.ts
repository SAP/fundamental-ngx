import { ExecutorContext } from '@nx/devkit';
import { affectedProjects } from './affected-projects';

export async function getProjects(
    context: ExecutorContext,
    affected: boolean = false,
    base: string = 'origin/main',
    head: string = 'HEAD'
): Promise<string[]> {
    if (affected) {
        return await affectedProjects(base, head);
    }
    return Object.keys(context.workspace?.projects || []).map((p) => p);
}
