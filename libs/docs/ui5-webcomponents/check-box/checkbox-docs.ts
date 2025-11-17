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
import { InFormCheckBoxSample } from './examples/in-form';
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
        InFormCheckBoxSample
    ]
})
export class CheckBoxDocs {
    basicCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicCheckBoxSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample'
        }
    ];

    statesCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('states.html'),
            fileName: 'states'
        },
        {
            language: 'typescript',
            component: 'StatesCheckBoxSample',
            code: getAssetFromModuleAssets('states.ts'),
            fileName: 'states'
        }
    ];

    valueStatesCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('value-states.html'),
            fileName: 'value-states'
        },
        {
            language: 'typescript',
            component: 'ValueStatesCheckBoxSample',
            code: getAssetFromModuleAssets('value-states.ts'),
            fileName: 'value-states'
        }
    ];

    wrappingCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('wrapping.html'),
            fileName: 'wrapping'
        },
        {
            language: 'typescript',
            component: 'WrappingCheckBoxSample',
            code: getAssetFromModuleAssets('wrapping.ts'),
            fileName: 'wrapping'
        }
    ];

    formCheckBoxSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('in-form.html'),
            fileName: 'in-form'
        },
        {
            language: 'typescript',
            component: 'InFormCheckBoxSample',
            code: getAssetFromModuleAssets('in-form.ts'),
            fileName: 'in-form'
        }
    ];
}
