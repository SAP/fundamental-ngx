import { getJestProjects } from '@nx/jest';
import type { Config } from 'jest';

export default {
    projects: getJestProjects()
} as Config;
