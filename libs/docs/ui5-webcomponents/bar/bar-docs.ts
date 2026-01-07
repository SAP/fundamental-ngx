import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AccessibleRoleBarSample } from './examples/accessible-role';
import { BasicBarSample } from './examples/basic-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';

@Component({
    selector: 'ui5-bar-docs',
    templateUrl: './bar-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicBarSample,
        AccessibleRoleBarSample
    ]
})
export class BarDocs {
    basicBarSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicBarSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ];

    accessibleRoleBarSamples: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('accessible-role.html'),
            originalFileName: 'accessible-role'
        },
        {
            language: 'typescript',
            component: 'AccessibleRoleBarSample',
            code: getAssetFromModuleAssets('accessible-role.ts'),
            originalFileName: 'accessible-role'
        }
    ];
}
