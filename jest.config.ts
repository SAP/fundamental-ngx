import { getJestProjects } from '@nx/jest';
import type { Config } from 'jest';

export default {
    projects: getJestProjects(),
    transformIgnorePatterns: ['(.*)/node_modules/(?!(lodash-es)/?)']
} as Config;
