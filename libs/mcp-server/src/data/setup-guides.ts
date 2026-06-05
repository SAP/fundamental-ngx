// libs/mcp-server/src/data/setup-guides.ts
import { ManualStep, SetupGuide } from '../types/setup-guide';

const ESBUILD_FONT_FIX_STEP: ManualStep = {
    title: 'Fix SAP icon font paths for the esbuild application builder',
    condition:
        'Required when using @angular/build:application (esbuild) — the default builder for Angular 17+ projects. ' +
        'With esbuild, the relative url() paths in css_variables.css @font-face declarations ' +
        '(e.g. url(../sap_horizon/fonts/SAP-icons.woff2)) are resolved relative to the output CSS file, ' +
        'not node_modules. This breaks font loading and causes icons to render as empty squares.',
    commands: `// 1. Copy font files to the public directory so they are served at a known URL.
//    Run this from your project root:
cp -r node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/fonts public/fonts/sap_horizon
cp -r node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts public/fonts/baseTheme

// 2. Add @font-face overrides with absolute paths to src/styles.scss.
//    These declarations override the broken relative paths from css_variables.css.
//    Add them BEFORE any @fundamental-ngx imports:

@font-face {
  font-family: 'SAP-icons';
  src: url('/fonts/sap_horizon/SAP-icons.woff2') format('woff2'),
       url('/fonts/sap_horizon/SAP-icons.woff') format('woff'),
       url('/fonts/sap_horizon/SAP-icons.ttf') format('truetype'),
       local('SAP-icons');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SAP-icons-TNT';
  src: url('/fonts/sap_horizon/SAP-icons-TNT.woff2') format('woff2'),
       url('/fonts/sap_horizon/SAP-icons-TNT.woff') format('woff'),
       url('/fonts/sap_horizon/SAP-icons-TNT.ttf') format('truetype'),
       local('SAP-icons-TNT');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SAP-icons-Business-Suite';
  src: url('/fonts/sap_horizon/BusinessSuiteInAppSymbols.woff2') format('woff2'),
       url('/fonts/sap_horizon/BusinessSuiteInAppSymbols.woff') format('woff'),
       url('/fonts/sap_horizon/BusinessSuiteInAppSymbols.ttf') format('truetype'),
       local('SAP-icons-Business-Suite_woff2');
  font-weight: normal;
  font-style: normal;
}`,
    why:
        'css_variables.css uses relative @font-face src paths such as url(../sap_horizon/fonts/SAP-icons.woff2). ' +
        'These paths assume the CSS file is served from inside the @sap-theming package directory structure. ' +
        'The esbuild application builder flattens output CSS, breaking those relative paths. ' +
        'Copying fonts to public/ and declaring @font-face with absolute paths bypasses the broken resolution. ' +
        'Webpack (legacy @angular-devkit/build-angular:browser) rewrites url() at bundle time and does NOT have this issue.'
};

const CORE_SETUP_GUIDE: SetupGuide = {
    id: 'core',
    summary:
        'Sets up @fundamental-ngx/core with static SAP Horizon theming in an Angular project. ' +
        'Covers the full three-layer CSS dependency chain, angular.json styles order, esbuild font fix, ' +
        'and common pitfalls.',
    angularJsonStyles: [
        {
            path: 'node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css',
            purpose:
                'Layer 1 — SAP design tokens. Defines all --sap* CSS custom properties (colours, typography, spacing) ' +
                'and @font-face declarations for SAP-icons, SAP-icons-TNT, and SAP-icons-Business-Suite. ' +
                'MUST be first: all subsequent layers consume these variables.'
        },
        {
            path: 'node_modules/fundamental-styles/dist/theming/sap_horizon.css',
            purpose:
                'Layer 2 — BTP palette aliases. Maps --btp-* alias variables to --sap* tokens. ' +
                'Also provides fundamental-styles theme overrides for sap_horizon.'
        },
        {
            path: 'node_modules/fundamental-styles/dist/fundamental-styles.css',
            purpose:
                'Layer 3 — Component styles. All fd-* CSS classes. Consumes --sap* and --fd* tokens ' +
                'defined by layers 1 and 2.'
        },
        {
            path: 'src/styles.scss',
            purpose: 'Application-level styles. Must come last so it can override library styles.'
        }
    ],
    angularJsonAssets: null,
    manualSteps: [ESBUILD_FONT_FIX_STEP],
    angularJsonStylesSnippet: `// angular.json — build.options.styles (order is critical):
"styles": [
  "node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css",
  "node_modules/fundamental-styles/dist/theming/sap_horizon.css",
  "node_modules/fundamental-styles/dist/fundamental-styles.css",
  "src/styles.scss"
]`,
    appConfigSnippet: null,
    installCommand:
        'npm install @fundamental-ngx/core @fundamental-ngx/cdk @fundamental-ngx/i18n ' +
        'fundamental-styles @sap-theming/theming-base-content',
    knownIssues: [
        {
            symptom: 'Icons render as empty squares (no glyph)',
            cause:
                'The SAP icon @font-face declarations live in css_variables.css from @sap-theming/theming-base-content. ' +
                'They are NOT in fundamental-styles. If css_variables.css is missing or loaded after fundamental-styles, ' +
                'the browser cannot resolve the font and shows empty boxes.',
            fix:
                'Ensure @sap-theming/theming-base-content is installed and css_variables.css is the FIRST entry ' +
                'in angular.json styles. If using the esbuild builder, also apply the font-path fix described in manualSteps.'
        },
        {
            symptom: 'All --sap* CSS custom properties are undefined; components render with no colours or typography',
            cause:
                '@sap-theming/theming-base-content is not installed, or css_variables.css was omitted from angular.json styles, ' +
                'or fundamental-styles was listed before css_variables.css (wrong order).',
            fix:
                'Run: npm install @sap-theming/theming-base-content. ' +
                'Then verify angular.json styles: css_variables.css must be first, ' +
                'followed by fundamental-styles theming, then fundamental-styles.css.'
        },
        {
            symptom: 'esbuild emits css-syntax-error warnings about css_variables.css',
            cause:
                'css_variables.css stores SAP theming metadata as a JSON blob inside a CSS custom property value. ' +
                "esbuild's CSS parser flags this as a syntax error, but it is non-blocking.",
            fix: 'Safe to ignore. The styles load and function correctly despite the warnings.'
        },
        {
            symptom: 'ng add @fundamental-ngx/core fails with "Can not add index to parent of type array"',
            cause: 'The ng add schematic fails on the angular.json budget update step and rolls back all changes.',
            fix:
                'Apply the angular.json styles array and assets entries manually using the snippets in this guide, ' +
                'then add provideTheming() + themingInitializer() to app.config.ts if you need dynamic theming. ' +
                'For static theming (no ThemingService), the appConfigSnippet is null — no providers are needed.'
        }
    ]
};

