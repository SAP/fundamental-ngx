import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import objectAttribute from '!./platform-object-attribute-examples/platform-object-attribute-example.component.html?raw';
import objectAttributeTruncate from '!./platform-object-attribute-examples/platform-object-attribute-truncate-example.component.html?raw';
import objectAttributeLink from '!./platform-object-attribute-examples/platform-object-attribute-link-example.component.html?raw';
import objectAttributeLinkTs from '!./platform-object-attribute-examples/platform-object-attribute-link-example.component?raw';

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

    objectAttributeLink: ExampleFile[] = [
        {
            language: 'html',
            code: objectAttributeLink,
            fileName: 'platform-object-attribute-link-example'
        },
        {
            language: 'typescript',
            fileName: 'platform-object-attribute-link-example',
            code: objectAttributeLinkTs,
            component: 'PlatformObjectAttributeLinkExampleComponent'
        }
    ];
}
