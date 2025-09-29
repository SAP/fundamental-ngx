import { ExecutorContext } from '@nx/devkit';

import executor from './executor';
import { GenerateExecutorSchema } from './schema';

const options: GenerateExecutorSchema = {};
const context: ExecutorContext = {
    root: '',
    cwd: process.cwd(),
    isVerbose: false,
    projectGraph: {
        nodes: {},
        dependencies: {}
    },
    projectsConfigurations: {
        projects: {},
        version: 2
    },
    nxJsonConfiguration: {}
};

describe('Generate Executor', () => {
    it('can run', async () => {
        const output = await executor(options, context);
        expect(output.success).toBe(true);
    });
});
