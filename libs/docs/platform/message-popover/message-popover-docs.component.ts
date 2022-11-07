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
        getExampleFile('form-container/form-container-example.component.html'),
        getExampleFile('form-container/form-container-example.component.ts')
    ];

    messagePopoverGeneratorExample: ExampleFile[] = [
        getExampleFile('form-generator/form-generator-component-example.component.html'),
        getExampleFile('form-generator/form-generator-component-example.component.ts')
    ];

    messagePopoverConfigExample: ExampleFile[] = [
        getExampleFile('custom-config/message-popover-custom-config-example.component.html'),
        getExampleFile('custom-config/message-popover-custom-config-example.component.ts'),
        getExampleFile('custom-config/example-module.ts')
    ];
}
