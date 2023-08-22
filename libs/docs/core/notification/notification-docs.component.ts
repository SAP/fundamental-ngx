import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { NotificationMobileExampleComponent } from './examples/notification-mobile/notification-mobile-example.component';
import { NotificationGroupExampleComponent } from './examples/notification-group/notification-group-example.component';
import { NotificationComponentAsContentExampleComponent } from './examples/component-as-content/notification-component-as-content-example.component';
import { NotificationOpenTemplateExampleComponent } from './examples/template-as-content/notification-open-template-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { NotificationOptionsExampleComponent } from './examples/notification-options/notification-options-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const componentAsContentTs = 'component-as-content/notification-component-as-content-example.component.ts';
const contentTs = 'component-as-content/notification-content.component.ts';
const optionsTs = 'notification-options/notification-options-example.component.ts';
const optionsH = 'notification-options/notification-options-example.component.html';
const templateTs = 'template-as-content/notification-open-template-example.component.ts';
const templateH = 'template-as-content/notification-open-template-example.component.html';
const groupTs = 'notification-group/notification-group-example.component.ts';
const groupH = 'notification-group/notification-group-example.component.html';
const mobileTs = 'notification-mobile/notification-mobile-example.component.ts';
const mobileH = 'notification-mobile/notification-mobile-example.component.html';

@Component({
    selector: 'app-notification',
    templateUrl: './notification-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        NotificationOptionsExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent,
        NotificationGroupExampleComponent,
        NotificationMobileExampleComponent
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

    mobile: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(mobileTs),
            fileName: 'notification-mobile-example',
            component: 'NotificationMobileExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(mobileH),
            fileName: 'notification-mobile-example'
        }
    ];
}
