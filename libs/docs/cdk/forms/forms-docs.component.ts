import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { FormsDefaultExampleComponent } from './examples/default/forms-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
