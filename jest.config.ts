import { getJestProjectsAsync } from '@nx/jest';
import type { Config } from 'jest';

export default {
    projects: await getJestProjectsAsync()
} as Config;
