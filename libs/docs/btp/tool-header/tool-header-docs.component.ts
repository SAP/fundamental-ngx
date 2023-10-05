import { Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { ToolHeaderBasicExampleComponent } from './examples/basic-example/tool-header-basic-example.component';

@Component({
    templateUrl: './tool-header-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        CodeExampleComponent,
        ToolHeaderBasicExampleComponent
    ]
})
export class ToolHeaderDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('basic-example/tool-header-basic-example.component.ts', {
            component: 'ToolHeaderBasicExampleComponent'
        }),
        getExampleFile('basic-example/tool-header-basic-example.component.ts')
    ];
}
