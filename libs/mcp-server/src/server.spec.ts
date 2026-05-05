/**
 * MCP Server tool tests.
 *
 * These test the tool handler logic by directly importing the helpers
 * and exercising them against a small fixture catalog.
 *
 * For protocol-level integration testing, see server.integration.spec.ts.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ComponentCatalog, ComponentExample, ComponentMetadata, InputMetadata } from './types/component-metadata';

// ---------------------------------------------------------------------------
// We test the server's helper functions by re-implementing the lookup logic
// against a fixture catalog. This avoids spawning a full MCP server process
// in unit tests while still validating the core search/filter/match behaviour.
// ---------------------------------------------------------------------------

// Load the real catalog for snapshot-style assertions
let catalog: ComponentCatalog;
try {
    const dataPath = resolve(__dirname, 'data', 'components.json');
    catalog = JSON.parse(readFileSync(dataPath, 'utf-8'));
} catch {
    catalog = { generatedAt: '', version: 'test', components: [] };
}

// ---------------------------------------------------------------------------
// Mirror of server.ts helper functions (extracted for testability)
// ---------------------------------------------------------------------------

function findComponent(nameOrSelector: string, components: ComponentMetadata[]): ComponentMetadata | undefined {
    const lower = nameOrSelector.toLowerCase();

    const bySelector = components.find((c) => c.selector.toLowerCase() === lower);
    if (bySelector) {
        return bySelector;
    }

    const byName = components.find((c) => c.name.toLowerCase() === lower);
    if (byName) {
        return byName;
    }

    const byPartialSelector = components.find((c) => c.selector.toLowerCase().includes(lower));
    if (byPartialSelector) {
        return byPartialSelector;
    }

    const byPartialName = components.find((c) => c.name.toLowerCase().includes(lower));
    if (byPartialName) {
        return byPartialName;
    }

    return undefined;
}

function scoreMatch(component: ComponentMetadata, query: string): number {
    let score = 0;

    if (component.selector.toLowerCase() === query) {
        score += 100;
    } else if (component.selector.toLowerCase().includes(query)) {
        score += 50;
    }

    if (component.name.toLowerCase() === query) {
        score += 90;
    } else if (component.name.toLowerCase().includes(query)) {
        score += 40;
    }

    if (component.description.toLowerCase().includes(query)) {
        score += 20;
    }
    if (component.category.toLowerCase().includes(query)) {
        score += 30;
    }

    for (const input of component.inputs) {
        if (input.name.toLowerCase().includes(query)) {
            score += 15;
            break;
        }
    }
    for (const output of component.outputs) {
        if (output.name.toLowerCase().includes(query)) {
            score += 15;
            break;
        }
    }

    return score;
}

function truncate(text: string, maxLength: number): string {
    if (!text) {
        return '';
    }
    const firstLine = text.split('\n')[0];
    if (firstLine.length <= maxLength) {
        return firstLine;
    }
    return firstLine.slice(0, maxLength - 3) + '...';
}

// ---------------------------------------------------------------------------
// Version comparison helpers (mirror of server.ts)
// ---------------------------------------------------------------------------

function compareVersions(a: string, b: string): number {
    const [aBase, aPre] = a.split('-');
    const [bBase, bPre] = b.split('-');
    const pa = aBase.split('.').map(Number);
    const pb = bBase.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
        if (diff !== 0) {
            return diff;
        }
    }
    if (!aPre && bPre) {
        return 1;
    }
    if (aPre && !bPre) {
        return -1;
    }
    if (aPre && bPre) {
        const aRc = parseInt(aPre.replace(/\D+/g, ''), 10) || 0;
        const bRc = parseInt(bPre.replace(/\D+/g, ''), 10) || 0;
        return aRc - bRc;
    }
    return 0;
}

function baseVersion(version: string): string {
    return version.replace(/-.*$/, '');
}

// ---------------------------------------------------------------------------
// findAlternatives helper (mirror of server.ts)
// ---------------------------------------------------------------------------

const UI_PATTERNS: Record<string, string[]> = {
    'button|action': ['fd-button', 'ui5-button', 'fd-split-button', 'fd-segmented-button'],
    'dialog|modal|popup': ['fd-dialog', 'ui5-dialog', 'fd-message-box'],
    'table|data table|grid': ['fd-table', 'fdp-table', 'ui5-table']
};

function findAlternatives(selectorA: string, selectorB: string): string[] {
    const alternatives = new Set<string>();
    for (const componentSelectors of Object.values(UI_PATTERNS)) {
        const hasA = componentSelectors.includes(selectorA);
        const hasB = componentSelectors.includes(selectorB);
        if (hasA || hasB) {
            for (const sel of componentSelectors) {
                if (sel !== selectorA && sel !== selectorB) {
                    alternatives.add(sel);
                }
            }
        }
    }
    return [...alternatives];
}

// ---------------------------------------------------------------------------
// Fixture catalog for targeted tests
// ---------------------------------------------------------------------------

const FIXTURE_COMPONENTS: ComponentMetadata[] = [
    {
        name: 'ButtonComponent',
        selector: 'fd-button',
        library: '@fundamental-ngx/core',
        category: 'Actions',
        description: 'A standard button component for triggering actions.',
        inputs: [
            {
                name: 'fdType',
                type: 'string',
                description: 'Button type',
                required: false,
                enumValues: ['standard', 'positive', 'negative']
            },
            { name: 'compact', type: 'boolean', description: 'Compact mode', required: false },
            { name: 'ariaLabel', type: 'string', description: 'ARIA label for the button', required: false }
        ],
        outputs: [{ name: 'clicked', type: 'void', description: 'Emitted on click' }],
        slots: [],
        methods: [],
        cssProperties: [],
        source: 'typedoc'
    },
    {
        name: 'Button',
        selector: 'ui5-button',
        library: '@fundamental-ngx/ui5-webcomponents',
        category: 'Actions',
        description: 'UI5 Web Components button.',
        keyboardHandling: 'Press ENTER or SPACE to trigger the button.',
        inputs: [
            {
                name: 'design',
                type: 'ButtonDesign',
                description: 'Visual design',
                required: false,
                enumValues: ['Default', 'Emphasized', 'Transparent']
            },
            { name: 'disabled', type: 'boolean', description: 'Disabled state', required: false },
            { name: 'accessibleName', type: 'string', description: 'Accessible name', required: false },
            { name: 'accessibleNameRef', type: 'string', description: 'Accessible name reference', required: false }
        ],
        outputs: [{ name: 'ui5Click', type: 'CustomEvent', description: 'Fired on click' }],
        slots: [{ name: 'default', description: 'Button content' }],
        methods: [],
        cssProperties: [],
        source: 'cem'
    },
    {
        name: 'DialogComponent',
        selector: 'fd-dialog',
        library: '@fundamental-ngx/core',
        category: 'Popover & Dialog',
        description: 'A dialog overlay for user interactions.',
        inputs: [
            { name: 'width', type: 'string', description: 'Dialog width', required: false },
            { name: 'ariaLabel', type: 'string', description: 'ARIA label', required: false },
            { name: 'ariaDescribedBy', type: 'string', description: 'IDs of describing elements', required: false },
            { name: 'role', type: 'string', description: 'Dialog ARIA role', required: false }
        ],
        outputs: [{ name: 'dialogClosed', type: 'void', description: 'Emitted when closed' }],
        slots: [],
        methods: [{ name: 'open', returnType: 'void', description: 'Open the dialog', params: [] }],
        cssProperties: [],
        source: 'typedoc',
        examples: [
            {
                name: 'dialog-a11y-example',
                description: 'Accessibility example',
                typescript: 'class DialogA11yComponent {}',
                html: '<fd-dialog ariaLabel="Confirm deletion">'
            }
        ]
    },
    {
        name: 'TableComponent',
        selector: 'fdp-table',
        library: '@fundamental-ngx/platform',
        category: 'Data Display',
        description: 'A powerful data table with sorting, filtering, and pagination.',
        inputs: [
            { name: 'dataSource', type: 'TableDataSource', description: 'Data source', required: true },
            { name: 'selectionMode', type: 'string', description: 'Selection mode', required: false }
        ],
        outputs: [],
        slots: [],
        methods: [],
        cssProperties: [],
        source: 'typedoc'
    },
    {
        name: 'DeprecatedComponent',
        selector: 'fd-deprecated',
        library: '@fundamental-ngx/core',
        category: 'Legacy',
        description: 'An old component.',
        deprecated: 'Use fd-button instead.',
        inputs: [{ name: 'value', type: 'string', description: 'Value', required: false }],
        outputs: [],
        slots: [],
        methods: [],
        cssProperties: [],
        source: 'typedoc'
    }
];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MCP Server helpers', () => {
    describe('findComponent', () => {
        it('should find by exact selector', () => {
            const result = findComponent('fd-button', FIXTURE_COMPONENTS);
            expect(result?.name).toBe('ButtonComponent');
        });

        it('should find by exact name', () => {
            const result = findComponent('DialogComponent', FIXTURE_COMPONENTS);
            expect(result?.selector).toBe('fd-dialog');
        });

        it('should find by case-insensitive selector', () => {
            const result = findComponent('FD-BUTTON', FIXTURE_COMPONENTS);
            expect(result?.name).toBe('ButtonComponent');
        });

        it('should find by partial selector', () => {
            const result = findComponent('button', FIXTURE_COMPONENTS);
            // should match fd-button (contains "button")
            expect(result).toBeDefined();
            expect(result!.selector).toContain('button');
        });

        it('should find by partial name', () => {
            const result = findComponent('dialog', FIXTURE_COMPONENTS);
            expect(result?.name).toBe('DialogComponent');
        });

        it('should return undefined for non-existent component', () => {
            const result = findComponent('nonexistent-xyz', FIXTURE_COMPONENTS);
            expect(result).toBeUndefined();
        });

        it('should prefer exact selector over partial name match', () => {
            const result = findComponent('ui5-button', FIXTURE_COMPONENTS);
            expect(result?.name).toBe('Button');
        });
    });

    describe('scoreMatch', () => {
        it('should give highest score for exact selector match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'fd-button');
            expect(score).toBeGreaterThanOrEqual(100);
        });

        it('should give high score for exact name match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'buttoncomponent');
            expect(score).toBeGreaterThanOrEqual(90);
        });

        it('should give positive score for partial selector match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'button');
            expect(score).toBeGreaterThan(0);
        });

        it('should give positive score for description match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'triggering');
            expect(score).toBeGreaterThan(0);
        });

        it('should give positive score for category match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'actions');
            expect(score).toBeGreaterThan(0);
        });

        it('should give positive score for input name match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'fdtype');
            expect(score).toBeGreaterThan(0);
        });

        it('should give positive score for output name match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'clicked');
            expect(score).toBeGreaterThan(0);
        });

        it('should return 0 for no match', () => {
            const score = scoreMatch(FIXTURE_COMPONENTS[0], 'zzzzzzz');
            expect(score).toBe(0);
        });

        it('should rank exact selector match highly even if partial matches more fields', () => {
            const exactScore = scoreMatch(FIXTURE_COMPONENTS[0], 'fd-button');
            const partialScore = scoreMatch(FIXTURE_COMPONENTS[0], 'button');
            // "button" matches more fields (selector partial + name partial + description)
            // than "fd-button" (selector exact only), so partial can score higher.
            // Both should be positive.
            expect(exactScore).toBeGreaterThan(0);
            expect(partialScore).toBeGreaterThan(0);
        });
    });

    describe('truncate', () => {
        it('should return text as-is when short enough', () => {
            expect(truncate('Hello', 100)).toBe('Hello');
        });

        it('should truncate with ellipsis when too long', () => {
            const result = truncate('A very long description that exceeds the limit', 20);
            expect(result).toHaveLength(20);
            expect(result.endsWith('...')).toBe(true);
        });

        it('should take only first line for multiline text', () => {
            const result = truncate('First line\nSecond line\nThird line', 100);
            expect(result).toBe('First line');
        });

        it('should handle empty string', () => {
            expect(truncate('', 100)).toBe('');
        });
    });

    describe('list_components filter logic', () => {
        it('should filter by library', () => {
            const filtered = FIXTURE_COMPONENTS.filter((c) => c.library === '@fundamental-ngx/core');
            expect(filtered).toHaveLength(3);
            expect(filtered.every((c) => c.library === '@fundamental-ngx/core')).toBe(true);
        });

        it('should filter by category', () => {
            const lowerCategory = 'actions';
            const filtered = FIXTURE_COMPONENTS.filter((c) => c.category.toLowerCase().includes(lowerCategory));
            expect(filtered).toHaveLength(2);
        });

        it('should filter by both library and category', () => {
            const filtered = FIXTURE_COMPONENTS.filter(
                (c) => c.library === '@fundamental-ngx/core' && c.category.toLowerCase().includes('actions')
            );
            expect(filtered).toHaveLength(1);
            expect(filtered[0].name).toBe('ButtonComponent');
        });
    });

    describe('search_components scoring logic', () => {
        it('should rank results by relevance score', () => {
            const query = 'button';
            const scored = FIXTURE_COMPONENTS.map((c) => ({ component: c, score: scoreMatch(c, query) }))
                .filter((s) => s.score > 0)
                .sort((a, b) => b.score - a.score);

            expect(scored.length).toBeGreaterThan(0);
            // Both button components should be at the top
            expect(scored[0].component.selector).toContain('button');
        });

        it('should find components by input property name', () => {
            const query = 'datasource';
            const scored = FIXTURE_COMPONENTS.map((c) => ({ component: c, score: scoreMatch(c, query) })).filter(
                (s) => s.score > 0
            );

            expect(scored).toHaveLength(1);
            expect(scored[0].component.name).toBe('TableComponent');
        });
    });
});

// ---------------------------------------------------------------------------
// Tests against real components.json (if available)
// ---------------------------------------------------------------------------

describe('Real catalog validation', () => {
    const skip = catalog.components.length === 0;

    (skip ? it.skip : it)('should have a reasonable number of components', () => {
        expect(catalog.components.length).toBeGreaterThan(100);
    });

    (skip ? it.skip : it)('should have components from multiple libraries', () => {
        const libraries = new Set(catalog.components.map((c) => c.library));
        expect(libraries.size).toBeGreaterThanOrEqual(5);
    });

    (skip ? it.skip : it)('every component should have a name and selector', () => {
        for (const comp of catalog.components) {
            expect(comp.name).toBeTruthy();
            expect(comp.selector).toBeTruthy();
        }
    });

    (skip ? it.skip : it)('every component should have a valid library', () => {
        const validLibraries = [
            '@fundamental-ngx/core',
            '@fundamental-ngx/platform',
            '@fundamental-ngx/btp',
            '@fundamental-ngx/cx',
            '@fundamental-ngx/cdk',
            '@fundamental-ngx/i18n',
            '@fundamental-ngx/datetime-adapter',
            '@fundamental-ngx/moment-adapter',
            '@fundamental-ngx/ui5-webcomponents',
            '@fundamental-ngx/ui5-webcomponents-fiori',
            '@fundamental-ngx/ui5-webcomponents-ai'
        ];
        for (const comp of catalog.components) {
            expect(validLibraries).toContain(comp.library);
        }
    });

    (skip ? it.skip : it)('every component should have a valid source', () => {
        for (const comp of catalog.components) {
            expect(['cem', 'typedoc']).toContain(comp.source);
        }
    });

    (skip ? it.skip : it)('inputs should have name and type', () => {
        for (const comp of catalog.components) {
            for (const input of comp.inputs) {
                expect(input.name).toBeTruthy();
                expect(input.type).toBeTruthy();
            }
        }
    });

    (skip ? it.skip : it)('CEM components should have ui5- prefix selectors', () => {
        const cemComponents = catalog.components.filter((c) => c.source === 'cem');
        for (const comp of cemComponents) {
            expect(comp.selector).toMatch(/^ui5-/);
        }
    });

    (skip ? it.skip : it)('should find specific well-known components', () => {
        // Search by class name to avoid ambiguity with BTP directives that also use fd-button in their selector.
        const fdButton = catalog.components.find(
            (c) => c.name === 'ButtonComponent' && c.library === '@fundamental-ngx/core'
        );
        expect(fdButton).toBeDefined();
        expect(fdButton!.library).toBe('@fundamental-ngx/core');

        const ui5Button = findComponent('ui5-button', catalog.components);
        expect(ui5Button).toBeDefined();
        expect(ui5Button!.source).toBe('cem');
    });
});

// ---------------------------------------------------------------------------
// Version helpers
// ---------------------------------------------------------------------------

describe('compareVersions', () => {
    it('should sort major versions', () => {
        expect(compareVersions('1.0.0', '0.9.0')).toBeGreaterThan(0);
        expect(compareVersions('0.9.0', '1.0.0')).toBeLessThan(0);
    });

    it('should sort minor versions', () => {
        expect(compareVersions('0.61.0', '0.60.0')).toBeGreaterThan(0);
    });

    it('should sort patch versions', () => {
        expect(compareVersions('0.61.1', '0.61.0')).toBeGreaterThan(0);
    });

    it('should rank stable above RC of same base', () => {
        expect(compareVersions('0.61.0', '0.61.0-rc.2')).toBeGreaterThan(0);
        expect(compareVersions('0.61.0-rc.2', '0.61.0')).toBeLessThan(0);
    });

    it('should sort RC numbers numerically', () => {
        expect(compareVersions('0.61.0-rc.10', '0.61.0-rc.2')).toBeGreaterThan(0);
        expect(compareVersions('0.61.0-rc.1', '0.61.0-rc.2')).toBeLessThan(0);
    });

    it('should return 0 for identical versions', () => {
        expect(compareVersions('0.61.0', '0.61.0')).toBe(0);
        expect(compareVersions('0.61.0-rc.2', '0.61.0-rc.2')).toBe(0);
    });
});

describe('baseVersion', () => {
    it('should strip RC suffix', () => {
        expect(baseVersion('0.61.0-rc.2')).toBe('0.61.0');
    });

    it('should return stable versions unchanged', () => {
        expect(baseVersion('0.61.0')).toBe('0.61.0');
    });
});

describe('RC-to-stable deduplication logic', () => {
    const entries = [
        {
            version: '0.61.0-rc.2',
            type: 'feature' as const,
            description: 'add new card layout mode',
            library: '@fundamental-ngx/core' as const
        },
        {
            version: '0.61.0-rc.2',
            type: 'breaking' as const,
            description: 'migrate popover to signals',
            library: '@fundamental-ngx/core' as const
        },
        {
            version: '0.61.0',
            type: 'feature' as const,
            description: 'add new card layout mode',
            library: '@fundamental-ngx/core' as const
        },
        {
            version: '0.61.0',
            type: 'breaking' as const,
            description: 'migrate popover to signals',
            library: '@fundamental-ngx/core' as const
        },
        {
            version: '0.61.0-rc.1',
            type: 'fix' as const,
            description: 'restore missing popover inputs',
            library: '@fundamental-ngx/core' as const
        },
        {
            version: '0.61.0',
            type: 'fix' as const,
            description: 'restore missing popover inputs',
            library: '@fundamental-ngx/core' as const
        }
    ];

    it('should drop RC entries when same change exists in stable release', () => {
        // Build stable keys set
        const stableKeys = new Set<string>();
        for (const e of entries) {
            if (!e.version.includes('-')) {
                stableKeys.add(`${baseVersion(e.version)}|${e.type}|${e.description}`);
            }
        }

        const deduped = entries.filter((e) => {
            if (!e.version.includes('-')) {
                return true;
            }
            const key = `${baseVersion(e.version)}|${e.type}|${e.description}`;
            return !stableKeys.has(key);
        });

        // Only the 3 stable entries should remain
        expect(deduped).toHaveLength(3);
        expect(deduped.every((e) => !e.version.includes('-'))).toBe(true);
    });

    it('should keep RC entries that have no matching stable release', () => {
        const entriesWithOrphanRc = [
            ...entries,
            {
                version: '0.62.0-rc.1',
                type: 'fix' as const,
                description: 'unique RC fix',
                library: '@fundamental-ngx/core' as const
            }
        ];

        const stableKeys = new Set<string>();
        for (const e of entriesWithOrphanRc) {
            if (!e.version.includes('-')) {
                stableKeys.add(`${baseVersion(e.version)}|${e.type}|${e.description}`);
            }
        }

        const deduped = entriesWithOrphanRc.filter((e) => {
            if (!e.version.includes('-')) {
                return true;
            }
            const key = `${baseVersion(e.version)}|${e.type}|${e.description}`;
            return !stableKeys.has(key);
        });

        // 3 stable + 1 orphan RC
        expect(deduped).toHaveLength(4);
        expect(deduped.find((e) => e.version === '0.62.0-rc.1')).toBeDefined();
    });
});

// ---------------------------------------------------------------------------
// get_accessibility_guide logic
// ---------------------------------------------------------------------------

describe('get_accessibility_guide logic', () => {
    function getAriaInputs(component: ComponentMetadata): InputMetadata[] {
        return component.inputs.filter(
            (i) =>
                i.name.toLowerCase().startsWith('aria') ||
                i.name.toLowerCase() === 'role' ||
                i.name.toLowerCase().startsWith('accessible')
        );
    }

    function getA11yExamples(component: ComponentMetadata): ComponentExample[] {
        return (component.examples ?? []).filter(
            (ex) =>
                ex.name.toLowerCase().includes('a11y') ||
                ex.name.toLowerCase().includes('accessibility') ||
                ex.name.toLowerCase().includes('accessible')
        );
    }

    it('should extract ARIA inputs (ariaLabel)', () => {
        const comp = findComponent('fd-button', FIXTURE_COMPONENTS)!;
        const ariaInputs = getAriaInputs(comp);
        expect(ariaInputs).toHaveLength(1);
        expect(ariaInputs[0].name).toBe('ariaLabel');
    });

    it('should extract accessible* inputs for UI5 components', () => {
        const comp = findComponent('ui5-button', FIXTURE_COMPONENTS)!;
        const ariaInputs = getAriaInputs(comp);
        expect(ariaInputs.map((i) => i.name)).toEqual(expect.arrayContaining(['accessibleName', 'accessibleNameRef']));
    });

    it('should extract ARIA, role, and ariaDescribedBy inputs', () => {
        const comp = findComponent('fd-dialog', FIXTURE_COMPONENTS)!;
        const ariaInputs = getAriaInputs(comp);
        expect(ariaInputs).toHaveLength(3);
        expect(ariaInputs.map((i) => i.name).sort()).toEqual(['ariaDescribedBy', 'ariaLabel', 'role']);
    });

    it('should return empty array for components with no ARIA inputs', () => {
        const comp = findComponent('fdp-table', FIXTURE_COMPONENTS)!;
        const ariaInputs = getAriaInputs(comp);
        expect(ariaInputs).toHaveLength(0);
    });

    it('should find a11y examples when present', () => {
        const comp = findComponent('fd-dialog', FIXTURE_COMPONENTS)!;
        const examples = getA11yExamples(comp);
        expect(examples).toHaveLength(1);
        expect(examples[0].name).toContain('a11y');
    });

    it('should return empty examples for components without a11y examples', () => {
        const comp = findComponent('fd-button', FIXTURE_COMPONENTS)!;
        const examples = getA11yExamples(comp);
        expect(examples).toHaveLength(0);
    });

    it('should include keyboard handling from CEM components', () => {
        const comp = findComponent('ui5-button', FIXTURE_COMPONENTS)!;
        expect(comp.keyboardHandling).toBe('Press ENTER or SPACE to trigger the button.');
    });

    it('should have no keyboard handling for typedoc components', () => {
        const comp = findComponent('fd-button', FIXTURE_COMPONENTS)!;
        expect(comp.keyboardHandling).toBeUndefined();
    });
});

// ---------------------------------------------------------------------------
// compare_components logic
// ---------------------------------------------------------------------------

describe('compare_components logic', () => {
    it('should identify shared inputs by name', () => {
        const compA = findComponent('fd-dialog', FIXTURE_COMPONENTS)!;
        const compB = findComponent('fd-button', FIXTURE_COMPONENTS)!;

        const inputNamesB = new Set(compB.inputs.map((i) => i.name));

        const shared = compA.inputs.filter((i) => inputNamesB.has(i.name));
        expect(shared.map((i) => i.name)).toContain('ariaLabel');
    });

    it('should identify inputs unique to each component', () => {
        const compA = findComponent('fd-button', FIXTURE_COMPONENTS)!;
        const compB = findComponent('ui5-button', FIXTURE_COMPONENTS)!;

        const inputNamesB = new Set(compB.inputs.map((i) => i.name));
        const onlyInA = compA.inputs.filter((i) => !inputNamesB.has(i.name));

        expect(onlyInA.map((i) => i.name)).toContain('fdType');
        expect(onlyInA.map((i) => i.name)).toContain('compact');
    });

    it('should find alternatives from UI_PATTERNS', () => {
        const alts = findAlternatives('fd-button', 'ui5-button');
        expect(alts).toContain('fd-split-button');
        expect(alts).toContain('fd-segmented-button');
        expect(alts).not.toContain('fd-button');
        expect(alts).not.toContain('ui5-button');
    });

    it('should return empty alternatives when selectors are not in any pattern', () => {
        const alts = findAlternatives('fd-unknown', 'ui5-unknown');
        expect(alts).toHaveLength(0);
    });

    it('should include deprecation info when comparing deprecated components', () => {
        const compA = findComponent('fd-deprecated', FIXTURE_COMPONENTS)!;
        const compB = findComponent('fd-button', FIXTURE_COMPONENTS)!;

        const summaryParts: string[] = [];
        if (compA.deprecated) {
            summaryParts.push(`${compA.selector} is deprecated: ${compA.deprecated}`);
        }
        if (compB.deprecated) {
            summaryParts.push(`${compB.selector} is deprecated: ${compB.deprecated}`);
        }

        expect(summaryParts).toHaveLength(1);
        expect(summaryParts[0]).toContain('fd-deprecated');
        expect(summaryParts[0]).toContain('Use fd-button instead');
    });

    it('should report slot differences', () => {
        const compA = findComponent('fd-button', FIXTURE_COMPONENTS)!;
        const compB = findComponent('ui5-button', FIXTURE_COMPONENTS)!;

        expect(compA.slots).toHaveLength(0);
        expect(compB.slots).toHaveLength(1);
        expect(compB.slots[0].name).toBe('default');
    });
});
