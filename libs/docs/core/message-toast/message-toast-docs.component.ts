import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { MessageToastExampleComponent } from './examples/message-toast-example.component';
import { MessageToastPositionExampleComponent } from './examples/message-toast-position-example.component';

const messageToastExampleScss = 'message-toast-example.component.scss';

const messageToastContentExample = 'message-toast-content-example.component.ts';
const messageToastExample = 'message-toast-example.component.ts';
const messageToastExampleHtml = 'message-toast-example.component.html';

const messageToastPositionExample = 'message-toast-position-example.component.ts';
const messageToastPositionExampleHtml = 'message-toast-position-example.component.html';

@Component({
    selector: 'app-message-toast',
    templateUrl: './message-toast-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        MessageToastExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        MessageToastPositionExampleComponent
    ]
})
export class MessageToastDocsComponent {
    messageToastComponentExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-toast-example',
            code: getAssetFromModuleAssets(messageToastExampleHtml)
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

    messageToastPositionComponentExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-toast-position-example',
            code: getAssetFromModuleAssets(messageToastPositionExampleHtml)
        },
        {
            language: 'typescript',
            fileName: 'message-toast-position-example',
            code: getAssetFromModuleAssets(messageToastPositionExample),
            component: 'MessageToastPositionExampleComponent',
            entryComponent: true,
            name: 'Main Component',
            main: true
        }
    ];
}
