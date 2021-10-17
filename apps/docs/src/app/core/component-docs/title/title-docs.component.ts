import { Component } from '@angular/core';

import * as titleSemanticHtml from '!raw-loader!./examples/title-semantic-example.component.html';
import * as titleElisionHtml from '!raw-loader!./examples/title-elision-example.component.html';
import * as titleVisualHtml from '!raw-loader!./examples/title-visual-example.component.html';
import * as titleWrappingHtml from '!raw-loader!./examples/title-wrapping-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-title',
    templateUrl: './title-docs.component.html'
})
export class TitleDocsComponent {
    titleSemanticExample: ExampleFile[] = [
        {
            language: 'html',
            code: titleSemanticHtml,
            fileName: 'title-semantic-example'
        }
    ];

    titleElisionExample: ExampleFile[] = [
        {
            language: 'html',
            code: titleElisionHtml,
            fileName: 'title-elision-example'
        }
    ];

    titleVisualExample: ExampleFile[] = [
        {
            language: 'html',
            code: titleVisualHtml,
            fileName: 'title-visual-example'
        }
    ];

    titleWrappingExample: ExampleFile[] = [
        {
            language: 'html',
            code: titleWrappingHtml,
            fileName: 'title-wrapping-example'
        }
    ];
}
