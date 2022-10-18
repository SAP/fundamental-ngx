import { execSync } from 'child_process';

export async function affectedProjects(base: string = 'origin/main', head: string = 'HEAD'): Promise<string[]> {
    base = base || 'origin/master';
    head = head || 'HEAD';

    return execSync(`npx nx print-affected --select=projects --base=${base} --head=${head}`)
        .toString()
        .trim()
        .split(',')
        .map((p) => p.trim());
}
