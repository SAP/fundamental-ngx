import { Component } from '@angular/core';

import * as componentAsContentTs from '!raw-loader!./examples/component-as-content/notification-component-as-content-example.component.ts';
import * as contentTs from '!raw-loader!./examples/component-as-content/notification-content.component.ts';
import * as groupTs from '!raw-loader!./examples/group-notification/notification-group-template-example.component.ts';
import * as groupH from '!raw-loader!./examples/group-notification/notification-group-template-example.component.html';
import * as optionsContentTs from '!raw-loader!./examples/notification-options/notification-options-content.component.ts';
import * as optionsTs from '!raw-loader!./examples/notification-options/notification-options-example.component.ts';
import * as optionsH from '!raw-loader!./examples/notification-options/notification-options-example.component.html';
import * as templateTs from '!raw-loader!./examples/template-as-content/notification-open-template-example.component.ts';
import * as templateH from '!raw-loader!./examples/template-as-content/notification-open-template-example.component.html';
import * as objectTs from '!raw-loader!./examples/notification-as-object.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

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
            component: 'NotificationContentComponent',
            entryComponent: true
        }
    ];

    groups: ExampleFile[] = [
        {
            language: 'typescript',
            code: groupTs,
            component: 'NotificationGroupTemplateExampleComponent',
            fileName: 'notification-group-template-example'
        },
        {
            language: 'html',
            code: groupH,
            fileName: 'notification-group-template-example'
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
            language: 'typescript',
            code: optionsContentTs,
            fileName: 'notification-options-content',
            component: 'NotificationOptionsContentComponent',
            entryComponent: true
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

    object: ExampleFile[] = [
        {
            language: 'typescript',
            code: objectTs,
            component: 'NotificationAsObjectExampleComponent',
            fileName: 'notification-component-as-object-example'
        }
    ];

}
