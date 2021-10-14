import { Component } from '@angular/core';
import * as ObjectIdentifierDefaultExample from '!raw-loader!./examples/object-identifier-default-example.component.html';
import * as ObjectIdentifierLinksExample from '!raw-loader!./examples/object-identifier-link-example.component.html';
import * as ObjectIdentifierBoldExampleHtml from '!raw-loader!./examples/object-identifier-bold-example.component.html';
import * as ObjectIdentifierDescriptiveExampleHtml from '!raw-loader!./examples/object-identifier-descriptive-example.component.html';
import * as ObjectIdentifierTableExampleHtml from '!raw-loader!./examples/object-identifier-table-example.component.html';
import * as ObjectIdentifierTableExampleTs from '!raw-loader!./examples/object-identifier-table-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-object-identifier',
    templateUrl: './object-identifier-docs.component.html'
})
export class ObjectIdentifierDocsComponent {
    defaultObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectIdentifierDefaultExample,
            fileName: 'object-identifier-default-example'
        }
    ];

    linkObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectIdentifierLinksExample,
            fileName: 'object-identifier-link-example'
        }
    ];

    boldObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectIdentifierBoldExampleHtml,
            fileName: 'object-identifier-bold-example'
        }
    ];

    descriptiveObjectIdentifier: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectIdentifierDescriptiveExampleHtml,
            fileName: 'object-identifier-descriptive-example'
        }
    ];

    tableObjectIdentifierType: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectIdentifierTableExampleHtml,
            fileName: 'object-identifier-table-example',
            component: 'ObjectIdentifierTableExampleComponent'
        },
        {
            language: 'typescript',
            component: 'ObjectIdentifierTableExampleComponent',
            code: ObjectIdentifierTableExampleTs,
            fileName: 'object-identifier-table-example'
        }
    ];
}
