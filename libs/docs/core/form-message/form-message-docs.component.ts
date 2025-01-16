import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { FormMessageExampleComponent } from './examples/form-message-example.component';
import { FormMessagingStateExampleComponent } from './examples/state-message/form-messaging-state-example.component';

const formMessageHtml = 'form-message-example.component.html';
const formMessageTs = 'form-message-example.component.ts';
const formMessageStateHtml = 'state-message/form-messaging-state-example.component.html';
const formMessageStateTs = 'state-message/form-messaging-state-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './form-message-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        FormMessageExampleComponent,
        CodeExampleComponent,
        FormMessagingStateExampleComponent
    ]
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
