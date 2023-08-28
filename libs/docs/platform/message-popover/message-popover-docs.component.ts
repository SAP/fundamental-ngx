import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { MessagePopoverCustomConfigExampleComponent } from './examples/custom-config/message-popover-custom-config-example.component';
import { MessagePopoverDefaultExampleComponent } from './examples/default/message-popover-default-example.component';
import { FormContainerExampleComponent } from './examples/form-container/form-container-example.component';
import { FormGeneratorComponentExample } from './examples/form-generator/form-generator-component-example.component';

@Component({
    selector: 'app-message-popover',
    templateUrl: './message-popover-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        MessagePopoverDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        RouterLink,
        FormContainerExampleComponent,
        MessagePopoverCustomConfigExampleComponent,
        FormGeneratorComponentExample
    ]
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
