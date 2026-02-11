import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicCheckBoxSample } from './examples/basic-sample';
import { ReactiveFormsSample } from './examples/reactive-forms-sample';
import { StatesCheckBoxSample } from './examples/states';
import { ValueStatesCheckBoxSample } from './examples/value-states';
import { WrappingCheckBoxSample } from './examples/wrapping';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';

@Component({
    selector: 'ui5-checkbox-docs',
    templateUrl: './checkbox-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicCheckBoxSample,
        StatesCheckBoxSample,
        ValueStatesCheckBoxSample,
        WrappingCheckBoxSample,
        ReactiveFormsSample
    ]
})
export class CheckBoxDocs {
    basicCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicCheckBoxSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ];

    statesCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('states.html'),
            originalFileName: 'states'
        },
        {
            language: 'typescript',
            component: 'StatesCheckBoxSample',
            code: getAssetFromModuleAssets('states.ts'),
            originalFileName: 'states'
        }
    ];

    valueStatesCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('value-states.html'),
            originalFileName: 'value-states'
        },
        {
            language: 'typescript',
            component: 'ValueStatesCheckBoxSample',
            code: getAssetFromModuleAssets('value-states.ts'),
            originalFileName: 'value-states'
        }
    ];

    wrappingCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('wrapping.html'),
            originalFileName: 'wrapping'
        },
        {
            language: 'typescript',
            component: 'WrappingCheckBoxSample',
            code: getAssetFromModuleAssets('wrapping.ts'),
            originalFileName: 'wrapping'
        }
    ];

    reactiveFormsCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('reactive-forms-sample.html'),
            originalFileName: 'reactive-forms-sample'
        },
        {
            language: 'typescript',
            component: 'ReactiveFormsSample',
            code: getAssetFromModuleAssets('reactive-forms-sample.ts'),
            originalFileName: 'reactive-forms-sample'
        }
    ];
}
