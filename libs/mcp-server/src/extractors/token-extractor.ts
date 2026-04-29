import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { DesignToken } from '../types/component-metadata';

/**
 * Extract design tokens from fundamental-styles utility CSS files
 * and SAP theming CSS custom properties.
 */
export async function extractDesignTokens(basePath: string): Promise<DesignToken[]> {
    const tokens: DesignToken[] = [];

    // Extract utility classes from fundamental-styles
    tokens.push(...(await extractUtilityClasses(basePath)));

    // Extract SAP theme CSS custom properties
    tokens.push(...getSapThemeTokens());

    return tokens;
}

/**
 * Parse utility class names and their CSS values from fundamental-styles dist files.
 */
async function extractUtilityClasses(basePath: string): Promise<DesignToken[]> {
    const tokens: DesignToken[] = [];

    const utilityFiles: Array<{ file: string; category: DesignToken['category'] }> = [
        { file: 'node_modules/fundamental-styles/dist/margins.css', category: 'spacing' },
        { file: 'node_modules/fundamental-styles/dist/paddings.css', category: 'spacing' }
    ];

    for (const { file, category } of utilityFiles) {
        try {
            const content = await readFile(resolve(basePath, file), 'utf-8');
            const classTokens = parseUtilityClassesFromCss(content, category);
            tokens.push(...classTokens);
        } catch {
            // File may not exist
        }
    }

    return tokens;
}

/**
 * Parse CSS class names from a minified/normal CSS file.
 * Matches patterns like: .fd-margin--tiny{margin-block:.5rem;...}
 */
function parseUtilityClassesFromCss(css: string, category: DesignToken['category']): DesignToken[] {
    const tokens: DesignToken[] = [];
    const classPattern = /\.(fd-[a-z0-9-]+)\{([^}]+)\}/g;

    let match;
    while ((match = classPattern.exec(css)) !== null) {
        const className = match[1];
        const properties = match[2];

        tokens.push({
            name: className,
            category,
            description: describeUtilityClass(className),
            value: cleanCssValue(properties),
            example: `<div class="${className}">...</div>`
        });
    }

    return tokens;
}

function describeUtilityClass(className: string): string {
    const parts = className.replace('fd-', '').split('--');
    const property = parts[0].split('-').join(' ');
    const size = parts[1] || '';

    const sizeMap: Record<string, string> = {
        tiny: '0.5rem',
        sm: '1rem',
        md: '2rem',
        lg: '3rem',
        none: '0'
    };

    const sizeDesc = sizeMap[size] ? ` (${sizeMap[size]})` : '';
    return `Applies ${property}${sizeDesc}`;
}

function cleanCssValue(raw: string): string {
    // Take only the first few property declarations, trim vendor prefixes
    return raw
        .split(';')
        .filter((p) => !p.includes('-webkit-'))
        .slice(0, 2)
        .join('; ')
        .trim();
}

/**
 * Common SAP theme CSS custom properties.
 * These are defined by @sap-theming/theming-base-content and available at runtime.
 */
