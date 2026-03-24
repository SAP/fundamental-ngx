import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { LineClampDefaultExampleComponent } from './examples/default/line-clamp-default-example.component';

@Component({
    selector: 'app-line-clamp',
    templateUrl: './line-clamp-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        LineClampDefaultExampleComponent,
        CodeExampleComponent
    ]
})
export class LineClampDocsComponent {
    lineClampDefaultExample: ExampleFile[] = [
        getExampleFile('default/line-clamp-default-example.component.html'),
        getExampleFile('default/line-clamp-default-example.component.ts', {
            component: 'LineClampDefaultExampleComponent',
            selector: 'line-clamp-default-example'
        })
    ];
}
