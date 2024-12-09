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
import { ToolLayoutPhoneExampleComponent } from './examples/phone-example/tool-layout-phone-example.component';
import { ToolLayoutTabletExampleComponent } from './examples/tablet-example/tool-layout-tablet-example.component';

@Component({
    templateUrl: './tool-layout-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        CodeExampleComponent,
        ToolLayoutBasicExampleComponent,
        ToolLayoutTabletExampleComponent,
        ToolLayoutPhoneExampleComponent
    ]
})
export class ToolLayoutDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('basic-example/tool-layout-basic-example.component.ts', {
            selector: 'tool-layout-basic-example',
            component: 'ToolLayoutBasicExampleComponent'
        }),
        getExampleFile('basic-example/tool-layout-basic-example.component.html')
    ];

    tabletExample: ExampleFile[] = [
        getExampleFile('tablet-example/tool-layout-tablet-example.component.ts', {
            selector: 'tool-layout-tablet-example',
            component: 'ToolLayoutTabletExampleComponent'
        }),
        getExampleFile('tablet-example/tool-layout-tablet-example.component.html')
    ];

    phoneExample: ExampleFile[] = [
        getExampleFile('phone-example/tool-layout-phone-example.component.ts', {
            selector: 'tool-layout-phone-example',
            component: 'ToolLayoutPhoneExampleComponent'
        }),
        getExampleFile('phone-example/tool-layout-phone-example.component.html')
    ];
}
