import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { NestedExampleComponent } from './examples/nested-example.component';
import { ToolHeaderExampleComponent } from './examples/tool-header-example.component';

@Component({
    templateUrl: './button-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ToolHeaderExampleComponent,
        MessageStripComponent,
        NestedExampleComponent
    ]
})
export class ButtonDocsComponent {
    toolHeaderExample: ExampleFile[] = [
        getExampleFile('tool-header-example.component.ts', {
            component: 'ToolHeaderExampleComponent',
            selector: 'button-tool-header-example'
        })
    ];
    nestedExample: ExampleFile[] = [
        getExampleFile('nested-example.component.ts', {
            component: 'NestedExampleComponent',
            selector: 'button-nested-example'
        })
    ];
}
