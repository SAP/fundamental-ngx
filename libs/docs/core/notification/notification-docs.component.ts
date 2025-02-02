import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { NotificationComponentAsContentExampleComponent } from './examples/component-as-content/notification-component-as-content-example.component';
import { NotificationGroupExampleComponent } from './examples/notification-group/notification-group-example.component';
import { NotificationOptionsExampleComponent } from './examples/notification-options/notification-options-example.component';
import { NotificationOpenTemplateExampleComponent } from './examples/template-as-content/notification-open-template-example.component';

const componentAsContentTs = 'component-as-content/notification-component-as-content-example.component.ts';
const contentTs = 'component-as-content/notification-content.component.ts';
const contentHtml = 'component-as-content/notification-content.component.html';
const optionsTs = 'notification-options/notification-options-example.component.ts';
const optionsH = 'notification-options/notification-options-example.component.html';
const templateTs = 'template-as-content/notification-open-template-example.component.ts';
const templateH = 'template-as-content/notification-open-template-example.component.html';
const groupTs = 'notification-group/notification-group-example.component.ts';
const groupH = 'notification-group/notification-group-example.component.html';

@Component({
    selector: 'app-notification',
    templateUrl: './notification-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        NotificationOptionsExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent,
        NotificationGroupExampleComponent
    ]
})
export class NotificationDocsComponent {
    componentAsContent: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(componentAsContentTs),
            fileName: 'notification-component-as-content-example',
            component: 'NotificationComponentAsContentExampleComponent',
            name: 'Usage of Component',
            main: true
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentTs),
            name: 'Content',
            fileName: 'notification-content',
            component: 'NotificationExampleContentComponent',
            entryComponent: true
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(contentHtml),
            fileName: 'notification-content',
            component: 'NotificationExampleContentComponent'
        }
    ];

    options: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(optionsTs),
            fileName: 'notification-options-example',
            component: 'NotificationOptionsExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(optionsH),
            fileName: 'notification-options-example'
        }
    ];

    template: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(templateTs),
            component: 'NotificationOpenTemplateExampleComponent',
            fileName: 'notification-open-template-example'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(templateH),
            fileName: 'notification-open-template-example'
        }
    ];

    group: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(groupTs),
            fileName: 'notification-group-example',
            component: 'NotificationGroupExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(groupH),
            fileName: 'notification-group-example'
        }
    ];
}
