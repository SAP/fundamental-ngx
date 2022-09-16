import { Component } from '@angular/core';

const messageToastDefaultExampleHtml = 'default/message-toast-default-example.component.html';
const messageToastDefaultExampleTs = 'default/message-toast-default-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-message-toast',
    templateUrl: './message-toast-docs.component.html'
})
export class MessageToastDocsComponent {
    messageToastDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-toast-default-example',
            code: getAssetFromModuleAssets(messageToastDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(messageToastDefaultExampleTs),
            fileName: 'message-toast-default-example',
            component: 'MessageToastDefaultExampleComponent'
        }
    ];
}
