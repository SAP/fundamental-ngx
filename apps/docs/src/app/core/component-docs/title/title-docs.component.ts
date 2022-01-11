import { Component } from '@angular/core';

import titleSemanticHtml from '!./examples/title-semantic-example.component.html?raw';
import titleElisionHtml from '!./examples/title-elision-example.component.html?raw';
import titleVisualHtml from '!./examples/title-visual-example.component.html?raw';
import titleWrappingHtml from '!./examples/title-wrapping-example.component.html?raw';
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
