export interface UsageGuideDecisionOption {
    answer: string;
    recommendation: string;
    example: string;
}

export interface UsageGuideDecisionNode {
    question: string;
    options: UsageGuideDecisionOption[];
}

export interface UsageGuideKnownIssue {
    symptom: string;
    cause: string;
    fix: string;
}

export interface UsageGuide {
    component: string;
    summary: string;
    decisionTree: UsageGuideDecisionNode[];
    commonPitfalls: string[];
    compositionPattern: string;
    relatedComponents: string[];
    /** Ordered list of CSS files that must be loaded for this component/setup to work. */
    requiredStyles?: string[];
    /** Known issues with symptoms, causes, and fixes. */
    knownIssues?: UsageGuideKnownIssue[];
    resources?: string[];
}

const _setupGuide: UsageGuide = {
    component: 'setup',
    summary:
        '@fundamental-ngx/core uses DYNAMIC theming via ThemingService — theme CSS files are served as assets ' +
        'and loaded at runtime, NOT as static entries in angular.json styles. ' +
        'Run "ng add @fundamental-ngx/core" to configure everything automatically. ' +
        'The schematic adds: (1) fundamental-ngx-core.css to angular.json styles, ' +
        '(2) @sap-theming and fundamental-styles theming files to angular.json assets, ' +
        '(3) provideTheming() and themingInitializer() to app.config.ts.',
    requiredStyles: ['./node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css'],
    decisionTree: [
        {
            question: 'How do you want to set up @fundamental-ngx/core?',
            options: [
                {
                    answer: 'Automatic setup (recommended)',
                    recommendation:
                        'Run "ng add @fundamental-ngx/core". The schematic writes all required angular.json ' +
                        'entries and wires up ThemingService in app.config.ts automatically.',
                    example: `ng add @fundamental-ngx/core`
                },
                {
                    answer: 'Static CSS — demos, prototypes, no ThemingService needed',
                    recommendation:
                        'Install @sap-theming/theming-base-content, then add three CSS files to angular.json ' +
                        'styles in the exact order shown. No providers needed. ' +
                        'The three-layer token chain is: (1) @sap-theming css_variables.css defines --sap* tokens, ' +
                        '(2) fundamental-styles theming file maps --fd* to --sap*, ' +
                        '(3) fundamental-styles.css uses --fd* tokens for component styles.',
                    example: `// Install:
npm install @sap-theming/theming-base-content

// angular.json build.options.styles (order is critical):
"node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css",
"node_modules/fundamental-styles/dist/theming/sap_horizon.css",
"node_modules/fundamental-styles/dist/fundamental-styles.css",
"src/styles.css"

// No app.config.ts changes needed.`
                },
                {
                    answer: 'Manual dynamic — production app with runtime theme switching',
                    recommendation:
                        'Add one static style, two asset groups, and two providers. ' +
                        'Theme CSS files are loaded at runtime by ThemingService from the assets folder — ' +
                        'do NOT add them to angular.json styles in this setup.',
                    example: `// angular.json build.options.styles:
"./node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css"

// angular.json build.options.assets:
{ "glob": "**/css_variables.css", "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/", "output": "./assets/theming-base/" },
{ "glob": "**/*", "input": "./node_modules/fundamental-styles/dist/theming/", "output": "./assets/fundamental-styles-theming/" }

// app.config.ts providers:
provideTheming({ defaultTheme: 'sap_horizon' }),
themingInitializer()`
                }
            ]
        },
        {
            question: 'Which defaultTheme should you pass to provideTheming()?',
            options: [
                {
                    answer: 'Standard light theme (recommended default)',
                    recommendation: "Pass defaultTheme: 'sap_horizon'.",
                    example: `provideTheming({ defaultTheme: 'sap_horizon' })`
                },
                {
                    answer: 'Dark theme',
                    recommendation: "Pass defaultTheme: 'sap_horizon_dark'.",
                    example: `provideTheming({ defaultTheme: 'sap_horizon_dark' })`
                },
                {
                    answer: 'High contrast for accessibility',
                    recommendation: "Pass defaultTheme: 'sap_horizon_hcb' (black) or 'sap_horizon_hcw' (white).",
                    example: `provideTheming({ defaultTheme: 'sap_horizon_hcb' })`
                }
            ]
        },
        {
            question: 'Do you need runtime theme switching?',
            options: [
                {
                    answer: 'Yes — let users switch themes at runtime',
                    recommendation:
                        'ThemingService handles this automatically. Optionally add changeThemeOnQueryParamChange: true to provideTheming() to also switch via the ?theme= query param.',
                    example: `provideTheming({ defaultTheme: 'sap_horizon', changeThemeOnQueryParamChange: true })`
                },
                {
                    answer: 'No — single fixed theme',
                    recommendation:
                        'Pass only defaultTheme to provideTheming(). ThemingService will load that theme on startup and never switch.',
                    example: `provideTheming({ defaultTheme: 'sap_horizon' })`
                }
            ]
        }
    ],
    commonPitfalls: [
        'When using ThemingService (dynamic setup via ng add or manual dynamic), do NOT add theme CSS files to angular.json styles — they are served as assets and loaded at runtime. When using static CSS setup (no ThemingService), you MUST add all three files in the correct order: (1) @sap-theming css_variables.css, (2) fundamental-styles theming file, (3) fundamental-styles.css.',
        '@sap-theming/theming-base-content must be explicitly installed (npm install @sap-theming/theming-base-content). It is a peer dependency and is NOT automatically installed with @fundamental-ngx/core.',
        'The two theming CSS files have different roles: fundamental-styles/dist/theming/sap_horizon.css defines only BTP palette alias variables (--btp-Blue1, etc.) but NOT the semantic SAP tokens. The semantic tokens (--sapShellColor, --sapFontFamily, --sapTextColor, etc.) and SAP icon @font-face declarations all come from @sap-theming/theming-base-content css_variables.css. Without css_variables.css, components render with wrong colours and icons appear as empty squares.',
        'Load order matters for static CSS setup: css_variables.css MUST come first. If fundamental-styles is parsed before css_variables.css, all --sap* tokens resolve to initial and components render unstyled.',
        'Icons render as empty squares even when styles are otherwise correct: the SAP icon font (@font-face declarations for SAP-icons) is defined in css_variables.css from @sap-theming/theming-base-content — NOT in fundamental-styles or the theme CSS file. The font will only load if css_variables.css is included. In Vite/non-Angular projects, use @import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css" as the very first import in your CSS entry point.',
        'In the sap_horizon (light) theme, --sapShellColor resolves to #fff (white). Using it directly as a header background makes the shell bar invisible. Use fd-shellbar (from @fundamental-ngx/core/shellbar) instead — it applies its own background through fundamental-styles classes rather than relying on --sapShellColor.',
        'When using @fundamental-ngx/platform, the initial bundle can reach 4–5 MB. Raise angular.json production budgets: maximumWarning: "2MB", maximumError: "5MB".',
        'themingInitializer() must be present alongside provideTheming() in the dynamic setup. Omitting it means the theme is never applied on startup.',
        'Available theme IDs: sap_horizon, sap_horizon_dark, sap_horizon_hcb, sap_horizon_hcw.',
        'After ng add, verify angular.json has both the styles entry (fundamental-ngx-core.css) and the assets entries (@sap-theming and fundamental-styles-theming). If either is missing, run the schematic again or add them manually.'
    ],
    compositionPattern: `// ── Static CSS setup (demos/prototypes — no ThemingService) ──────────────
// angular.json build.options.styles (order is critical):
{
    "styles": [
        "node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css",
        "node_modules/fundamental-styles/dist/theming/sap_horizon.css",
        "node_modules/fundamental-styles/dist/fundamental-styles.css",
        "src/styles.css"
    ]
}
// No app.config.ts providers needed for static setup.

// ── Dynamic setup (production — ThemingService manages runtime switching) ──
// app.config.ts:
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';
export const appConfig: ApplicationConfig = {
    providers: [
        provideTheming({ defaultTheme: 'sap_horizon' }),
        themingInitializer()
    ]
};
// angular.json (added by ng add):
{
    "styles": ["./node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css", "src/styles.css"],
    "assets": [
        { "glob": "**/css_variables.css", "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/", "output": "./assets/theming-base/" },
        { "glob": "**/*", "input": "./node_modules/fundamental-styles/dist/theming/", "output": "./assets/fundamental-styles-theming/" }
    ]
}`,
    knownIssues: [
        {
            symptom: 'CSS variables resolve to empty strings in a sandboxed browser (Playwright, strict CSP)',
            cause: 'CSS was loaded via CDN URLs (unpkg.com, jsdelivr.net). These external requests are blocked in sandboxed Playwright browsers and in apps with a strict Content-Security-Policy. The browser fetches nothing, so --sap* tokens are all undefined and components render unstyled.',
            fix: 'Install packages locally (npm install @sap-theming/theming-base-content fundamental-styles @fundamental-ngx/core) and serve CSS from node_modules or a local dist directory. Do not rely on CDN URLs for automated testing or CSP-restricted environments.'
        },
        {
            symptom: '@font-face src paths resolve to 404 when css_variables.css is copied to a flat directory',
            cause: 'css_variables.css uses relative @font-face src paths such as url(../sap_horizon/fonts/SAP-icons.woff2). These paths assume the file lives inside the @sap-theming package directory structure. Moving css_variables.css to a flat css/ folder breaks the relative paths.',
            fix: 'Either (a) reproduce the expected directory layout — place css_variables.css at css/sap_horizon/css_variables.css and copy the fonts to css/sap_horizon/fonts/ and css/baseTheme/fonts/ — or (b) create a wrapper CSS file with corrected absolute/relative paths pointing to the font files in their actual location.'
        },
        {
            symptom: 'Icons render as empty squares (no glyph, just blank box)',
            cause: 'The SAP icon font (@font-face declarations for SAP-icons) is defined in css_variables.css from @sap-theming/theming-base-content. It is NOT included in fundamental-styles or the theme CSS. If css_variables.css is missing or not loaded first, the browser cannot find the font file and renders empty boxes.',
            fix: 'Ensure @sap-theming/theming-base-content is installed (npm install @sap-theming/theming-base-content) and that css_variables.css is loaded BEFORE any fundamental-styles CSS. Angular: add it as the first entry in angular.json styles. Vite/plain CSS: add @import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css" as the first line of your CSS entry point.'
        },
        {
            symptom: 'All --sap* CSS custom properties are undefined after ng add',
            cause: 'The ng add schematic failed mid-run (e.g. the bundle-budget update step threw an error), causing the whole tree to be rolled back. Styles and assets were not written to angular.json.',
            fix: 'Run "ng add @fundamental-ngx/core" again, or manually add the styles and assets entries shown in the compositionPattern above, and add provideTheming() + themingInitializer() to app.config.ts.'
        },
        {
            symptom: 'App renders with no colors, spacing, or typography after manual static CSS setup',
            cause: '@sap-theming/theming-base-content is not installed, or its css_variables.css is not the first entry in angular.json styles. The --sap* design tokens are undefined, so all component styles resolve to initial.',
            fix: 'Run: npm install @sap-theming/theming-base-content. Then add css_variables.css as the FIRST entry in angular.json styles, followed by fundamental-styles/dist/theming/<theme>.css, then fundamental-styles/dist/fundamental-styles.css.'
        },
        {
            symptom: 'Theme loads on first paint but flashes unstyled briefly',
            cause: 'ThemingService loads theme CSS asynchronously. The flash occurs before the dynamically injected <link> tag resolves.',
            fix: 'This is expected behavior with dynamic theming. For SSR or critical rendering, consider preloading the theme CSS file manually in index.html with <link rel="preload">.'
        }
    ],
    relatedComponents: [],
    resources: [
        'Theming guide: https://sap.github.io/fundamental-ngx/#/core/theming',
        'Get available themes with the fundamental-styles MCP tool: get_theme_info'
    ]
};

