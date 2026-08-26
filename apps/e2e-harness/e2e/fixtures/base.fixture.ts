import { test as base } from '@playwright/test';
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

let cachedRoutes: RoutesManifest | null = null;

function loadRoutes(): RoutesManifest {
    if (!cachedRoutes) {
        cachedRoutes = JSON.parse(readFileSync(ROUTES_JSON_PATH, 'utf-8'));
    }
    return cachedRoutes as RoutesManifest;
}

export const test = base.extend<E2EFixtures>({
    goto: async ({ page }, use) => {
        const fn = async (route: string): Promise<void> => {
            await page.goto(`/${route}`, { waitUntil: 'domcontentloaded' });
            await page.locator('e2e-root').waitFor({ state: 'visible' });
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
