import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { GenericTagDefaultExampleComponent } from './examples/generic-tag-default-example.component';
import { GenericTagGlyphExampleComponent } from './examples/generic-tag-glyph-example.component';

@Component({
    selector: 'app-generic-tag',
    templateUrl: './generic-tag-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        GenericTagDefaultExampleComponent,
        GenericTagGlyphExampleComponent
    ]
})
export class GenericTagDocsComponent {
    genericTagDefault: ExampleFile[] = [
        getExampleFile('generic-tag-default-example.component.html'),
        getExampleFile('generic-tag-default-example.component.ts', { component: 'GenericTagDefaultExampleComponent' })
    ];

    genericTagGlyph: ExampleFile[] = [
        getExampleFile('generic-tag-glyph-example.component.html'),
        getExampleFile('generic-tag-glyph-example.component.ts', { component: 'GenericTagGlyphExampleComponent' })
    ];
}
