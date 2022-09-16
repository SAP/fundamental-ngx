import { Component } from '@angular/core';

const messageStripDefaultExampleHtml = 'default/message-strip-default-example.component.html';
const messageStripDefaultExampleTs = 'default/message-strip-default-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-message-strip',
    templateUrl: './message-strip-docs.component.html'
})
export class MessageStripDocsComponent {
    messageStripDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-strip-default-example',
            code: getAssetFromModuleAssets(messageStripDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(messageStripDefaultExampleTs),
            fileName: 'message-strip-default-example',
            component: 'MessageStripDefaultExampleComponent'
        }
    ];
}
