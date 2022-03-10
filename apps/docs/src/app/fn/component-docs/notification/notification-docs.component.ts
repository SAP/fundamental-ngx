import { Component } from '@angular/core';

import notificationDefaultExampleHtml from '!./examples/default/notification-default-example.component.html?raw';
import notificationDefaultExampleTs from '!./examples/default/notification-default-example.component.ts?raw';

import notificationPositionExampleHtml from '!./examples/position/notification-position-example.component.html?raw';
import notificationPositionExampleTs from '!./examples/position/notification-position-example.component.ts?raw';

import notificationSemanticExampleHtml from '!./examples/semantic/notification-semantic-state-example.component.html?raw';
import notificationSemanticExampleTs from '!./examples/semantic/notification-semantic-state-example.component.ts?raw';

import notificationWithComponentExampleHtml from '!./examples/default/component/notification-with-component-example.component.html?raw';
import notificationWithComponentExampleTs from '!./examples/default/component/notification-with-component-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-notification',
    templateUrl: './notification-docs.component.html'
})
export class NotificationDocsComponent {
    notificationDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'notification-default-example',
            code: notificationDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: notificationDefaultExampleTs,
            fileName: 'notification-default-example',
            component: 'NotificationDefaultExampleComponent'
        },
        {
            language: 'html',
            fileName: 'notification-with-component-example',
            code: notificationWithComponentExampleHtml,
            name: 'Notification component (HTML)'
        },
        {
            language: 'typescript',
            code: notificationWithComponentExampleTs,
            fileName: 'notification-with-component-example',
            component: 'NotificationWithComponentExampleComponent',
            name: 'Notification component (Typescript)'
        }
    ];

    notificationSemanticExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'notification-semantic-state-example',
            code: notificationSemanticExampleHtml
        },
        {
            language: 'typescript',
            code: notificationSemanticExampleTs,
            fileName: 'notification-semantic-state-example',
            component: 'NotificationSemanticStateExampleComponent'
        }
    ];

    notificationPositionExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'notification-position-example',
            code: notificationPositionExampleHtml
        },
        {
            language: 'typescript',
            code: notificationPositionExampleTs,
            fileName: 'notification-position-example',
            component: 'NotificationPositionExampleComponent'
        }
    ];
}