export const USAGE_GUIDES: Record<string, UsageGuide> = {
    setup: _setupGuide,
    installation: _setupGuide,

    ui5: {
        component: 'ui5-webcomponents',
        summary:
            'Angular wrappers for UI5 Web Components, published under @fundamental-ngx/ui5-webcomponents. ' +
            'The older @ui5/webcomponents-ngx package is deprecated and incompatible with Angular 20+. ' +
            'Always use @fundamental-ngx/ui5-webcomponents which supports Angular 21 natively.',
        decisionTree: [
            {
                question: 'Which UI5 package should I install?',
                options: [
                    {
                        answer: '@fundamental-ngx/ui5-webcomponents (correct)',
                        recommendation:
                            'Install @fundamental-ngx/ui5-webcomponents@^<same version as @fundamental-ngx/core>. ' +
                            'Also install the required peer dependencies: ' +
                            'npm install @fundamental-ngx/ui5-webcomponents @fundamental-ngx/cdk @fundamental-ngx/core',
                        example: `npm install @fundamental-ngx/ui5-webcomponents @fundamental-ngx/cdk @fundamental-ngx/core`
                    },
                    {
                        answer: '@ui5/webcomponents-ngx (deprecated — do not use)',
                        recommendation:
                            'This package is deprecated and declares peerDependencies on @angular/core ^20 — it is ' +
                            'incompatible with Angular 21. Migrate to @fundamental-ngx/ui5-webcomponents.',
                        example: ''
                    }
                ]
            }
        ],
        commonPitfalls: [
            '@ui5/webcomponents-ngx is deprecated. The successor is @fundamental-ngx/ui5-webcomponents from this monorepo. Using the old package with --legacy-peer-deps on Angular 21 may appear to install but will cause build or runtime errors.',
            '@fundamental-ngx/cdk is a required peer dependency that npm does not always install automatically. If you see "Could not resolve @fundamental-ngx/cdk/utils" or similar import errors, install it explicitly: npm install @fundamental-ngx/cdk',
            'UI5 component import paths follow the pattern @fundamental-ngx/ui5-webcomponents/<component-name>. Example: import { Ui5ButtonComponent } from "@fundamental-ngx/ui5-webcomponents/button".',
            'All three @fundamental-ngx packages (core, cdk, ui5-webcomponents) must be the same semver minor version. Mixing 0.61.x with 0.62.x will cause peer-dep conflicts.',
            'fundamental-styles.css is a monolithic stylesheet (~1.9 MB uncompressed). Raise angular.json production budgets: maximumWarning: "3MB", maximumError: "5MB".'
        ],
        compositionPattern: `// Install all required packages:
npm install @fundamental-ngx/ui5-webcomponents @fundamental-ngx/cdk @fundamental-ngx/core
npm install @sap-theming/theming-base-content  // peer dep, not auto-installed

// angular.json budgets (styles push past the default 1 MB limit):
"budgets": [
  { "type": "initial", "maximumWarning": "3MB", "maximumError": "5MB" }
]

// Import a UI5 component in an Angular standalone component:
import { Ui5ButtonComponent } from '@fundamental-ngx/ui5-webcomponents/button';
import { Ui5InputComponent } from '@fundamental-ngx/ui5-webcomponents/input';

@Component({
    imports: [Ui5ButtonComponent, Ui5InputComponent],
    template: \`
        <ui5-button design="Emphasized">Click me</ui5-button>
        <ui5-input placeholder="Enter text"></ui5-input>
    \`
})
export class MyComponent {}`,
        relatedComponents: ['fd-shellbar', 'ui5-button', 'ui5-input', 'ui5-dialog', 'ui5-table']
    },

    // alias
    get 'ui5-webcomponents'() {
        return this['ui5'];
    },

    dialog: {
        component: 'dialog',
        summary:
            'Fundamental NGX provides three dialog API surfaces: template-based, component-based, and object-based. All are opened via DialogService.',
        decisionTree: [
            {
                question: 'What kind of dialog do you need?',
                options: [
                    {
                        answer: 'Simple confirmation or message',
                        recommendation:
                            'Use DialogDefaultContent with DialogService.open(). Minimal setup, no separate template or component needed.',
                        example: `const ref = this._dialogService.open(DialogDefaultContent, {
  data: {
    title: 'Confirm',
    content: 'Are you sure?',
    approveButton: 'Yes',
    approveButtonCallback: () => ref.close('confirmed')
  }
});`
                    },
                    {
                        answer: 'Custom layout with form fields or complex content',
                        recommendation:
                            'Use a template reference with DialogService.open(templateRef). Define your layout in an ng-template with fdDialogTemplate directive.',
                        example: `<!-- In template -->
<ng-template #dialogTemplate let-dialogRef>
  <fd-dialog-header>
    <h2 fd-title>Edit User</h2>
  </fd-dialog-header>
  <fd-dialog-body>
    <fd-form-group>...</fd-form-group>
  </fd-dialog-body>
  <fd-dialog-footer>
    <fd-button (click)="dialogRef.close('save')">Save</fd-button>
  </fd-dialog-footer>
</ng-template>

// In component class
this._dialogService.open(this.dialogTemplate, { width: '500px' });`
                    },
                    {
                        answer: 'Reusable dialog with its own logic and state',
                        recommendation:
                            'Create a standalone component and open it via DialogService.open(ComponentRef). The component receives DialogRef via injection.',
                        example: `// my-dialog.component.ts
@Component({ ... })
export class MyDialogComponent {
  private readonly _dialogRef = inject(DialogRef);

  save(): void {
    this._dialogRef.close(this.form.value);
  }
}

// Parent component
this._dialogService.open(MyDialogComponent, {
  data: { userId: 123 },
  width: '600px'
});`
                    }
                ]
            },
            {
                question: 'Which dialog component should you use?',
                options: [
                    {
                        answer: 'Standard dialog with full customization',
                        recommendation:
                            'Use fd-dialog (from @fundamental-ngx/core). Supports draggable, resizable, custom sizing.',
                        example: '<fd-dialog> with <fd-dialog-header>, <fd-dialog-body>, <fd-dialog-footer>'
                    },
                    {
                        answer: 'UI5 Web Components-based dialog',
                        recommendation:
                            'Use ui5-dialog (from @fundamental-ngx/ui5-webcomponents). Lighter weight, follows SAP Fiori design guidelines natively.',
                        example: '<ui5-dialog> with header-text input and default slot for content'
                    },
                    {
                        answer: 'Pre-built message/alert dialog',
                        recommendation:
                            'Use fd-message-box (from @fundamental-ngx/core). Built-in icons, semantic types (error, warning, success, information).',
                        example:
                            'this._messageBoxService.open(MessageBoxComponent, { type: "error", title: "Error", message: "Something went wrong" })'
                    }
                ]
            }
        ],
        commonPitfalls: [
            'TypeError: Cannot read properties of null — occurs when using the wrong dialog API surface. DialogDefaultContent expects data.content to be a string or TemplateRef, not a component reference.',
            'Dialog body not scrollable — wrap body content in <fd-dialog-body> which handles overflow automatically.',
            'Focus not trapped inside dialog — ensure focusTrapped: true in DialogConfig (default is true).',
            'Dialog not closing on Escape — check that escKeyClosable is not set to false in config.',
            'ARIA warnings — always provide ariaLabelledBy pointing to the dialog title element ID.',
            'Dialog footer buttons must use <fd-button-bar> (from @fundamental-ngx/core/bar), NOT <button fd-button>. fd-button-bar is a standalone component that wraps a button with the fd-bar__element host class and correct dialog padding. Import ButtonBarComponent, not ButtonComponent, in the dialog component.'
        ],
        compositionPattern: `<fd-dialog>
  <fd-dialog-header>
    <h2 fd-title id="dialog-title">Dialog Title</h2>
  </fd-dialog-header>
  <fd-dialog-body>
    <!-- Your content here -->
  </fd-dialog-body>
  <fd-dialog-footer>
    <fd-bar barDesign="footer">
      <fd-button-bar fdType="emphasized" label="Save" (click)="close()"></fd-button-bar>
      <fd-button-bar fdType="transparent" label="Cancel" (click)="dismiss()"></fd-button-bar>
    </fd-bar>
  </fd-dialog-footer>
</fd-dialog>`,
        relatedComponents: [
            'fd-dialog-header',
            'fd-dialog-body',
            'fd-dialog-footer',
            'fd-bar',
            'fd-button-bar',
            'fd-message-box',
            'ui5-dialog'
        ]
    },

    table: {
        component: 'table',
        summary:
            'Three table implementations: fd-table (core, lightweight), fdp-table (platform, feature-rich), and ui5-table (UI5 Web Components).',
        decisionTree: [
            {
                question: 'What table features do you need?',
                options: [
                    {
                        answer: 'Simple data display with manual column definition',
                        recommendation:
                            'Use fd-table (from @fundamental-ngx/core). Direct HTML table markup with fd-table directives.',
                        example: `<table fd-table>
  <thead fd-table-header>
    <tr fd-table-row>
      <th fd-table-cell>Name</th>
      <th fd-table-cell>Status</th>
    </tr>
  </thead>
  <tbody>
    @for (item of items(); track item.id) {
      <tr fd-table-row>
        <td fd-table-cell>{{ item.name }}</td>
        <td fd-table-cell>{{ item.status }}</td>
      </tr>
    }
  </tbody>
</table>`
                    },
                    {
                        answer: 'Sorting, filtering, grouping, pagination out of the box',
                        recommendation:
                            'Use fdp-table (from @fundamental-ngx/platform). Declarative configuration with built-in data source.',
                        example: `<fdp-table [dataSource]="dataSource" [columns]="columns">
  <fdp-column key="name" label="Name"></fdp-column>
  <fdp-column key="status" label="Status"></fdp-column>
</fdp-table>`
                    },
                    {
                        answer: 'SAP Fiori design system compliance',
                        recommendation:
                            'Use ui5-table (from @fundamental-ngx/ui5-webcomponents). Web component-based, automatic Fiori styling.',
                        example: `<ui5-table>
  <ui5-table-header-row slot="headerRow">
    <ui5-table-header-cell>Name</ui5-table-header-cell>
  </ui5-table-header-row>
  <ui5-table-row>
    <ui5-table-cell>John Doe</ui5-table-cell>
  </ui5-table-row>
</ui5-table>`
                    }
                ]
            }
        ],
        commonPitfalls: [
            'fd-table requires manual sort/filter implementation — use fdp-table if you need those features built-in.',
            'fdp-table dataSource must implement the DataSource interface from @fundamental-ngx/cdk.',
            '@for loops in fd-table require a track expression (e.g., track item.id).'
        ],
        compositionPattern: `<table fd-table>
  <thead fd-table-header>
    <tr fd-table-row>
      <th fd-table-cell>Column</th>
    </tr>
  </thead>
  <tbody>
    <tr fd-table-row>
      <td fd-table-cell>Data</td>
    </tr>
  </tbody>
</table>`,
        relatedComponents: [
            'fd-table-header',
            'fd-table-row',
            'fd-table-cell',
            'fdp-table',
            'ui5-table',
            'fd-pagination'
        ]
    },

    button: {
        component: 'button',
        summary:
            'fd-button is an attribute directive applied to native <button> or <a> elements. It is NOT an element selector.',
        decisionTree: [
            {
                question: 'What kind of button do you need?',
                options: [
                    {
                        answer: 'Standard action button',
                        recommendation:
                            'Use fd-button as an attribute on <button>. Key inputs: fdType (standard, positive, negative, attention, ghost, transparent), label.',
                        example:
                            '<button fd-button fdType="emphasized" label="Submit"></button>\n<button fd-button fdType="transparent" label="Cancel"></button>'
                    },
                    {
                        answer: 'Button with primary + dropdown actions',
                        recommendation:
                            'Use fd-split-button. Combines a main button with a dropdown menu for secondary actions.',
                        example:
                            '<fd-split-button label="Save" (primaryButtonClick)="save()">\n  <fd-menu>\n    <fd-menu-item text="Save as Draft"></fd-menu-item>\n  </fd-menu>\n</fd-split-button>'
                    },
                    {
                        answer: 'Toggle between multiple options',
                        recommendation:
                            'Use fd-segmented-button. A group of buttons where one (or more) can be selected.',
                        example:
                            '<fd-segmented-button>\n  <button fd-button label="List" [toggled]="view() === \'list\'" (click)="setView(\'list\')"></button>\n  <button fd-button label="Grid" [toggled]="view() === \'grid\'" (click)="setView(\'grid\')"></button>\n</fd-segmented-button>'
                    }
                ]
            }
        ],
        commonPitfalls: [
            'DO NOT use <fd-button> as an element — fd-button is an ATTRIBUTE directive. Correct: <button fd-button>, incorrect: <fd-button>.',
            'For links that look like buttons, use <a fd-button> instead of <button fd-button>.',
            'The label input sets the button text. You can also use content projection: <button fd-button>Click me</button>.'
        ],
        compositionPattern:
            '<button fd-button fdType="emphasized" label="Primary Action"></button>\n<button fd-button fdType="transparent" label="Secondary Action"></button>',
        relatedComponents: ['fd-split-button', 'fd-segmented-button', 'fd-toolbar', 'ui5-button']
    },

    'layout-grid': {
        component: 'layout-grid',
        summary:
            'Responsive grid layout using fd-layout-grid container and fdLayoutGridCol directive on child elements.',
        decisionTree: [
            {
                question: 'What layout approach do you need?',
                options: [
                    {
                        answer: 'Even columns that reflow responsively',
                        recommendation:
                            'Use fd-layout-grid with fdLayoutGridCol directive. Set column spans per breakpoint.',
                        example: `<fd-layout-grid>
  <div fdLayoutGridCol="4" [colMd]="6" [colLg]="4" [colXl]="3">
    Column 1
  </div>
  <div fdLayoutGridCol="4" [colMd]="6" [colLg]="4" [colXl]="3">
    Column 2
  </div>
</fd-layout-grid>`
                    },
                    {
                        answer: 'Master-detail or multi-panel layout',
                        recommendation:
                            'Use fd-flexible-column-layout for 1-2-3 column responsive layouts with SAP Fiori patterns.',
                        example: '<fd-flexible-column-layout [layout]="layout()">'
                    }
                ]
            }
        ],
        commonPitfalls: [
            'There is NO colSm input. The default/small breakpoint column span is set via the fdLayoutGridCol directive value itself (e.g., fdLayoutGridCol="6" means 6 columns on small screens).',
            'Breakpoint thresholds: small < 600px, medium 600-1024px, large 1024-1440px, extra-large > 1440px.',
            'fdLayoutGridCol is an ATTRIBUTE directive, not an element. Apply it to a div or other container element.',
            'Use [noGap]="true" on fd-layout-grid to remove gutters between columns.'
        ],
        compositionPattern: `<fd-layout-grid>
  <div fdLayoutGridCol="12" [colMd]="6" [colLg]="4">
    <!-- Content -->
  </div>
</fd-layout-grid>`,
        relatedComponents: ['fd-layout-grid', 'fd-flexible-column-layout']
    },

    card: {
        component: 'card',
        summary:
            'Card uses content projection with attribute directives for title and subtitle. Note: fd-card-title and fd-card-subtitle are ATTRIBUTE directives.',
        decisionTree: [
            {
                question: 'What type of card do you need?',
                options: [
                    {
                        answer: 'Standard content card',
                        recommendation: 'Use fd-card with fd-card-header and fd-card-content sections.',
                        example: `<fd-card>
  <fd-card-header>
    <h3 fd-card-title>Card Title</h3>
    <p fd-card-subtitle>Subtitle text</p>
  </fd-card-header>
  <fd-card-content>
    <p>Card body content here.</p>
  </fd-card-content>
</fd-card>`
                    },
                    {
                        answer: 'UI5 Web Components card',
                        recommendation: 'Use ui5-card. Simpler API with header-text and subtitle-text inputs.',
                        example: `<ui5-card>
  <ui5-card-header slot="header" title-text="Card Title" subtitle-text="Subtitle"></ui5-card-header>
  <div>Card content</div>
</ui5-card>`
                    }
                ]
            }
        ],
        commonPitfalls: [
            'fd-card-title and fd-card-subtitle are ATTRIBUTE directives. Use <h3 fd-card-title> not <fd-card-title>.',
            'fd-card-header wraps the title area. fd-card-content wraps the body area. Both are element selectors.',
            'For clickable cards, add [cardType]="\'list\'" and listen to (cardClick).'
        ],
        compositionPattern: `<fd-card>
  <fd-card-header>
    <fd-avatar image="..." size="xs"></fd-avatar>
    <h3 fd-card-title>Title</h3>
    <p fd-card-subtitle>Subtitle</p>
    <span fd-card-counter>3 of 10</span>
  </fd-card-header>
  <fd-card-content>
    <!-- Body content -->
  </fd-card-content>
</fd-card>`,
        relatedComponents: ['fd-card-header', 'fd-card-content', 'fd-avatar', 'fd-tile', 'ui5-card']
    },

    'fd-flexible-column-layout': {
        component: 'fd-flexible-column-layout',
        summary:
            'SAP Fiori master-detail layout that transitions between 1, 2, and 3 columns. Controlled by the FlexibleColumnLayout enum via the layout input. Content is projected via #startColumn, #midColumn, and #endColumn template reference variables.',
        decisionTree: [
            {
                question:
                    'Is the Flexible Column Layout the right choice for this use case? (Per UX specs: use it only for drill-down / list-detail navigation)',
                options: [
                    {
                        answer: 'List-detail or list-detail-detail drill-down navigation',
                        recommendation:
                            'Yes, use fd-flexible-column-layout. It is designed exactly for hierarchical drill-down flows where the user navigates deeper into detail columns.',
                        example: `// Typical flow: list → detail → sub-detail
layout = signal(FlexibleColumnLayout.OneColumnStartFullScreen);
// User selects item → TwoColumnsMidExpanded
// User drills further → ThreeColumnsEndExpanded`
                    },
                    {
                        answer: 'Workbench or tools layout (main column + side panels)',
                        recommendation:
                            'Do NOT use fd-flexible-column-layout. Use fd-dynamic-side-content instead. FCL is not meant for a main column with additional side columns.',
                        example: `// Use fd-dynamic-side-content for tool/workbench layouts`
                    },
                    {
                        answer: 'Dashboard with context-independent pages',
                        recommendation:
                            'Do NOT use fd-flexible-column-layout. Dashboards with independent tiles or cards do not fit the drill-down model FCL is built for.',
                        example: `// Use a grid layout (fd-layout-grid) for dashboards`
                    },
                    {
                        answer: 'Multiple instances of the same object type side by side',
                        recommendation:
                            'Do NOT use fd-flexible-column-layout. Use the multi-instance handling floor plan instead. FCL is for hierarchical drill-down, not parallel instances.',
                        example: `// Multi-instance handling floor plan for same-type parallel objects`
                    }
                ]
            },
            {
                question: 'What should the initial layout be when the app first loads?',
                options: [
                    {
                        answer: 'Start with one column (recommended default) — user drills in by selecting an item',
                        recommendation:
                            'Use OneColumnStartFullScreen as the initial layout. This is the UX-spec recommended default. The user opens new columns by navigating forward. Do not start with 3 columns — too much information at once confuses users.',
                        example: `layout = signal(FlexibleColumnLayout.OneColumnStartFullScreen);

// On item select → navigate to 2-column layout:
onItemSelect() {
  this.layout.set(FlexibleColumnLayout.TwoColumnsMidExpanded);
}`
                    },
                    {
                        answer: 'Start with two columns (list always visible alongside a default detail)',
                        recommendation:
                            'Acceptable when your use case requires always showing a default detail. Ensure size S shows the FIRST column — FCL always shows the last (rightmost) column in size S by default, so starting at TwoColumnsStartExpanded or TwoColumnsMidExpanded may hide the list on phone.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsMidExpanded);
// Must verify size-S behavior shows startColumn, not midColumn`
                    }
                ]
            },
            {
                question:
                    'You need a 2-column layout — which ratio fits the use case? (UX spec defaults: 33:67 or 67:33)',
                options: [
                    {
                        answer: 'List is primary — user browses and selects items frequently',
                        recommendation:
                            'Use TwoColumnsStartExpanded (67% start / 33% mid). The list column is dominant. Ratio is fixed by default but the user can drag the splitter.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsStartExpanded);
// startColumn: 67%, midColumn: 33%`
                    },
                    {
                        answer: 'Detail is primary — user mainly reads or edits the detail view',
                        recommendation:
                            'Use TwoColumnsMidExpanded (33% start / 67% mid). The detail column is dominant. This is the most common 2-column layout for object pages.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsMidExpanded);
// startColumn: 33%, midColumn: 67%`
                    },
                    {
                        answer: 'End column is the primary detail (start is the list, mid is a sub-list)',
                        recommendation:
                            'Use TwoColumnsEndExpanded (33% start / 67% end). Use when mid column acts as a navigation step rather than a destination.',
                        example: `layout = signal(FlexibleColumnLayout.TwoColumnsEndExpanded);
// startColumn: 33%, endColumn: 67%`
                    }
                ]
            },
            {
                question:
                    'You need a 3-column layout — which ratio? (Only available on desktop L/XL; tablet M shows 2 of the 3 columns at a time; phone S always shows a single column)',
                options: [
                    {
                        answer: 'Mid (detail) column is primary content — equal side columns',
                        recommendation:
                            'Use ThreeColumnsMidExpanded (25% : 50% : 25%). Mid column gets half the width. Good when the detail view is the main work area.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsMidExpanded);
// startColumn: 25%, midColumn: 50%, endColumn: 25%`
                    },
                    {
                        answer: 'End (sub-detail) column is primary content',
                        recommendation:
                            'Use ThreeColumnsEndExpanded (25% : 25% : 50%). End column gets half the width. Use when the user has drilled to the deepest level and needs space there.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsEndExpanded);
// startColumn: 25%, midColumn: 25%, endColumn: 50%`
                    },
                    {
                        answer: 'Start (list) column is minimized — focus is on mid and end columns',
                        recommendation:
                            'Use ThreeColumnsStartMinimized (0% : 67% : 33%). Start column is hidden. Close and Full Screen actions appear on the right border of mid column to let users restore the layout.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsStartMinimized);
// startColumn: 0%, midColumn: 67%, endColumn: 33%`
                    },
                    {
                        answer: 'End (sub-detail) column is minimized — focus is on start and mid columns',
                        recommendation:
                            'Use ThreeColumnsEndMinimized (67% : 33% : 0%). End column is hidden. Use when the user has navigated back from the deepest level but keeps the 3-column state.',
                        example: `layout = signal(FlexibleColumnLayout.ThreeColumnsEndMinimized);
// startColumn: 67%, midColumn: 33%, endColumn: 0%`
                    }
                ]
            },
            {
                question: 'fd-flexible-column-layout vs ui5-flexible-column-layout?',
                options: [
                    {
                        answer: 'Angular-native with full control over layout percentages',
                        recommendation:
                            'Use fd-flexible-column-layout. Customize column widths via layoutDefinitions (FlexibleColumnLayoutDefinition array).',
                        example: `import { FlexibleColumnLayout } from '@fundamental-ngx/core/flexible-column-layout';`
                    },
                    {
                        answer: 'SAP UI5 design system compliance out of the box',
                        recommendation:
                            'Use ui5-flexible-column-layout from @fundamental-ngx/ui5-webcomponents. Slots are start-column, mid-column, end-column attributes.',
                        example: `<ui5-flexible-column-layout layout="TwoColumnsMidExpanded">
  <div slot="startColumn">Master</div>
  <div slot="midColumn">Detail</div>
</ui5-flexible-column-layout>`
                    }
                ]
            }
        ],
        commonPitfalls: [
            'All six title inputs are required for accessibility: collapseTitle, collapseTitleStartBtn, collapseTitleEndBtn, expandTitle, expandTitleStartBtn, expandTitleEndBtn. Omitting any causes runtime errors.',
            'separatorAriaLabel is required for screen reader accessibility of the column resize handles.',
            'layoutDefinitions input is required — provide a FlexibleColumnLayoutDefinition[] that maps each FlexibleColumnLayout value to column width percentages.',
            'Content projection uses template reference variables (#startColumn, #midColumn, #endColumn) inside ng-template elements — NOT named slot attributes. The ng-template must be a direct child of fd-flexible-column-layout.',
            '#midColumn and #endColumn are only rendered when the active layout includes those columns. Do not assume they are always mounted.',
            'FlexibleColumnLayout enum values: OneColumnStartFullScreen | OneColumnMidFullScreen | OneColumnEndFullScreen | TwoColumnsStartExpanded | TwoColumnsMidExpanded | TwoColumnsEndExpanded | ThreeColumnsMidExpanded | ThreeColumnsEndExpanded | ThreeColumnsStartMinimized | ThreeColumnsEndMinimized.',
            'Import FlexibleColumnLayout enum from @fundamental-ngx/core/flexible-column-layout, not a deep path.'
        ],
        compositionPattern: `import { FlexibleColumnLayout } from '@fundamental-ngx/core/flexible-column-layout';

// In component
layout = signal<FlexibleColumnLayout>(FlexibleColumnLayout.OneColumnStartFullScreen);

// Template
<fd-flexible-column-layout
  [layout]="layout()"
  [layoutDefinitions]="layoutDefs"
  collapseTitle="Collapse panel"
  collapseTitleStartBtn="Collapse start panel"
  collapseTitleEndBtn="Collapse end panel"
  expandTitle="Expand panel"
  expandTitleStartBtn="Expand start panel"
  expandTitleEndBtn="Expand end panel"
  separatorAriaLabel="Resize column separator">
  <ng-template #startColumn>
    <!-- Master / list panel -->
  </ng-template>
  <ng-template #midColumn>
    <!-- Detail panel -->
  </ng-template>
  <ng-template #endColumn>
    <!-- Extra detail panel (3-column layouts only) -->
  </ng-template>
</fd-flexible-column-layout>`,
        relatedComponents: ['ui5-flexible-column-layout', 'fd-layout-grid', 'fd-dynamic-page', 'fd-shellbar'],
        resources: [
            'UX specs: https://www.sap.com/design-system/fiori-design-web/v1-145/page-types/page-layouts/flexible-column-layout'
        ]
    },

    'fdp-table': {
        component: 'fdp-table',
        summary:
            'Platform data table with declarative columns and built-in sort, filter, group, and paginate. ' +
            'Accepts a plain array or a TableDataProvider<T> subclass as [dataSource]. ' +
            'Key pitfalls: TableDataProvider members need the override keyword; ' +
            'FilterType.MULTI delivers string[] not string; ' +
            'TableDataSourceDirective and TableHeaderResizerDirective are host directives (auto-applied, never add them to the template); ' +
            'fdp-table-view-settings-dialog must be a sibling of fdp-table, not a child.',
        decisionTree: [
            {
                question: 'What type of data source does fdp-table need?',
                options: [
                    {
                        answer: 'Static array — data is already in memory',
                        recommendation:
                            'Pass the array directly to [dataSource]. fdp-table handles paging and sorting internally.',
                        example: `<fdp-table [dataSource]="products">
  <fdp-column key="name" label="Name" [sortable]="true"></fdp-column>
  <fdp-column key="price" label="Price" dataType="number"></fdp-column>
</fdp-table>`
                    },
                    {
                        answer: 'Server-side / dynamic — fetch is triggered by sort/filter/page state',
                        recommendation:
                            'Extend TableDataProvider<T>. Override items, totalItems, and fetch(). ' +
                            'All three members require the override modifier — TypeScript strict mode rejects the class without it.',
                        example: `import { TableDataProvider, TableState } from '@fundamental-ngx/platform/table';
import { Observable, of } from 'rxjs';

export class ProductDataProvider extends TableDataProvider<Product> {
    override items: Product[] = ALL_PRODUCTS;
    override totalItems = ALL_PRODUCTS.length;

    override fetch(state?: TableState): Observable<Product[]> {
        let result = [...ALL_PRODUCTS];

        // Filtering — handle both single-value and MULTI (string[]) filter values
        (state?.filterBy ?? []).forEach((filter) => {
            const fv = filter.value;
            result = result.filter((item) => {
                const val = String((item as Record<string, unknown>)[filter.field as string] ?? '');
                if (Array.isArray(fv)) {
                    return fv.length === 0 || fv.includes(val);   // FilterType.MULTI
                }
                return val.toLowerCase().includes(String(fv ?? '').toLowerCase());
            });
        });

        this.totalItems = result.length;
        this.items = result;
        return of(result);
    }
}`
                    }
                ]
            },
            {
                question: 'Where should fdp-table-view-settings-dialog be placed in the template?',
                options: [
                    {
                        answer: 'As a sibling of fdp-table (correct)',
                        recommendation:
                            'Place the dialog next to fdp-table and link them with a template reference variable on fdp-table.',
                        example: `<!-- Correct: dialog is a sibling -->
<fdp-table #myTable [dataSource]="dataProvider">
  <fdp-column key="name" label="Name" [sortable]="true"></fdp-column>
</fdp-table>

<fdp-table-view-settings-dialog [table]="myTable">
  <fdp-table-view-settings-sort-rule column="name" label="Name"></fdp-table-view-settings-sort-rule>
  <fdp-table-view-settings-filter-rule
    column="status"
    label="Status"
    [type]="FilterType.MULTI"
  ></fdp-table-view-settings-filter-rule>
</fdp-table-view-settings-dialog>`
                    },
                    {
                        answer: 'Nested inside fdp-table (incorrect)',
                        recommendation:
                            'Do NOT nest fdp-table-view-settings-dialog inside fdp-table. It is a sibling component, not a child.',
                        example: `<!-- Wrong — causes template parse errors:
<fdp-table>
  <fdp-table-view-settings-dialog>...</fdp-table-view-settings-dialog>
</fdp-table> -->`
                    }
                ]
            }
        ],
        commonPitfalls: [
            'All three TableDataProvider members (items, totalItems, fetch) require the override modifier. Omitting it causes a TypeScript compiler error in strict mode.',
            'TableDataSourceDirective and TableHeaderResizerDirective are declared as Angular hostDirectives on TableComponent. They are applied automatically — never add them as template attributes or to the component imports array.',
            'FilterType.MULTI delivers filter.value as string[] (array of selected option values), not a string. Call Array.isArray(filter.value) before any string operations to avoid runtime TypeError.',
            'fdp-table-view-settings-dialog must be a sibling element of fdp-table, linked via [table]="tableRef". Nesting it inside <fdp-table> causes a template parse error.',
            '@fundamental-ngx/platform adds ~4–5 MB to the initial bundle. Set angular.json production budgets to at least maximumWarning: "2MB", maximumError: "5MB".',
            'Import FilterType from @fundamental-ngx/platform/table, not a deep internal path.'
        ],
        compositionPattern: `import { TableDataProvider, TableState, FilterType } from '@fundamental-ngx/platform/table';
import { Observable, of } from 'rxjs';

// Data provider — override keyword is required on all three members
export class ProductDataProvider extends TableDataProvider<Product> {
    override items: Product[] = [];
    override totalItems = 0;

    override fetch(state?: TableState): Observable<Product[]> {
        let result = [...SOURCE_DATA];

        (state?.filterBy ?? []).forEach((filter) => {
            const fv = filter.value;
            result = result.filter((item) => {
                const val = String((item as Record<string, unknown>)[filter.field as string] ?? '');
                if (Array.isArray(fv)) {
                    return fv.length === 0 || fv.includes(val);  // MULTI filter
                }
                return val.toLowerCase().includes(String(fv ?? '').toLowerCase());
            });
        });

        (state?.sortBy ?? []).forEach((sort) => {
            result.sort((a, b) => {
                const av = String((a as Record<string, unknown>)[sort.field as string] ?? '');
                const bv = String((b as Record<string, unknown>)[sort.field as string] ?? '');
                return sort.direction === 'ASC' ? av.localeCompare(bv) : bv.localeCompare(av);
            });
        });

        this.items = result;
        this.totalItems = result.length;
        return of(result);
    }
}

// Template — dialog is a sibling of fdp-table, NOT a child
<fdp-table #table [dataSource]="dataProvider">
  <fdp-column key="name" label="Name" [sortable]="true"></fdp-column>
  <fdp-column key="status" label="Status" [sortable]="true"></fdp-column>
</fdp-table>

<fdp-table-view-settings-dialog [table]="table">
  <fdp-table-view-settings-sort-rule column="name" label="Name"></fdp-table-view-settings-sort-rule>
  <fdp-table-view-settings-filter-rule
    column="status"
    label="Status"
    [type]="FilterType.MULTI"
  ></fdp-table-view-settings-filter-rule>
</fdp-table-view-settings-dialog>`,
        relatedComponents: [
            'fd-table',
            'fdp-table-toolbar',
            'fdp-table-view-settings-dialog',
            'fdp-table-view-settings-filter-rule',
            'fdp-table-view-settings-sort-rule',
            'fdp-pagination'
        ]
    },

    'fd-dynamic-page': {
        component: 'fd-dynamic-page',
        summary:
            'Full-page layout component with a collapsible header, breadcrumb, title, and scrollable content area. ' +
            'Designed to be used as a standalone full-viewport overlay. When embedded inside an existing shell layout ' +
            '(shellbar + side nav), the fixed-position header must be overridden with CSS.',
        decisionTree: [
            {
                question: 'Are you using fd-dynamic-page inside an existing shell/nav layout?',
                options: [
                    {
                        answer: 'Yes — embedded inside shellbar + side navigation',
                        recommendation:
                            'Override .fd-dynamic-page__header-fixed to use position: sticky instead of fixed. ' +
                            'Also ensure the scroll container (the element wrapping the dynamic page) uses overflow-y: auto — ' +
                            'position: sticky requires a scrollable ancestor to anchor to.',
                        example:
                            '/* In component or global styles: */\n' +
                            '.fd-dynamic-page__header-fixed {\n' +
                            '    position: sticky !important;\n' +
                            '    top: 0 !important;\n' +
                            '    z-index: 10;\n' +
                            '}\n' +
                            '.main-content {\n' +
                            '    overflow-y: auto;  /* required for sticky to work */\n' +
                            '}'
                    },
                    {
                        answer: 'No — standalone full-viewport page',
                        recommendation:
                            'Use the default layout: wrap fd-dynamic-page in a fixed overlay div ' +
                            '(position: fixed; inset: 0). This is the intended usage in the documentation examples.',
                        example: ''
                    }
                ]
            },
            {
                question: 'Which library variant do you need?',
                options: [
                    {
                        answer: 'fd-dynamic-page (@fundamental-ngx/core)',
                        recommendation:
                            'Core component. Use for custom page layouts with full control over the header.',
                        example: ''
                    },
                    {
                        answer: 'fdp-dynamic-page (@fundamental-ngx/platform)',
                        recommendation:
                            'Platform variant with additional slots for toolbar and smart filter bar integration.',
                        example: ''
                    }
                ]
            }
        ],
        commonPitfalls: [
            'fd-dynamic-page__header-fixed uses position: fixed; top: 0 from fundamental-styles. When used inside a shell layout (shellbar + content area), the dynamic page header overlaps the shellbar because both are fixed at y=0. Override with position: sticky and ensure the parent scroll container uses overflow-y: auto.',
            'position: sticky only works when an ancestor element has overflow-y: auto or overflow-y: scroll. If the parent uses overflow: hidden, sticky positioning silently falls back to relative and the header will not stick.',
            'ariaLabel is a required input on fd-dynamic-page. Omitting it causes an Angular error at runtime.',
            'fd-dynamic-page is designed as a full-page overlay in the docs examples (wrapped in position: fixed; inset: 0 div). Embedding it inside an existing layout without the CSS override will cause the fixed header to escape the layout container.',
            'fdp-dynamic-page from @fundamental-ngx/platform adds ~4–5 MB to the initial bundle. Raise angular.json production budgets accordingly.'
        ],
        compositionPattern: `// ── Standalone full-viewport usage (default pattern from docs) ──
<div style="position: fixed; inset: 0; display: flex; flex-direction: column; overflow: hidden;">
  <fd-dynamic-page ariaLabel="Product Details" [expandable]="true">
    <fd-dynamic-page-header-image>
      <fd-avatar size="m" glyph="product"></fd-avatar>
    </fd-dynamic-page-header-image>
    <fd-dynamic-page-title>
      <fd-dynamic-page-breadcrumb>
        <fd-breadcrumb>
          <fd-breadcrumb-item><a fd-link>Home</a></fd-breadcrumb-item>
        </fd-breadcrumb>
      </fd-dynamic-page-breadcrumb>
      <fd-dynamic-page-header-title>Product Name</fd-dynamic-page-header-title>
    </fd-dynamic-page-title>
    <fd-dynamic-page-header>
      <!-- Collapsible header content -->
    </fd-dynamic-page-header>
    <fd-dynamic-page-content>
      <!-- Scrollable page body -->
    </fd-dynamic-page-content>
  </fd-dynamic-page>
</div>

// ── Embedded inside shell layout — CSS override required ──
// styles.css or component styles:
.fd-dynamic-page__header-fixed {
    position: sticky !important;
    top: 0 !important;
    z-index: 10;
}
// The scroll container wrapping fd-dynamic-page must have overflow-y: auto:
.main-content {
    overflow-y: auto;
    flex: 1;
}`,
        relatedComponents: ['fd-shellbar', 'fd-vertical-navigation', 'fdp-dynamic-page', 'fd-breadcrumb', 'fd-toolbar']
    }
};
