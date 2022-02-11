import { Component, ViewEncapsulation } from '@angular/core';
import defaultGenericTagExampleHtml from '!./examples/generic-tag-example/generic-tag-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-generic-tag',
    templateUrl: './generic-tag-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GenericTagDocsComponent {
    defaultGenericTagExample: ExampleFile[] = [
        {
            language: 'html',
            code: defaultGenericTagExampleHtml,
            fileName: 'generic-tag-example'
        }
    ];
}
