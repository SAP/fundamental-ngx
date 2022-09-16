import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const messageToastExampleScss = 'message-toast-example.component.scss';

const messageToastContentExample = 'message-toast-content-example.component.ts';
const messageToastExample = 'message-toast-example.component.ts';
const messageToastExampleHtml = 'message-toast-example.component.html';

@Component({
    selector: 'app-message-toast',
    templateUrl: './message-toast-docs.component.html'
})
export class MessageToastDocsComponent {
    messageToastComponentExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-toast-example',
            code: getAssetFromModuleAssets(messageToastExampleHtml),
            scssFileCode: getAssetFromModuleAssets(messageToastExampleScss)
        },
        {
            language: 'typescript',
            fileName: 'message-toast-example',
            code: getAssetFromModuleAssets(messageToastExample),
            component: 'MessageToastExampleComponent',
            entryComponent: true,
            name: 'Main Component',
            main: true
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(messageToastContentExample),
            fileName: 'message-toast-content-example',
            component: 'MessageToastContentExampleComponent',
            name: 'Content Component',
            entryComponent: true
        }
    ];
}
