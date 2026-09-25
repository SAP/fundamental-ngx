import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { MessageViewDefaultExampleComponent } from './examples/default/message-view-default-example.component';

const defaultMessageViewHtml = 'default/message-view-default-example.component.html';
const defaultMessageViewTs = 'default/message-view-default-example.component.ts';

@Component({
    selector: 'app-message-view',
    templateUrl: './message-view-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        MessageViewDefaultExampleComponent,
        CodeExampleComponent
    ]
})
export class MessageViewDocsComponent {
    messageViewDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultMessageViewHtml),
            fileName: 'message-view-default-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(defaultMessageViewTs),
            fileName: 'message-view-default-example',
            component: 'MessageViewDefaultExampleComponent'
        }
    ];
}
