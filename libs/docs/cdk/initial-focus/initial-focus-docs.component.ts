import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { InitialFocusDefaultExampleComponent } from './examples/default/initial-focus-default-example.component';
import { NestedElementsExampleComponent } from './examples/nested-elements-example/nested-elements-example.component';

@Component({
    selector: 'app-initial-focus',
    templateUrl: './initial-focus-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        InitialFocusDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        NestedElementsExampleComponent
    ]
})
export class InitialFocusDocsComponent {
    initialFocusDefaultExample: ExampleFile[] = [
        getExampleFile('default/initial-focus-default-example.component.html'),
        getExampleFile('default/initial-focus-default-example.component.ts', {
            component: 'InitialFocusDefaultExampleComponent',
            selector: 'initial-focus-default-example'
        })
    ];

    initialFocusNestedElementExample: ExampleFile[] = [
        getExampleFile('nested-elements-example/nested-elements-example.component.html'),
        getExampleFile('nested-elements-example/nested-elements-example.component.ts', {
            component: 'NestedElementsExampleComponent',
            selector: 'initial-focus-nested-elements-example'
        })
    ];
}
