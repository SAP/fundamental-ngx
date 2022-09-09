import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const formMessageHtml = 'form-message-example.component.html';
const formMessageTs = 'form-message-example.component.ts';
const formMessageStateHtml = 'state-message/form-messaging-state-example.component.html';
const formMessageStateTs = 'state-message/form-messaging-state-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './form-message-docs.component.html'
})
export class FormMessageDocsComponent {
    formMessageExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formMessageHtml),
            fileName: 'form-message-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formMessageTs),
            fileName: 'form-message-example',
            component: 'FormMessageExampleComponent'
        }
    ];
    formMessagingStateExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formMessageStateHtml),
            fileName: 'form-messaging-state-example'
        },
        {
            language: 'typescript',
            component: 'FormMessagingStateExampleComponent',
            code: getAssetFromModuleAssets(formMessageStateTs),
            fileName: 'form-messaging-state-example'
        }
    ];
}
