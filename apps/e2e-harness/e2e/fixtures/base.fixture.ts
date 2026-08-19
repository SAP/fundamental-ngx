import { test as base, Page } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export interface RouteEntry {
    path: string;
    library: string;
    component: string;
    example: string;
    className: string;
}

interface RoutesManifest {
    routes: RouteEntry[];
}

export interface E2EFixtures {
    goto: (route: string) => Promise<void>;
    getRoutes: (library?: string) => RouteEntry[];
}

const ROUTES_JSON_PATH = resolve(__dirname, '../config/e2e.routes.json');

// Calendars/date pickers highlight "today", so baselines would rot every midnight without a frozen clock.
const FIXED_NOW = new Date('2025-06-16T10:00:00Z');

let cachedRoutes: RoutesManifest | null = null;

function loadRoutes(): RoutesManifest {
    if (!cachedRoutes) {
        cachedRoutes = JSON.parse(readFileSync(ROUTES_JSON_PATH, 'utf-8'));
    }
    return cachedRoutes as RoutesManifest;
}

async function disableAnimations(page: Page): Promise<void> {
    // Add class-based animation disabling
    await page.evaluate(() => document.documentElement.classList.add('e2e-no-animations'));

    // Add CSS injection as fallback to ensure all animations are disabled
    await page.addStyleTag({
        content: `
            *, *::before, *::after {
                animation-duration: 0s !important;
                animation-delay: 0s !important;
                transition-duration: 0s !important;
                transition-delay: 0s !important;
                scroll-behavior: auto !important;
            }
        `
    });
}

export const test = base.extend<E2EFixtures>({
    page: async ({ page }, use) => {
        await page.clock.setFixedTime(FIXED_NOW);
        await use(page);
    },
    goto: async ({ page }, use) => {
        const fn = async (route: string): Promise<void> => {
            await page.goto(`/${route}`, { waitUntil: 'domcontentloaded' });
            await page.locator('e2e-root').waitFor({ state: 'visible' });
            await disableAnimations(page);
            await page.locator('html.e2e-no-animations').waitFor({ state: 'attached' });
        };
        await use(fn);
    },
    // eslint-disable-next-line no-empty-pattern
    getRoutes: async ({}, use) => {
        const fn = (library?: string): RouteEntry[] => {
            const manifest = loadRoutes();
            if (library) {
                return manifest.routes.filter((r) => r.library === library);
            }
            return manifest.routes;
        };
        await use(fn);
    }
});

export { expect } from '@playwright/test';
