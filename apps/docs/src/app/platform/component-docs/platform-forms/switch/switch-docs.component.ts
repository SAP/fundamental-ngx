import { Component } from '@angular/core';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import switchSizeHtml from '!./switch-examples/switch-sizes-example/switch-sizes-example.component.html?raw';
import switchDisableHtml from '!./switch-examples/disabled-switch-example/disabled-switch-example.component.html?raw';
import switchDisableTs from '!./switch-examples/disabled-switch-example/disabled-switch-example.component?raw';
import switchSemanticHtml from '!./switch-examples/semantic-switch-example/semantic-switch-example.component.html?raw';
import switchSemanticTs from '!./switch-examples/semantic-switch-example/semantic-switch-example.component.ts?raw';
import switchFormExampleHtml from '!./switch-examples/switch-form-example/switch-forms-example.component.html?raw';
import switchFormExampleTs from '!./switch-examples/switch-form-example/switch-forms-example.component.ts?raw';
import switchConfigExampleHtml from '!./switch-examples/switch-config-example/switch-config-example.component.html?raw';
import switchConfigExampleTs from '!./switch-examples/switch-config-example/switch-config-example.component.ts?raw';

@Component({
    selector: 'app-switch',
    templateUrl: './switch-docs.component.html'
})
export class SwitchDocsComponent {
    switchSize: ExampleFile[] = [
        {
            language: 'html',
            code: switchSizeHtml,
            fileName: 'switch-sizes-example'
        }
    ];

    switchDisable: ExampleFile[] = [
        {
            language: 'html',
            code: switchDisableHtml,
            fileName: 'disabled-switch-example'
        },
        {
            language: 'typescript',
            code: switchDisableTs,
            fileName: 'disabled-switch-example',
            component: 'DisabledSwitchExampleComponent'
        }
    ];

    switchSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: switchSemanticHtml,
            fileName: 'semantic-switch-example'
        },
        {
            language: 'typescript',
            code: switchSemanticTs,
            fileName: 'semantic-switch-example',
            component: 'SemanticSwitchExampleComponent'
        }
    ];

    switchFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: switchFormExampleHtml,
            fileName: 'switch-forms-example'
        },
        {
            language: 'typescript',
            code: switchFormExampleTs,
            fileName: 'switch-forms-example',
            component: 'SwitchFormsExampleComponent'
        }
    ];

    switchConfig: ExampleFile[] = [
        {
            language: 'html',
            code: switchConfigExampleHtml,
            fileName: 'switch-config-example'
        },
        {
            language: 'typescript',
            code: switchConfigExampleTs,
            fileName: 'switch-config-example',
            component: 'SwitchConfigExampleComponent'
        }
    ];
}
