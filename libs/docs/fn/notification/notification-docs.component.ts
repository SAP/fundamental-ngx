import { Component } from '@angular/core';

const notificationDefaultExampleHtml = 'default/notification-default-example.component.html';
const notificationDefaultExampleTs = 'default/notification-default-example.component.ts';

const notificationPositionExampleHtml = 'position/notification-position-example.component.html';
const notificationPositionExampleTs = 'position/notification-position-example.component.ts';

const notificationSemanticExampleHtml = 'semantic/notification-semantic-state-example.component.html';
const notificationSemanticExampleTs = 'semantic/notification-semantic-state-example.component.ts';

const notificationWithComponentExampleHtml = 'default/component/notification-with-component-example.component.html';
const notificationWithComponentExampleTs = 'default/component/notification-with-component-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-notification',
    templateUrl: './notification-docs.component.html'
})
export class NotificationDocsComponent {
    notificationDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'notification-default-example',
            code: getAssetFromModuleAssets(notificationDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(notificationDefaultExampleTs),
            fileName: 'notification-default-example',
            component: 'NotificationDefaultExampleComponent'
        },
        {
            language: 'html',
            fileName: 'notification-with-component-example',
            code: getAssetFromModuleAssets(notificationWithComponentExampleHtml),
            name: 'Notification component (HTML)'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(notificationWithComponentExampleTs),
            fileName: 'notification-with-component-example',
            component: 'NotificationWithComponentExampleComponent',
            name: 'Notification component (Typescript)'
        }
    ];

    notificationSemanticExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'notification-semantic-state-example',
            code: getAssetFromModuleAssets(notificationSemanticExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(notificationSemanticExampleTs),
            fileName: 'notification-semantic-state-example',
            component: 'NotificationSemanticStateExampleComponent'
        }
    ];

    notificationPositionExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'notification-position-example',
            code: getAssetFromModuleAssets(notificationPositionExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(notificationPositionExampleTs),
            fileName: 'notification-position-example',
            component: 'NotificationPositionExampleComponent'
        }
    ];
}
