import { Component } from '@angular/core';

import * as componentAsContentTs from '!raw-loader!./examples/component-as-content/notification-component-as-content-example.component.ts';
import * as contentTs from '!raw-loader!./examples/component-as-content/notification-content.component.ts';
import * as groupTs from '!raw-loader!./examples/group-notification/notification-group-template-example.component.ts';
import * as groupH from '!raw-loader!./examples/group-notification/notification-group-template-example.component.html';
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
            name: 'Usage of Component'
        },
        {
            language: 'typescript',
            code: contentTs,
            name: 'Content'
        }
    ];

    groups: ExampleFile[] = [
        {
            language: 'typescript',
            code: groupTs
        },
        {
            language: 'html',
            code: groupH
        }
    ];

    options: ExampleFile[] = [
        {
            language: 'typescript',
            code: optionsTs
        },
        {
            language: 'html',
            code: optionsH
        },
        {
            language: 'typescript',
            code: contentTs,
            name: 'Content'
        }
    ];

    template: ExampleFile[] = [
        {
            language: 'typescript',
            code: templateTs
        },
        {
            language: 'html',
            code: templateH
        },
    ];

    object: ExampleFile[] = [
        {
            language: 'typescript',
            code: objectTs
        }
    ];

}
