import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AdvancedConfigExampleComponent } from './examples/advanced-config/advanced-config-example.component';
import { ContentDensityExampleComponent } from './examples/content-density-example.component';
import { DeprecatedApiExampleComponent } from './examples/deprecated-api/deprecated-api-example.component';
import { DirectiveUsageExampleComponent } from './examples/directive-usage/directive-usage-example.component';
import { ToggleDirectiveExampleComponent } from './examples/toggle-directive/toggle-directive-example.component';

const contentDensityUserComponentSrc = 'content-density-user/content-density-user.component.ts';
const contentDensityUserComponentScssSrc = 'content-density-user/content-density-user.component.scss';
const restrictedDensityUserComponentSrc = 'content-density-user/restricted-density-user.component.ts';
const contentDensityStorageModule = 'content-density-storage-example.ts';

const contentDensitySrc = 'content-density-example.component.ts';
const contentDensityHTMLSrc = 'content-density-example.component.html';

const directiveUsageExampleComponentSrc = 'directive-usage/directive-usage-example.component.ts';
const directiveUsageExampleComponentSrcHTMLSrc = 'directive-usage/directive-usage-example.component.html';

const advancedConfigExampleSrc = 'advanced-config/advanced-config-example.component.ts';
const debugModeExampleSrc = 'advanced-config/debug-mode-example.component.ts';
const alwaysModifiersExampleSrc = 'advanced-config/always-modifiers-example.component.ts';
const customModifiersExampleSrc = 'advanced-config/custom-modifiers-example.component.ts';

const toggleDirectiveExampleSrc = 'toggle-directive/toggle-directive-example.component.ts';

const deprecatedApiExampleSrc = 'deprecated-api/deprecated-api-example.component.ts';

@Component({
    selector: 'app-content-density-docs',
    templateUrl: 'content-density-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        ContentDensityExampleComponent,
        CodeExampleComponent,
        DirectiveUsageExampleComponent,
        AdvancedConfigExampleComponent,
        ToggleDirectiveExampleComponent,
        DeprecatedApiExampleComponent
    ]
})
export class ContentDensityDocsComponent {
    contentDensityExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentDensitySrc),
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(contentDensityHTMLSrc),
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentDensityUserComponentSrc),
            fileName: 'content-density-user/content-density-user',
            component: 'ContentDensityUserComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(contentDensityUserComponentScssSrc),
            fileName: 'content-density-user/content-density-user',
            component: 'ContentDensityUserComponent'
        }
    ];

    directiveUsageExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(directiveUsageExampleComponentSrc),
            fileName: 'directive-usage-example',
            path: 'directive-usage',
            component: 'DirectiveUsageExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(directiveUsageExampleComponentSrcHTMLSrc),
            fileName: 'directive-usage-example',
            path: 'directive-usage',
            component: 'DirectiveUsageExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentDensityUserComponentSrc),
            fileName: 'content-density-user',
            path: 'content-density-user',
            component: 'ContentDensityUserComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(restrictedDensityUserComponentSrc),
            fileName: 'restricted-density-user',
            path: 'content-density-user',
            component: 'RestrictedDensityUserComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(contentDensityUserComponentScssSrc),
            fileName: 'content-density-user',
            path: 'content-density-user',
            component: 'ContentDensityUserComponent'
        }
    ];

    contentDensityStorageExampleFile: ExampleFile = {
        language: 'typescript',
        code: getAssetFromModuleAssets(contentDensityStorageModule),
        fileName: 'content-density-storage-example'
    };

    advancedConfigExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(advancedConfigExampleSrc),
            fileName: 'advanced-config-example',
            path: 'advanced-config',
            component: 'AdvancedConfigExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(debugModeExampleSrc),
            fileName: 'debug-mode-example',
            path: 'advanced-config',
            component: 'DebugModeExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(alwaysModifiersExampleSrc),
            fileName: 'always-modifiers-example',
            path: 'advanced-config',
            component: 'AlwaysModifiersExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customModifiersExampleSrc),
            fileName: 'custom-modifiers-example',
            path: 'advanced-config',
            component: 'CustomModifiersExampleComponent'
        }
    ];

    toggleDirectiveExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(toggleDirectiveExampleSrc),
            fileName: 'toggle-directive-example',
            path: 'toggle-directive',
            component: 'ToggleDirectiveExampleComponent'
        }
    ];

    deprecatedApiExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(deprecatedApiExampleSrc),
            fileName: 'deprecated-api-example',
            path: 'deprecated-api',
            component: 'DeprecatedApiExampleComponent'
        }
    ];
}
