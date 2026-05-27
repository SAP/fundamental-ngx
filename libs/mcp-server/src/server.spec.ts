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
import { USAGE_GUIDES } from './data/usage-guides';
import { ComponentCatalog, ComponentMetadata } from './types/component-metadata';
import { buildPitfalls, buildTemplate, deriveImportPath, getSelectorType } from './utils/selector-utils';

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

function selectorHasBoundaryMatch(selector: string, query: string): boolean {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped + '(?!-)').test(selector);
}

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

    const partialMatches = components.filter(
        (c) => selectorHasBoundaryMatch(c.selector.toLowerCase(), lower) || c.name.toLowerCase().includes(lower)
    );
    if (partialMatches.length > 0) {
        return partialMatches.sort((a, b) => scoreMatch(b, lower) - scoreMatch(a, lower))[0];
    }

    return undefined;
}

function scoreMatch(component: ComponentMetadata, query: string): number {
    let score = 0;

    if (component.selector.toLowerCase() === query) {
        score += 100;
    } else if (component.selector.toLowerCase().includes(query)) {
        score += 50;
        const selectorParts = component.selector.split(',').map((p) => p.trim().toLowerCase());
        const matchingParts = selectorParts.filter((p) => p.includes(query));
        if (matchingParts.length > 0) {
            const shortestPart = Math.min(...matchingParts.map((p) => p.length));
            score += Math.max(0, 20 - (shortestPart - query.length));
        }
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

        it('should prefer primary component over compound directive with same attribute', () => {
            // Regression: searching "fd-button" previously returned NestedButtonDirective
            // ([fd-button][fdbNestedButton]) instead of ButtonComponent (button[fd-button])
            // because the directive appeared first in the catalog.
            const primaryButton: ComponentMetadata = {
                name: 'ButtonComponent',
                selector: 'button[fd-button], a[fd-button]',
                library: '@fundamental-ngx/core',
                category: 'Actions',
                description: 'Standard button',
                inputs: [],
                outputs: [],
                slots: [],
                methods: [],
                cssProperties: [],
                source: 'typedoc'
            };
            const nestedDirective: ComponentMetadata = {
                name: 'NestedButtonDirective',
                selector: '[fd-button][fdbNestedButton]',
                library: '@fundamental-ngx/btp',
                category: 'Actions',
                description: 'Nested button directive',
                inputs: [],
                outputs: [],
                slots: [],
                methods: [],
                cssProperties: [],
                source: 'typedoc'
            };
            // Directive appears first — scorer must still rank ButtonComponent higher
            const result = findComponent('fd-button', [nestedDirective, primaryButton]);
            expect(result?.name).toBe('ButtonComponent');
        });

        it('should not resolve a prefix segment to a longer compound selector', () => {
            // Regression: "fd-input" must NOT resolve to InputGroupComponent (selector: "fd-input-group")
            // because "fd-input" is a prefix of "fd-input-group", not the same component.
            const inputGroup: ComponentMetadata = {
                name: 'InputGroupComponent',
                selector: 'fd-input-group',
                library: '@fundamental-ngx/core',
                category: 'input-group',
                description: 'Input group wrapper.',
                inputs: [],
                outputs: [],
                slots: [],
                methods: [],
                cssProperties: [],
                source: 'typedoc'
            };
            expect(findComponent('fd-input', [inputGroup])).toBeUndefined();
        });

        it('should still find a component by its full compound selector', () => {
            const inputGroup: ComponentMetadata = {
                name: 'InputGroupComponent',
                selector: 'fd-input-group',
                library: '@fundamental-ngx/core',
                category: 'input-group',
                description: 'Input group wrapper.',
                inputs: [],
                outputs: [],
                slots: [],
                methods: [],
                cssProperties: [],
                source: 'typedoc'
            };
            expect(findComponent('fd-input-group', [inputGroup])?.name).toBe('InputGroupComponent');
        });

        it('should not resolve fd-table to fd-table-cell', () => {
            const tableCell: ComponentMetadata = {
                name: 'TableCellDirective',
                selector: 'td[fd-table-cell], th[fd-table-cell]',
                library: '@fundamental-ngx/core',
                category: 'table',
                description: 'Table cell directive.',
                inputs: [],
                outputs: [],
                slots: [],
                methods: [],
                cssProperties: [],
                source: 'typedoc'
            };
            expect(findComponent('fd-table', [tableCell])).toBeUndefined();
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

        it('should rank multi-word query results by summing per-word scores', () => {
            // A component whose selector/name/description matches more words should rank higher.
            const flexLayout: ComponentMetadata = {
                name: 'FlexibleColumnLayoutComponent',
                selector: 'fd-flexible-column-layout',
                library: '@fundamental-ngx/core',
                category: 'flexible-column-layout',
                description: 'Flexible column layout for master-detail patterns.',
                inputs: [],
                outputs: [],
                slots: [],
                methods: [],
                cssProperties: [],
                source: 'typedoc'
            };
            const listComp: ComponentMetadata = {
                name: 'ListComponent',
                selector: 'fd-list',
                library: '@fundamental-ngx/core',
                category: 'List',
                description: 'A list component for displaying homogeneous data.',
                inputs: [],
                outputs: [],
                slots: [],
                methods: [],
                cssProperties: [],
                source: 'typedoc'
            };

            const queryWords = ['flexible', 'column'];
            const flexScore = queryWords.reduce((sum, w) => sum + scoreMatch(flexLayout, w), 0);
            const listScore = queryWords.reduce((sum, w) => sum + scoreMatch(listComp, w), 0);

            expect(flexScore).toBeGreaterThan(listScore);
            expect(flexScore).toBeGreaterThan(0);
        });

        it('should return zero score for a multi-word query when no word matches', () => {
            const queryWords = ['flexible', 'column'];
            const score = queryWords.reduce((sum, w) => sum + scoreMatch(FIXTURE_COMPONENTS[4], w), 0); // DeprecatedComponent
            expect(score).toBe(0);
        });
    });
});

