import { mkdir, rm, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { extractDesignTokens } from './token-extractor';

const TEMP_DIR = resolve(__dirname, '../../__test_tmp_tokens__');

beforeAll(async () => {
    await mkdir(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist'), { recursive: true });
});

afterAll(async () => {
    try {
        await rm(TEMP_DIR, { recursive: true, force: true });
    } catch {
        // ignore cleanup errors
    }
});

const SAMPLE_MARGINS_CSS = `.fd-margin--tiny{margin-block:.5rem;margin-inline:.5rem}.fd-margin--sm{margin-block:1rem;margin-inline:1rem}.fd-margin-top--tiny{margin-block-start:.5rem}`;
const SAMPLE_PADDINGS_CSS = `.fd-padding--sm{padding-block:1rem;padding-inline:1rem}.fd-padding-top--lg{padding-block-start:3rem}`;

describe('token-extractor', () => {
    it('should extract utility classes from CSS files', async () => {
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/margins.css'), SAMPLE_MARGINS_CSS);
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/paddings.css'), SAMPLE_PADDINGS_CSS);

        const tokens = await extractDesignTokens(TEMP_DIR);
        const utilityTokens = tokens.filter((t) => t.category === 'spacing' && t.name.startsWith('fd-'));

        expect(utilityTokens.length).toBeGreaterThanOrEqual(5);

        const marginTiny = utilityTokens.find((t) => t.name === 'fd-margin--tiny');
        expect(marginTiny).toBeDefined();
        expect(marginTiny!.category).toBe('spacing');
        expect(marginTiny!.example).toContain('fd-margin--tiny');
    });

    it('should include SAP theme CSS custom properties', async () => {
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/margins.css'), '');
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/paddings.css'), '');

        const tokens = await extractDesignTokens(TEMP_DIR);
        const sapTokens = tokens.filter((t) => t.name.startsWith('--sap'));

        expect(sapTokens.length).toBeGreaterThan(20);

        const bgColor = sapTokens.find((t) => t.name === '--sapBackgroundColor');
        expect(bgColor).toBeDefined();
        expect(bgColor!.category).toBe('color');
    });

    it('should categorize tokens correctly', async () => {
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/margins.css'), '');
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/paddings.css'), '');

        const tokens = await extractDesignTokens(TEMP_DIR);
        const categories = new Set(tokens.map((t) => t.category));

        expect(categories).toContain('color');
        expect(categories).toContain('typography');
        expect(categories).toContain('elevation');
        expect(categories).toContain('border');
        expect(categories).toContain('size');
    });

    it('should include usage examples for SAP tokens', async () => {
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/margins.css'), '');
        await writeFile(resolve(TEMP_DIR, 'node_modules/fundamental-styles/dist/paddings.css'), '');

        const tokens = await extractDesignTokens(TEMP_DIR);
        const sapTokens = tokens.filter((t) => t.name.startsWith('--sap'));

        for (const token of sapTokens) {
            expect(token.example).toBeDefined();
            expect(token.example).toContain('var(');
        }
    });

    it('should handle missing CSS files gracefully', async () => {
        const emptyDir = resolve(TEMP_DIR, '__empty__');
        await mkdir(emptyDir, { recursive: true });

        const tokens = await extractDesignTokens(emptyDir);

        // Should still return SAP theme tokens even without CSS files
        expect(tokens.length).toBeGreaterThan(0);
        expect(tokens.some((t) => t.name.startsWith('--sap'))).toBe(true);
    });
});
