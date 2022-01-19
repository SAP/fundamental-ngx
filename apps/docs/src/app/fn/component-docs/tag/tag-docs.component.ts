import { Component, ViewEncapsulation } from '@angular/core';
import tagSrc from '!./examples/tag-example/tag-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-tag',
    templateUrl: './tag-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TagDocsComponent {
    tagExample: ExampleFile[] = [
        {
            language: 'html',
            code: tagSrc,
            fileName: 'tag-example'
        }
    ];
}
