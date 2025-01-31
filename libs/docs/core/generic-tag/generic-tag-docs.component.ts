import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { GenericTagDefaultExampleComponent } from './examples/generic-tag-default-example.component';

@Component({
    selector: 'app-generic-tag',
    templateUrl: './generic-tag-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        GenericTagDefaultExampleComponent
    ]
})
export class GenericTagDocsComponent {
    genericTagDefault: ExampleFile[] = [
        getExampleFile('generic-tag-default-example.component.html'),
        getExampleFile('generic-tag-default-example.component.ts', { component: 'GenericTagDefaultExampleComponent' })
    ];
}
