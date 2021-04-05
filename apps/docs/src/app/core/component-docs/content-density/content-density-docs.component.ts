import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as contentDensitySrc from '!raw-loader!./examples/content-density-example.component.ts';

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
        }
    ];
}
