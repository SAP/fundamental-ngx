import { ComponentMetadata } from '../types/component-metadata';
import { buildPitfalls, buildTemplate, deriveImportPath, getSelectorType } from './selector-utils';

const makeComp = (overrides: Partial<ComponentMetadata> = {}): ComponentMetadata => ({
    name: 'TestComponent',
    selector: 'fd-test',
    library: '@fundamental-ngx/core',
    category: 'test',
    description: 'test',
    inputs: [],
    outputs: [],
    slots: [],
    methods: [],
    cssProperties: [],
    source: 'typedoc',
    ...overrides
});

describe('getSelectorType', () => {
    it('should return "element" for plain element selectors', () => {
        expect(getSelectorType('fd-card')).toBe('element');
        expect(getSelectorType('fdp-table')).toBe('element');
        expect(getSelectorType('ui5-button')).toBe('element');
    });

    it('should return "attribute" for pure bracket selectors', () => {
        expect(getSelectorType('[fd-title]')).toBe('attribute');
        expect(getSelectorType('[fdOverflowLayout]')).toBe('attribute');
    });

    it('should return "element-attribute" for element+attribute selectors', () => {
        expect(getSelectorType('button[fd-button]')).toBe('element-attribute');
        expect(getSelectorType('input[fd-form-control]')).toBe('element-attribute');
    });
});

describe('buildTemplate', () => {
    it('should build element template', () => {
        const comp = makeComp({ selector: 'fd-card', slots: [{ name: 'default', description: '' }] });
        expect(buildTemplate(comp)).toBe('<fd-card>\n  <!-- content -->\n</fd-card>');
    });

    it('should build attribute template for pure attribute selector', () => {
        const comp = makeComp({ selector: '[fd-title]' });
        expect(buildTemplate(comp)).toBe('<div fd-title>\n  <!-- content -->\n</div>');
    });

    it('should build element-attribute template', () => {
        const comp = makeComp({ selector: 'input[fd-form-control]' });
        expect(buildTemplate(comp)).toBe('<input fd-form-control />');
    });
});

describe('deriveImportPath', () => {
    it('should derive core subpath from fd- selector', () => {
        expect(deriveImportPath(makeComp({ selector: 'fd-button', library: '@fundamental-ngx/core' }))).toBe(
            '@fundamental-ngx/core/button'
        );
    });

    it('should derive platform subpath from fdp- selector', () => {
        expect(deriveImportPath(makeComp({ selector: 'fdp-table', library: '@fundamental-ngx/platform' }))).toBe(
            '@fundamental-ngx/platform/table'
        );
    });

    it('should apply SUBPATH_OVERRIDES for form sub-components', () => {
        expect(deriveImportPath(makeComp({ selector: 'fd-form-item', library: '@fundamental-ngx/core' }))).toBe(
            '@fundamental-ngx/core/form'
        );
    });

    it('should derive subpath from attribute selector', () => {
        expect(
            deriveImportPath(
                makeComp({ selector: 'button[fd-button], a[fd-button]', library: '@fundamental-ngx/core' })
            )
        ).toBe('@fundamental-ngx/core/button');
    });
});

describe('buildPitfalls', () => {
    it('should warn about deprecated components', () => {
        const comp = makeComp({ deprecated: 'Use fd-new instead.' });
        const pitfalls = buildPitfalls(comp, '@fundamental-ngx/core/test');
        expect(pitfalls[0]).toContain('DEPRECATED');
    });

    it('should warn about required inputs with no default', () => {
        const comp = makeComp({
            inputs: [{ name: 'dataSource', type: 'DS', description: '', required: true }]
        });
        const pitfalls = buildPitfalls(comp, '@fundamental-ngx/core/test');
        expect(pitfalls.some((p) => p.includes('dataSource'))).toBe(true);
    });

    it('should warn when import path falls back to library root', () => {
        const comp = makeComp({ selector: 'fd-test', library: '@fundamental-ngx/core' });
        const pitfalls = buildPitfalls(comp, '@fundamental-ngx/core');
        expect(pitfalls.some((p) => p.includes('library root'))).toBe(true);
    });

    it('should return empty for a simple element component with no issues', () => {
        const comp = makeComp({ selector: 'fd-button' });
        expect(buildPitfalls(comp, '@fundamental-ngx/core/button')).toHaveLength(0);
    });
});