function getSapThemeTokens(): DesignToken[] {
    return [
        // Colors
        {
            name: '--sapBackgroundColor',
            category: 'color',
            description: 'Base background color',
            example: 'background-color: var(--sapBackgroundColor)'
        },
        {
            name: '--sapBrandColor',
            category: 'color',
            description: 'Brand/accent color',
            example: 'color: var(--sapBrandColor)'
        },
        {
            name: '--sapTextColor',
            category: 'color',
            description: 'Default text color',
            example: 'color: var(--sapTextColor)'
        },
        {
            name: '--sapLinkColor',
            category: 'color',
            description: 'Link text color',
            example: 'color: var(--sapLinkColor)'
        },
        {
            name: '--sapShellColor',
            category: 'color',
            description: 'Shell/header background',
            example: 'background-color: var(--sapShellColor)'
        },
        {
            name: '--sapButton_Background',
            category: 'color',
            description: 'Default button background',
            example: 'background-color: var(--sapButton_Background)'
        },
        {
            name: '--sapButton_Emphasized_Background',
            category: 'color',
            description: 'Emphasized button background',
            example: 'background-color: var(--sapButton_Emphasized_Background)'
        },
        {
            name: '--sapPositiveColor',
            category: 'color',
            description: 'Positive/success semantic color',
            example: 'color: var(--sapPositiveColor)'
        },
        {
            name: '--sapNegativeColor',
            category: 'color',
            description: 'Negative/error semantic color',
            example: 'color: var(--sapNegativeColor)'
        },
        {
            name: '--sapCriticalColor',
            category: 'color',
            description: 'Critical/warning semantic color',
            example: 'color: var(--sapCriticalColor)'
        },
        {
            name: '--sapInformativeColor',
            category: 'color',
            description: 'Informative semantic color',
            example: 'color: var(--sapInformativeColor)'
        },
        {
            name: '--sapNeutralColor',
            category: 'color',
            description: 'Neutral semantic color',
            example: 'color: var(--sapNeutralColor)'
        },
        {
            name: '--sapField_Background',
            category: 'color',
            description: 'Form field background',
            example: 'background-color: var(--sapField_Background)'
        },
        {
            name: '--sapField_BorderColor',
            category: 'color',
            description: 'Form field border color',
            example: 'border-color: var(--sapField_BorderColor)'
        },
        {
            name: '--sapList_Background',
            category: 'color',
            description: 'List item background',
            example: 'background-color: var(--sapList_Background)'
        },
        {
            name: '--sapList_HeaderBackground',
            category: 'color',
            description: 'List header background',
            example: 'background-color: var(--sapList_HeaderBackground)'
        },
        {
            name: '--sapPageHeader_Background',
            category: 'color',
            description: 'Page header background',
            example: 'background-color: var(--sapPageHeader_Background)'
        },
        {
            name: '--sapObjectHeader_Background',
            category: 'color',
            description: 'Object header background',
            example: 'background-color: var(--sapObjectHeader_Background)'
        },
        {
            name: '--sapGroup_TitleBackground',
            category: 'color',
            description: 'Group title background',
            example: 'background-color: var(--sapGroup_TitleBackground)'
        },
        {
            name: '--sapTile_Background',
            category: 'color',
            description: 'Tile background',
            example: 'background-color: var(--sapTile_Background)'
        },
        {
            name: '--sapHighlightColor',
            category: 'color',
            description: 'Highlight/hover color',
            example: 'background-color: var(--sapHighlightColor)'
        },
        {
            name: '--sapSelectedColor',
            category: 'color',
            description: 'Selected item indicator color',
            example: 'border-color: var(--sapSelectedColor)'
        },
        {
            name: '--sapActiveColor',
            category: 'color',
            description: 'Active state color',
            example: 'color: var(--sapActiveColor)'
        },

        // Typography
        {
            name: '--sapFontFamily',
            category: 'typography',
            description: 'Default font family',
            example: 'font-family: var(--sapFontFamily)'
        },
        {
            name: '--sapFontSize',
            category: 'typography',
            description: 'Base font size (0.875rem)',
            example: 'font-size: var(--sapFontSize)'
        },
        {
            name: '--sapFontSmallSize',
            category: 'typography',
            description: 'Small font size (0.75rem)',
            example: 'font-size: var(--sapFontSmallSize)'
        },
        {
            name: '--sapFontLargeSize',
            category: 'typography',
            description: 'Large font size (1rem)',
            example: 'font-size: var(--sapFontLargeSize)'
        },
        {
            name: '--sapFontHeader1Size',
            category: 'typography',
            description: 'H1 font size (2.25rem)',
            example: 'font-size: var(--sapFontHeader1Size)'
        },
        {
            name: '--sapFontHeader2Size',
            category: 'typography',
            description: 'H2 font size (1.5rem)',
            example: 'font-size: var(--sapFontHeader2Size)'
        },
        {
            name: '--sapFontHeader3Size',
            category: 'typography',
            description: 'H3 font size (1.25rem)',
            example: 'font-size: var(--sapFontHeader3Size)'
        },
        {
            name: '--sapFontHeader4Size',
            category: 'typography',
            description: 'H4 font size (1.125rem)',
            example: 'font-size: var(--sapFontHeader4Size)'
        },
        {
            name: '--sapFontHeader5Size',
            category: 'typography',
            description: 'H5 font size (1rem)',
            example: 'font-size: var(--sapFontHeader5Size)'
        },

        // Spacing / Sizing
        {
            name: '--sapElement_Height',
            category: 'size',
            description: 'Default element height (2.75rem)',
            example: 'height: var(--sapElement_Height)'
        },
        {
            name: '--sapElement_Compact_Height',
            category: 'size',
            description: 'Compact element height (2rem)',
            example: 'height: var(--sapElement_Compact_Height)'
        },
        {
            name: '--sapContent_GridSize',
            category: 'size',
            description: 'Base grid size (1rem)',
            example: 'gap: var(--sapContent_GridSize)'
        },

        // Elevation / Shadows
        {
            name: '--sapContent_Shadow0',
            category: 'elevation',
            description: 'Level 0 shadow (none)',
            example: 'box-shadow: var(--sapContent_Shadow0)'
        },
        {
            name: '--sapContent_Shadow1',
            category: 'elevation',
            description: 'Level 1 shadow (cards)',
            example: 'box-shadow: var(--sapContent_Shadow1)'
        },
        {
            name: '--sapContent_Shadow2',
            category: 'elevation',
            description: 'Level 2 shadow (popovers)',
            example: 'box-shadow: var(--sapContent_Shadow2)'
        },
        {
            name: '--sapContent_Shadow3',
            category: 'elevation',
            description: 'Level 3 shadow (dialogs)',
            example: 'box-shadow: var(--sapContent_Shadow3)'
        },

        // Borders
        {
            name: '--sapField_BorderWidth',
            category: 'border',
            description: 'Field border width',
            example: 'border-width: var(--sapField_BorderWidth)'
        },
        {
            name: '--sapField_BorderCornerRadius',
            category: 'border',
            description: 'Field border radius',
            example: 'border-radius: var(--sapField_BorderCornerRadius)'
        },
        {
            name: '--sapButton_BorderCornerRadius',
            category: 'border',
            description: 'Button border radius',
            example: 'border-radius: var(--sapButton_BorderCornerRadius)'
        }
    ];
}
