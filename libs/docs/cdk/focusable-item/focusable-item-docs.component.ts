import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { FocusableItemDefaultExampleComponent } from './examples/default/focusable-item-default-example.component';

@Component({
    selector: 'app-focusable-item',
    templateUrl: './focusable-item-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        FocusableItemDefaultExampleComponent,
        CodeExampleComponent
    ]
})
export class FocusableItemDocsComponent {
    focusableItemDefaultExample: ExampleFile[] = [
        getExampleFile('default/focusable-item-default-example.component.html'),
        getExampleFile('default/focusable-item-default-example.component.ts')
    ];
}
