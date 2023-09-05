import { execSync } from 'child_process';

/**
 * Returns a list of affected projects between the base and head commits.
 * @param base = 'origin/main'
 * @param head = 'HEAD'
 */
export async function affectedProjects(base: string = 'origin/main', head: string = 'HEAD'): Promise<string[]> {
    base = base || 'origin/master';
    head = head || 'HEAD';

    return execSync(`npx nx print-affected --select=projects --base=${base} --head=${head}`)
        .toString()
        .trim()
        .split(',')
        .map((p) => p.trim());
}
