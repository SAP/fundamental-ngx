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
import { UserMenuBasicExampleComponent } from './examples/basic-example/user-menu-basic-example.component';

@Component({
    templateUrl: './user-menu-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        CodeExampleComponent,
        UserMenuBasicExampleComponent
    ]
})
export class UserMenuDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('basic-example/user-menu-basic-example.component.ts', {
            component: 'UserMenuBasicExampleComponent'
        }),
        getExampleFile('basic-example/user-menu-basic-example.component.html')
    ];
}