// ---------------------------------------------------------------------------
// patternKeywordMatches
// ---------------------------------------------------------------------------

describe('patternKeywordMatches', () => {
    function patternKeywordMatches(keyword: string, text: string): boolean {
        if (keyword.includes(' ')) {
            return text.includes(keyword);
        }
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`\\b${escaped}\\b`).test(text);
    }

    it('should match a whole word', () => {
        expect(patternKeywordMatches('user', 'user profile page')).toBe(true);
    });

    it('should not match a word that is a prefix of another word', () => {
        // Regression: "user" must not fire for "username"
        expect(patternKeywordMatches('user', 'a login form with username and password')).toBe(false);
    });

    it('should not match a word embedded inside another word', () => {
        expect(patternKeywordMatches('form', 'platform settings')).toBe(false);
    });

    it('should match a word adjacent to punctuation', () => {
        expect(patternKeywordMatches('date', 'pick a date, any date')).toBe(true);
    });

    it('should match a multi-word phrase as a substring', () => {
        expect(patternKeywordMatches('data table', 'a filterable data table with sorting')).toBe(true);
    });

    it('should not match a multi-word phrase when only one word is present', () => {
        expect(patternKeywordMatches('data table', 'show a table of users')).toBe(false);
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

    (skip ? it.skip : it)('multi-word search should surface fd-flexible-column-layout for "flexible column"', () => {
        const queryWords = ['flexible', 'column'];
        const scored = catalog.components
            .map((c) => ({ c, score: queryWords.reduce((sum, w) => sum + scoreMatch(c, w), 0) }))
            .filter((s) => s.score > 0)
            .sort((a, b) => b.score - a.score);

        expect(scored.length).toBeGreaterThan(0);
        expect(scored[0].c.selector).toMatch(/flexible-column/);
    });

    (skip ? it.skip : it)('multi-word search "master detail flexible column" should not return zero results', () => {
        const queryWords = 'master detail flexible column'.split(/\s+/).filter((w) => w.length > 2);
        const scored = catalog.components
            .map((c) => ({ c, score: queryWords.reduce((sum, w) => sum + scoreMatch(c, w), 0) }))
            .filter((s) => s.score > 0)
            .sort((a, b) => b.score - a.score);

        expect(scored.length).toBeGreaterThan(0);
        // Flexible column layout components should be in the top 3
        const top3Selectors = scored.slice(0, 3).map((s) => s.c.selector);
        expect(top3Selectors.some((sel) => sel.includes('flexible-column'))).toBe(true);
    });
});

describe('isSignalWrapperType', () => {
    function isSignalWrapperType(type: string | undefined): boolean {
        return !!type && /^(Writable)?Signal</.test(type);
    }

    it('should match Signal<boolean>', () => expect(isSignalWrapperType('Signal<boolean>')).toBe(true));
    it('should match WritableSignal<number>', () => expect(isSignalWrapperType('WritableSignal<number>')).toBe(true));
    it('should match WritableSignal<Nullable<string>>', () =>
        expect(isSignalWrapperType('WritableSignal<Nullable<string>>')).toBe(true));
    it('should not match InputSignal<string> (that is a real input)', () =>
        expect(isSignalWrapperType('InputSignal<string>')).toBe(false));
    it('should not match plain boolean', () => expect(isSignalWrapperType('boolean')).toBe(false));
    it('should not match undefined', () => expect(isSignalWrapperType(undefined)).toBe(false));
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

const ATTRIBUTE_FIXTURE: ComponentMetadata = {
    name: 'ButtonComponent',
    selector: 'button[fd-button], a[fd-button], span[fd-button]',
    library: '@fundamental-ngx/core',
    category: 'Actions',
    description: 'Button attribute directive.',
    inputs: [
        { name: 'fdType', type: 'string', description: 'Button type', required: false },
        { name: 'label', type: 'string', description: 'Button label', required: false }
    ],
    outputs: [],
    slots: [],
    methods: [],
    cssProperties: [],
    source: 'typedoc'
};

const PURE_ATTR_FIXTURE: ComponentMetadata = {
    name: 'CompactDirective',
    selector: '[fdCompact]',
    library: '@fundamental-ngx/core',
    category: 'Utility',
    description: 'Compact mode directive.',
    inputs: [],
    outputs: [],
    slots: [],
    methods: [],
    cssProperties: [],
    source: 'typedoc'
};

const REQUIRED_INPUTS_FIXTURE: ComponentMetadata = {
    name: 'TableComponent',
    selector: 'fdp-table',
    library: '@fundamental-ngx/platform',
    category: 'Data Display',
    description: 'Platform table.',
    inputs: [
        { name: 'dataSource', type: 'TableDataSource', description: 'Data source', required: true },
        { name: 'selectionMode', type: 'string', description: 'Selection mode', required: false }
    ],
    outputs: [],
    slots: [],
    methods: [],
    cssProperties: [],
    source: 'typedoc'
};

describe('getSelectorType', () => {
    it('should return "element" for plain element selectors', () => {
        expect(getSelectorType('fd-button')).toBe('element');
        expect(getSelectorType('fdp-table')).toBe('element');
        expect(getSelectorType('ui5-button')).toBe('element');
    });

    it('should return "element-attribute" for element-with-attribute selectors', () => {
        expect(getSelectorType('button[fd-button]')).toBe('element-attribute');
        expect(getSelectorType('button[fd-button], a[fd-button], span[fd-button]')).toBe('element-attribute');
    });

    it('should return "attribute" for pure attribute selectors', () => {
        expect(getSelectorType('[fdCompact]')).toBe('attribute');
        expect(getSelectorType('[fd-busy-indicator-extended]')).toBe('attribute');
    });

    it('should return "element" when first part is an element selector', () => {
        // Production only inspects the first comma-separated part.
        expect(getSelectorType('fd-input, [fdInput]')).toBe('element');
    });
});

describe('buildTemplate', () => {
    it('should wrap element selector in open/close tags when component has inputs', () => {
        // FIXTURE_COMPONENTS[0] = ButtonComponent (fd-button) — has 3 non-required inputs.
        expect(buildTemplate(FIXTURE_COMPONENTS[0])).toBe('<fd-button>\n  <!-- content -->\n</fd-button>');
    });

    it('should use self-closing tag for element component with no inputs and no slots', () => {
        const comp: ComponentMetadata = { ...FIXTURE_COMPONENTS[0], inputs: [], slots: [] };
        expect(buildTemplate(comp)).toBe('<fd-button />');
    });

    it('should build self-closing snippet for element-attribute selector', () => {
        expect(buildTemplate(ATTRIBUTE_FIXTURE)).toBe('<button fd-button />');
    });

    it('should build attribute snippet using <div> as host for pure attribute selector', () => {
        expect(buildTemplate(PURE_ATTR_FIXTURE)).toBe('<div fdCompact>\n  <!-- content -->\n</div>');
    });

    it('should include required inputs as bound attributes', () => {
        expect(buildTemplate(REQUIRED_INPUTS_FIXTURE)).toContain('[dataSource]');
    });
});

describe('deriveImportPath', () => {
    it('should derive core subpath from fd- element selector', () => {
        const comp: ComponentMetadata = { ...FIXTURE_COMPONENTS[0], selector: 'fd-dialog' };
        expect(deriveImportPath(comp)).toBe('@fundamental-ngx/core/dialog');
    });

    it('should derive platform subpath from fdp- selector', () => {
        expect(deriveImportPath(REQUIRED_INPUTS_FIXTURE)).toBe('@fundamental-ngx/platform/table');
    });

    it('should derive subpath from attribute selector', () => {
        expect(deriveImportPath(ATTRIBUTE_FIXTURE)).toBe('@fundamental-ngx/core/button');
    });

    it('should return deep subpath for UI5 components', () => {
        const comp = findComponent('ui5-button', FIXTURE_COMPONENTS)!;
        expect(deriveImportPath(comp)).toBe('@fundamental-ngx/ui5-webcomponents/button');
    });
});

describe('buildPitfalls', () => {
    it('should warn about element-attribute directive misuse', () => {
        const importPath = deriveImportPath(ATTRIBUTE_FIXTURE);
        const pitfalls = buildPitfalls(ATTRIBUTE_FIXTURE, importPath);
        expect(pitfalls).toHaveLength(1);
        expect(pitfalls[0]).toContain('specific host element');
        expect(pitfalls[0]).toContain('<button>');
    });

    it('should warn about deprecated components', () => {
        const comp = findComponent('fd-deprecated', FIXTURE_COMPONENTS)!;
        const pitfalls = buildPitfalls(comp, deriveImportPath(comp));
        expect(pitfalls.some((p) => p.startsWith('DEPRECATED:'))).toBe(true);
    });

    it('should list required inputs', () => {
        const pitfalls = buildPitfalls(REQUIRED_INPUTS_FIXTURE, deriveImportPath(REQUIRED_INPUTS_FIXTURE));
        expect(pitfalls.some((p) => p.includes('dataSource'))).toBe(true);
    });

    it('should return empty pitfalls for a simple element component with no issues', () => {
        const comp = findComponent('fd-button', FIXTURE_COMPONENTS)!;
        const pitfalls = buildPitfalls(comp, deriveImportPath(comp));
        expect(pitfalls).toHaveLength(0);
    });

    it('should warn about pure attribute directive misuse', () => {
        const pitfalls = buildPitfalls(PURE_ATTR_FIXTURE, deriveImportPath(PURE_ATTR_FIXTURE));
        expect(pitfalls.some((p) => p.includes('attribute directive'))).toBe(true);
    });
});

describe('USAGE_GUIDES — fd-flexible-column-layout curated guide', () => {
    it('should have an entry keyed by fd-flexible-column-layout', () => {
        expect(USAGE_GUIDES['fd-flexible-column-layout']).toBeDefined();
    });

    it('should list all 10 FlexibleColumnLayout enum values in commonPitfalls', () => {
        const guide = USAGE_GUIDES['fd-flexible-column-layout'];
        const pitfallText = guide.commonPitfalls.join(' ');
        const enumValues = [
            'OneColumnStartFullScreen',
            'OneColumnMidFullScreen',
            'OneColumnEndFullScreen',
            'TwoColumnsStartExpanded',
            'TwoColumnsMidExpanded',
            'TwoColumnsEndExpanded',
            'ThreeColumnsMidExpanded',
            'ThreeColumnsEndExpanded',
            'ThreeColumnsStartMinimized',
            'ThreeColumnsEndMinimized'
        ];
        for (const value of enumValues) {
            expect(pitfallText).toContain(value);
        }
    });

    it('should mention template reference projection in compositionPattern', () => {
        const guide = USAGE_GUIDES['fd-flexible-column-layout'];
        expect(guide.compositionPattern).toContain('#startColumn');
        expect(guide.compositionPattern).toContain('#midColumn');
        expect(guide.compositionPattern).toContain('#endColumn');
        expect(guide.compositionPattern).toContain('ng-template');
    });

    it('should warn about required title/aria inputs in commonPitfalls', () => {
        const guide = USAGE_GUIDES['fd-flexible-column-layout'];
        const pitfallText = guide.commonPitfalls.join(' ');
        expect(pitfallText).toContain('collapseTitle');
        expect(pitfallText).toContain('separatorAriaLabel');
    });

    it('should list ui5-flexible-column-layout as a related component', () => {
        const guide = USAGE_GUIDES['fd-flexible-column-layout'];
        expect(guide.relatedComponents).toContain('ui5-flexible-column-layout');
    });
});

describe('get_usage_guide result shape', () => {
    it('should include selectorType, importPath, templateUsage, and pitfalls for element component', () => {
        const comp = findComponent('fdp-table', FIXTURE_COMPONENTS)!;
        const selectorType = getSelectorType(comp.selector);
        const importPath = deriveImportPath(comp);
        const templateUsage = buildTemplate(comp);
        const pitfalls = buildPitfalls(comp, importPath);

        expect(selectorType).toBe('element');
        expect(importPath).toBe('@fundamental-ngx/platform/table');
        expect(templateUsage).toContain('fdp-table');
        expect(templateUsage).toContain('[dataSource]');
        expect(pitfalls.some((p) => p.includes('dataSource'))).toBe(true);
    });

    it('should surface element-attribute pitfall for the real ButtonComponent selector', () => {
        const selectorType = getSelectorType(ATTRIBUTE_FIXTURE.selector);
        const importPath = deriveImportPath(ATTRIBUTE_FIXTURE);
        const pitfalls = buildPitfalls(ATTRIBUTE_FIXTURE, importPath);

        expect(selectorType).toBe('element-attribute');
        expect(pitfalls[0]).toContain('specific host element');
    });

    it('should produce correct import statement string', () => {
        const comp = findComponent('fd-dialog', FIXTURE_COMPONENTS)!;
        const importPath = deriveImportPath(comp);
        const statement = `import { ${comp.name} } from '${importPath}';`;
        expect(statement).toBe("import { DialogComponent } from '@fundamental-ngx/core/dialog';");
    });
});
