import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ActionsSample } from './examples/actions-sample';
import { BasicSample } from './examples/basic-sample';
import { GroupItemsSample } from './examples/group-items-sample';
import { ReadSample } from './examples/read-sample';
import { StatesSample } from './examples/states-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const statesSampleTs = 'states-sample.ts';
const statesSampleHtml = 'states-sample.html';
const readSampleTs = 'read-sample.ts';
const readSampleHtml = 'read-sample.html';
const actionsSampleTs = 'actions-sample.ts';
const actionsSampleHtml = 'actions-sample.html';
const groupItemsSampleTs = 'group-items-sample.ts';
const groupItemsSampleHtml = 'group-items-sample.html';

@Component({
    selector: 'ui5-doc-notification-list',
    templateUrl: './notification-list-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        StatesSample,
        ReadSample,
        ActionsSample,
        GroupItemsSample
    ]
})
export class NotificationListDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample',
            component: 'BasicSample'
        }
    ]);

    statesExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(statesSampleTs),
            originalFileName: 'states-sample',
            component: 'StatesSample',
            typescriptFileCode: getAssetFromModuleAssets(statesSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(statesSampleHtml),
            originalFileName: 'states-sample',
            component: 'StatesSample'
        }
    ]);

    readExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(readSampleTs),
            originalFileName: 'read-sample',
            component: 'ReadSample',
            typescriptFileCode: getAssetFromModuleAssets(readSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(readSampleHtml),
            originalFileName: 'read-sample',
            component: 'ReadSample'
        }
    ]);

    actionsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(actionsSampleTs),
            originalFileName: 'actions-sample',
            component: 'ActionsSample',
            typescriptFileCode: getAssetFromModuleAssets(actionsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(actionsSampleHtml),
            originalFileName: 'actions-sample',
            component: 'ActionsSample'
        }
    ]);

    groupItemsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(groupItemsSampleTs),
            originalFileName: 'group-items-sample',
            component: 'GroupItemsSample',
            typescriptFileCode: getAssetFromModuleAssets(groupItemsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(groupItemsSampleHtml),
            originalFileName: 'group-items-sample',
            component: 'GroupItemsSample'
        }
    ]);
}
