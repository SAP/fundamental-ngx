import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { TabbableDefaultExampleComponent } from './examples/default/tabbable-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-tabbable',
    templateUrl: './tabbable-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TabbableDefaultExampleComponent,
        CodeExampleComponent
    ]
})
export class TabbableDocsComponent {
    tabbableDefaultExample: ExampleFile[] = [
        getExampleFile('default/tabbable-default-example.component.html'),
        getExampleFile('default/tabbable-default-example.component.ts')
    ];
}
