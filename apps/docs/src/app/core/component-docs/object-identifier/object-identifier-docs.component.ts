import { Component } from '@angular/core';
import ObjectIdentifierDefaultExample from '!./examples/object-identifier-default-example.component.html?raw';
import ObjectIdentifierLinksExample from '!./examples/object-identifier-link-example.component.html?raw';
import ObjectIdentifierBoldExampleHtml from '!./examples/object-identifier-bold-example.component.html?raw';
import ObjectIdentifierDescriptiveExampleHtml from '!./examples/object-identifier-descriptive-example.component.html?raw';
import ObjectIdentifierTableExampleHtml from '!./examples/object-identifier-table-example.component.html?raw';
import ObjectIdentifierTableExampleTs from '!./examples/object-identifier-table-example.component.ts?raw';
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
