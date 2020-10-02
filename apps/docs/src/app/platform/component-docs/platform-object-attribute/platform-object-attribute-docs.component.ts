import { Component } from '@angular/core';
import * as objectAttribute from '!raw-loader!./platform-object-attribute-examples/platform-object-attribute-example.component.html';
import * as objectAttributeTruncate from '!raw-loader!./platform-object-attribute-examples/platform-object-attribute-truncate-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-object-attribute',
    templateUrl: './platform-object-attribute-docs.component.html'
})
export class PlatformObjectAttributeDocsComponent {
    objectAttribute: ExampleFile[] = [
        {
            language: 'html',
            code: objectAttribute,
            fileName: 'platform-object-attribute-example'
        }
    ];

    objectAttributeTruncate: ExampleFile[] = [
        {
            language: 'html',
            code: objectAttributeTruncate,
            fileName: 'platform-object-attribute-truncate-example'
        }
    ];
}
