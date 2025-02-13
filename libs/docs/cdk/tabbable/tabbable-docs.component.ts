import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { TabbableDefaultExampleComponent } from './examples/default/tabbable-default-example.component';

@Component({
    selector: 'app-tabbable',
    templateUrl: './tabbable-docs.component.html',
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
        getExampleFile('default/tabbable-default-example.component.ts', {
            component: 'TabbableDefaultExampleComponent',
            selector: 'tabbable-default-example'
        })
    ];
}
