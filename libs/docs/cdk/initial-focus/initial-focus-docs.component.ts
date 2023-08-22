import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { NestedElementsExampleComponent } from './examples/nested-elements-example/nested-elements-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { InitialFocusDefaultExampleComponent } from './examples/default/initial-focus-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-initial-focus',
    templateUrl: './initial-focus-docs.component.html',
    standalone: true,
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
        getExampleFile('default/initial-focus-default-example.component.ts')
    ];

    initialFocusNestedElementExample: ExampleFile[] = [
        getExampleFile('nested-elements-example/nested-elements-example.component.html'),
        getExampleFile('nested-elements-example/nested-elements-example.component.ts')
    ];
}
