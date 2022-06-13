import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import contentDensitySrc from '!./examples/content-density-example.component.ts?raw';
import contentDensityHTMLSrc from '!./examples/content-density-example.component.html?raw';

@Component({
    selector: 'app-content-density-docs',
    templateUrl: 'content-density-docs.component.html'
})
export class ContentDensityDocsComponent {
    contentDensityExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: contentDensitySrc,
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        },
        {
            language: 'html',
            code: contentDensityHTMLSrc,
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        }
    ];
}