const CORE_UI5_SETUP_GUIDE: SetupGuide = {
    id: 'core+ui5',
    summary:
        'Sets up @fundamental-ngx/core and @fundamental-ngx/ui5-webcomponents together. ' +
        'UI5 components require an additional theming layer from @ui5/webcomponents-theming that must be loaded ' +
        'BEFORE the @sap-theming layer. Without it, UI5 component CSS variables (--sapField_Background, etc.) ' +
        'are undefined and UI5 components render unstyled.',
    angularJsonStyles: [
        {
            path: 'node_modules/@ui5/webcomponents-theming/dist/css/themes/sap_horizon/parameters-bundle.css',
            purpose:
                'Layer 0 — UI5 component variables. Defines SAP semantic CSS custom properties consumed by UI5 Web Components ' +
                '(--sapField_Background, --sapButton_Background, etc.). ' +
                'fundamental-styles alone does NOT define these. ' +
                'MUST be loaded before @sap-theming so that UI5 component styles resolve correctly.'
        },
        {
            path: 'node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css',
            purpose:
                'Layer 1 — SAP design tokens. Defines all --sap* CSS custom properties and @font-face declarations. ' +
                'MUST come after @ui5/webcomponents-theming (which it overrides some values from) but before fundamental-styles.'
        },
        {
            path: 'node_modules/fundamental-styles/dist/theming/sap_horizon.css',
            purpose: 'Layer 2 — BTP palette aliases and fundamental-styles theme overrides.'
        },
        {
            path: 'node_modules/fundamental-styles/dist/fundamental-styles.css',
            purpose: 'Layer 3 — All fd-* component styles.'
        },
        {
            path: 'src/styles.scss',
            purpose: 'Application-level styles. Must come last.'
        }
    ],
    angularJsonAssets: null,
    manualSteps: [ESBUILD_FONT_FIX_STEP],
    angularJsonStylesSnippet: `// angular.json — build.options.styles (order is critical):
"styles": [
  "node_modules/@ui5/webcomponents-theming/dist/css/themes/sap_horizon/parameters-bundle.css",
  "node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css",
  "node_modules/fundamental-styles/dist/theming/sap_horizon.css",
  "node_modules/fundamental-styles/dist/fundamental-styles.css",
  "src/styles.scss"
]`,
    appConfigSnippet: null,
    installCommand:
        'npm install @fundamental-ngx/core @fundamental-ngx/cdk @fundamental-ngx/i18n ' +
        '@fundamental-ngx/ui5-webcomponents ' +
        'fundamental-styles @sap-theming/theming-base-content @ui5/webcomponents-theming',
    knownIssues: [
        {
            symptom: 'UI5 components render unstyled — buttons flat, inputs have no borders, fields show no background',
            cause:
                '@ui5/webcomponents-theming is not installed, or its parameters-bundle.css is not the first entry ' +
                'in angular.json styles. UI5 component styles reference SAP semantic variables ' +
                '(--sapField_Background, --sapButton_Background, etc.) that are only defined in parameters-bundle.css. ' +
                'fundamental-styles alone is insufficient.',
            fix:
                'Install @ui5/webcomponents-theming: npm install @ui5/webcomponents-theming. ' +
                'Add node_modules/@ui5/webcomponents-theming/dist/css/themes/sap_horizon/parameters-bundle.css ' +
                'as the FIRST entry in angular.json styles, before @sap-theming/theming-base-content.'
        },
        {
            symptom: 'Icons render as empty squares',
            cause: 'Same as core-only setup — css_variables.css missing or loaded in wrong order.',
            fix: 'Ensure @sap-theming/theming-base-content css_variables.css is present and in position 2 (after parameters-bundle.css). Apply the esbuild font fix from manualSteps.'
        },
        {
            symptom: 'Peer dependency conflict when installing @fundamental-ngx/ui5-webcomponents',
            cause:
                '@fundamental-ngx/cdk is a required peer dependency that npm does not always install automatically. ' +
                'Mixing different semver minors of @fundamental-ngx packages also causes conflicts.',
            fix:
                'Install all three packages explicitly at matching versions: ' +
                'npm install @fundamental-ngx/core @fundamental-ngx/cdk @fundamental-ngx/ui5-webcomponents. ' +
                'All three must be the same semver minor (e.g. all 0.63.x).'
        }
    ]
};

export const SETUP_GUIDES: Record<string, SetupGuide> = {
    core: CORE_SETUP_GUIDE,
    'core+ui5': CORE_UI5_SETUP_GUIDE,
    ui5: CORE_UI5_SETUP_GUIDE
};
