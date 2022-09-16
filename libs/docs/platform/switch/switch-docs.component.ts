import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const switchSizeHtml = 'switch-sizes-example/switch-sizes-example.component.html';
const switchDisableHtml = 'disabled-switch-example/disabled-switch-example.component.html';
const switchDisableTs = 'disabled-switch-example/disabled-switch-example.component.ts';
const switchSemanticHtml = 'semantic-switch-example/semantic-switch-example.component.html';
const switchSemanticTs = 'semantic-switch-example/semantic-switch-example.component.ts';
const switchFormExampleHtml = 'switch-form-example/switch-forms-example.component.html';
const switchFormExampleTs = 'switch-form-example/switch-forms-example.component.ts';
const switchConfigExampleHtml = 'switch-config-example/switch-config-example.component.html';
const switchConfigExampleTs = 'switch-config-example/switch-config-example.component.ts';

@Component({
    selector: 'app-switch',
    templateUrl: './switch-docs.component.html'
})
export class SwitchDocsComponent {
    switchSize: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(switchSizeHtml),
            fileName: 'switch-sizes-example'
        }
    ];

    switchDisable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(switchDisableHtml),
            fileName: 'disabled-switch-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(switchDisableTs),
            fileName: 'disabled-switch-example',
            component: 'DisabledSwitchExampleComponent'
        }
    ];

    switchSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(switchSemanticHtml),
            fileName: 'semantic-switch-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(switchSemanticTs),
            fileName: 'semantic-switch-example',
            component: 'SemanticSwitchExampleComponent'
        }
    ];

    switchFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(switchFormExampleHtml),
            fileName: 'switch-forms-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(switchFormExampleTs),
            fileName: 'switch-forms-example',
            component: 'SwitchFormsExampleComponent'
        }
    ];

    switchConfig: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(switchConfigExampleHtml),
            fileName: 'switch-config-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(switchConfigExampleTs),
            fileName: 'switch-config-example',
            component: 'SwitchConfigExampleComponent'
        }
    ];
}
