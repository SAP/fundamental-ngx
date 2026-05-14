import { ComponentMetadata } from '../types/component-metadata';

// ---------------------------------------------------------------------------
// Subpath consolidation: selectors that don't map 1:1 to package export entries
// ---------------------------------------------------------------------------
export const SUBPATH_OVERRIDES: Record<string, string> = {
    // Core — all form sub-components live under a single ./form entry point
    '@fundamental-ngx/core/form-group': 'form',
    '@fundamental-ngx/core/form-item': 'form',
    '@fundamental-ngx/core/form-label': 'form',
    '@fundamental-ngx/core/form-control': 'form',
    '@fundamental-ngx/core/form-header': 'form',
    '@fundamental-ngx/core/form-legend': 'form',
    // Core — selector is fd-side-nav but export entry is ./side-navigation
    '@fundamental-ngx/core/side-nav': 'side-navigation',
    // Core — nested-list sub-parts share the ./nested-list entry point
    '@fundamental-ngx/core/nested-list-item': 'nested-list',
    '@fundamental-ngx/core/nested-list-title': 'nested-list',
    '@fundamental-ngx/core/nested-list-message': 'nested-list',
    // Platform — form sub-components share ./form
    '@fundamental-ngx/platform/form-group': 'form',
    '@fundamental-ngx/platform/form-field': 'form',
    '@fundamental-ngx/platform/form-generator': 'form'
};

/**
 * Returns true when the type is trivially optional and should not be flagged as a
 * "crash-if-omitted" required input:
 *   - boolean  — Angular treats missing booleans as false; no runtime crash
 *   - union with undefined — explicitly nullable/optional by the type author
 */
function isTriviallyOptionalType(type: string | undefined): boolean {
    if (!type) {
        return false;
    }
    return type.includes('boolean') || type.includes('undefined');
}

/** Return whether a selector is an element, attribute, or element+attribute selector. */
export function getSelectorType(selector: string): 'element' | 'attribute' | 'element-attribute' {
    const first = selector.split(',')[0].trim();
    if (/^\[/.test(first)) {
        return 'attribute';
    }
    if (/\[/.test(first)) {
        return 'element-attribute';
    }
    return 'element';
}

/** Build a minimal template usage snippet from catalog metadata. */
export function buildTemplate(component: ComponentMetadata): string {
    const type = getSelectorType(component.selector);
    const first = component.selector.split(',')[0].trim();

    if (type === 'attribute') {
        // [fd-form-item] → <div fd-form-item></div>
        const attr = first.replace(/^\[([^\]]+)\].*/, '$1');
        return `<div ${attr}>\n  <!-- content -->\n</div>`;
    }

    if (type === 'element-attribute') {
        // input[fd-form-control] → <input fd-form-control />
        const elementMatch = first.match(/^([a-z-]+)\[([^\]]+)\]/);
        if (elementMatch) {
            return `<${elementMatch[1]} ${elementMatch[2]} />`;
        }
    }

    // Plain element selector
    const tag = first;
    const required = component.inputs.filter((i) => i.required && !i.defaultValue && !isTriviallyOptionalType(i.type));
    const attrs = required
        .slice(0, 3)
        .map((i) => `[${i.name}]="/* ${i.type} */"`)
        .join(' ');
    const attrsStr = attrs ? ` ${attrs}` : '';
    if (component.slots.length > 0 || component.inputs.length > 0) {
        return `<${tag}${attrsStr}>\n  <!-- content -->\n</${tag}>`;
    }
    return `<${tag}${attrsStr} />`;
}

/** Derive the npm deep-import subpath for a component. */
export function deriveImportPath(component: ComponentMetadata): string {
    const { library, selector } = component;
    const firstSelector = selector.split(',')[0].trim();
    // Strip brackets for attribute directives: [fd-form-item] → fd-form-item
    // Also handles element+attribute: input[fd-form-control] → fd-form-control
    const cleaned = firstSelector
        .replace(/^[^[]*\[([^\]]+)\].*/, '$1')
        .replace(/^\[([^\]]+)\].*/, '$1')
        .trim();
    const elementMatch = cleaned.match(/^(fd|fdp|fdb|cx|fdk|ui5)-(.+)/);
    if (!elementMatch) {
        return library;
    }
    const rawSubpath = elementMatch[2].toLowerCase();
    const overrideKey = `${library}/${rawSubpath}`;
    const subpath = SUBPATH_OVERRIDES[overrideKey] ?? rawSubpath;
    return `${library}/${subpath}`;
}

/** Build a list of pitfalls and usage warnings for a component. */
export function buildPitfalls(component: ComponentMetadata, importPath: string): string[] {
    const pitfalls: string[] = [];

    if (component.deprecated) {
        pitfalls.push(`DEPRECATED: ${component.deprecated}`);
    }

    const type = getSelectorType(component.selector);
    if (type === 'attribute') {
        pitfalls.push(
            `This is an attribute directive — apply it as an attribute on an HTML element, not as a custom element tag. ` +
                `Correct: <div ${component.selector
                    .split(',')[0]
                    .trim()
                    .replace(/^\[([^\]]+)\].*/, '$1')}>. ` +
                `Wrong: <${component.selector
                    .split(',')[0]
                    .trim()
                    .replace(/^\[([^\]]+)\].*/, '$1')}>.`
        );
    }

    if (type === 'element-attribute') {
        const m = component.selector
            .split(',')[0]
            .trim()
            .match(/^([a-z-]+)\[([^\]]+)\]/);
        if (m) {
            pitfalls.push(
                `This directive applies to a specific host element. Use it as an attribute on <${m[1]}>, not as a standalone tag.`
            );
        }
    }

    const requiredInputs = component.inputs.filter(
        (i) => i.required && !i.defaultValue && !isTriviallyOptionalType(i.type)
    );
    if (requiredInputs.length > 0) {
        pitfalls.push(
            `Required inputs with no default: ${requiredInputs.map((i) => i.name).join(', ')}. Omitting these will cause runtime errors.`
        );
    }

    if (importPath === component.library) {
        pitfalls.push(
            `Could not derive a specific sub-entry point. Import from the library root: "${component.library}".`
        );
    }

    return pitfalls;
}
