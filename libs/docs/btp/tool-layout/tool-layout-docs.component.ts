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
import { ToolLayoutBasicExampleComponent } from './examples/basic-example/tool-layout-basic-example.component';

@Component({
    templateUrl: './tool-layout-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        CodeExampleComponent,
        ToolLayoutBasicExampleComponent
    ]
})
export class ToolLayoutDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('basic-example/tool-layout-basic-example.component.ts', {
            component: 'ToolLayoutBasicExampleComponent'
        }),
        getExampleFile('basic-example/tool-layout-basic-example.component.ts')
    ];
}
