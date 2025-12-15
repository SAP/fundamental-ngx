import { getJestProjectsAsync } from '@nx/jest';
import type { Config } from 'jest';

export default {
    projects: await getJestProjectsAsync(),
    transformIgnorePatterns: ['(.*)/node_modules/(?!(lodash-es)/?)']
} as Config;
