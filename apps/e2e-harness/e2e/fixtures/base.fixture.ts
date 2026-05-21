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
    count: number;
    routes: RouteEntry[];
}

export interface E2EFixtures {
    goto: (route: string) => Promise<void>;
    getRoutes: (library?: string) => RouteEntry[];
}

const ROUTES_JSON_PATH = resolve(__dirname, '../config/e2e.routes.json');

let cachedRoutes: RoutesManifest | null = null;

function loadRoutes(): RoutesManifest {
    if (!cachedRoutes) {
        cachedRoutes = JSON.parse(readFileSync(ROUTES_JSON_PATH, 'utf-8'));
    }
    return cachedRoutes as RoutesManifest;
}

async function disableAnimations(page: Page): Promise<void> {
    await page.evaluate(() => document.documentElement.classList.add('e2e-no-animations'));
}

export const test = base.extend<E2EFixtures>({
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
