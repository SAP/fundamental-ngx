import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { FormsDefaultExampleComponent } from './examples/default/forms-default-example.component';

@Component({
    selector: 'app-forms',
    templateUrl: './forms-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        FormsDefaultExampleComponent,
        CodeExampleComponent
    ]
})
export class FormsDocsComponent {
    formsDefaultExample: ExampleFile[] = [
        getExampleFile('default/forms-default-example.component.html'),
        getExampleFile('default/forms-default-example.component.ts')
    ];
}
