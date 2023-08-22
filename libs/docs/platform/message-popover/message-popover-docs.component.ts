import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { FormGeneratorComponentExample } from './examples/form-generator/form-generator-component-example.component';
import { MessagePopoverCustomConfigExampleComponent } from './examples/custom-config/message-popover-custom-config-example.component';
import { FormContainerExampleComponent } from './examples/form-container/form-container-example.component';
import { RouterLink } from '@angular/router';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { MessagePopoverDefaultExampleComponent } from './examples/default/message-popover-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
