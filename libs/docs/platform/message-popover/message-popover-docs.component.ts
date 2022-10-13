import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-message-popover',
    templateUrl: './message-popover-docs.component.html'
})
export class MessagePopoverDocsComponent {
    messagePopoverDefaultExample: ExampleFile[] = [
        getExampleFile('default/message-popover-default-example.component.html'),
        getExampleFile('default/message-popover-default-example.component.ts')
    ];

    messagePopoverContainerExample: ExampleFile[] = [
        getExampleFile('form-container-example/form-container-example.component.html'),
        getExampleFile('default/form-container-example.component.ts')
    ];

    messagePopoverGeneratorExample: ExampleFile[] = [
        getExampleFile('form-generator-example/form-generator-component-example.component.html'),
        getExampleFile('default/form-generator-component-example.component.ts')
    ];
}
