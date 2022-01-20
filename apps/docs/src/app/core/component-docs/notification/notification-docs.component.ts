import { Component } from '@angular/core';

import componentAsContentTs from '!./examples/component-as-content/notification-component-as-content-example.component.ts?raw';
import contentTs from '!./examples/component-as-content/notification-content.component.ts?raw';
import optionsTs from '!./examples/notification-options/notification-options-example.component.ts?raw';
import optionsH from '!./examples/notification-options/notification-options-example.component.html?raw';
import templateTs from '!./examples/template-as-content/notification-open-template-example.component.ts?raw';
import templateH from '!./examples/template-as-content/notification-open-template-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import groupTs from '!./examples/notification-group/notification-group-example.component.ts?raw';
import groupH from '!./examples/notification-group/notification-group-example.component.html?raw';

@Component({
    selector: 'app-notification',
    templateUrl: './notification-docs.component.html'
})
export class NotificationDocsComponent {
    componentAsContent: ExampleFile[] = [
        {
            language: 'typescript',
            code: componentAsContentTs,
            fileName: 'notification-component-as-content-example',
            component: 'NotificationComponentAsContentExampleComponent',
            name: 'Usage of Component',
            main: true
        },
        {
            language: 'typescript',
            code: contentTs,
            name: 'Content',
            fileName: 'notification-content',
            component: 'NotificationExampleContentComponent',
            entryComponent: true
        }
    ];

    options: ExampleFile[] = [
        {
            language: 'typescript',
            code: optionsTs,
            fileName: 'notification-options-example',
            component: 'NotificationOptionsExampleComponent'
        },
        {
            language: 'html',
            code: optionsH,
            fileName: 'notification-options-example'
        }
    ];

    template: ExampleFile[] = [
        {
            language: 'typescript',
            code: templateTs,
            component: 'NotificationOpenTemplateExampleComponent',
            fileName: 'notification-open-template-example'
        },
        {
            language: 'html',
            code: templateH,
            fileName: 'notification-open-template-example'
        }
    ];

    group: ExampleFile[] = [
        {
            language: 'typescript',
            code: groupTs,
            fileName: 'notification-group-example',
            component: 'NotificationGroupExampleComponent'
        },
        {
            language: 'html',
            code: groupH,
            fileName: 'notification-group-example'
        }
    ];
}
