import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { test as baseTest } from './base.fixture';

interface RouteSuppression {
    suppress: string[];
    reason: string;
}

interface SystemicSuppression {
    rule: string;
}

interface A11ySuppressions {
    global: string[];
    globalComponentLibrary: SystemicSuppression[];
    routes: Record<string, RouteSuppression>;
}

export interface AxeFixtures {
    expectNoA11yViolations: (page: Page, route: string) => Promise<void>;
}

const SUPPRESSIONS_PATH = resolve(__dirname, '../config/a11y-suppressions.json');

let cachedSuppressions: A11ySuppressions | null = null;

function loadSuppressions(): A11ySuppressions {
    if (!cachedSuppressions) {
        cachedSuppressions = JSON.parse(readFileSync(SUPPRESSIONS_PATH, 'utf-8'));
    }
    return cachedSuppressions as A11ySuppressions;
}

function getSuppressedRules(route: string): string[] {
    const suppressions = loadSuppressions();
    const systemicRules = suppressions.globalComponentLibrary.map((s) => s.rule);
    const routeSuppression = suppressions.routes[route];
    const routeRules = routeSuppression ? routeSuppression.suppress : [];
    return [...new Set([...suppressions.global, ...systemicRules, ...routeRules])];
}

export const test = baseTest.extend<AxeFixtures>({
    // eslint-disable-next-line no-empty-pattern
    expectNoA11yViolations: async ({}, use) => {
        const fn = async (page: Page, route: string): Promise<void> => {
            const suppressedRules = getSuppressedRules(route);

            const builder = new AxeBuilder({ page }).withTags([
                'wcag2a',
                'wcag2aa',
                'wcag21a',
                'wcag21aa',
                'best-practice'
            ]);

            if (suppressedRules.length > 0) {
                builder.disableRules(suppressedRules);
            }

            const results = await builder.analyze();

            const violations = results.violations.map((v) => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                nodes: v.nodes.length,
                help: v.helpUrl
            }));

            expect(
                violations,
                `A11y violations on route "${route}":\n${JSON.stringify(violations, null, 2)}`
            ).toHaveLength(0);
        };
        await use(fn);
    }
});

export { expect } from '@playwright/test';
