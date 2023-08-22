import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { FocusableItemDefaultExampleComponent } from './examples/default/focusable-item-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-focusable-item',
    templateUrl: './focusable-item-docs.component.html',
    standalone: true,
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
