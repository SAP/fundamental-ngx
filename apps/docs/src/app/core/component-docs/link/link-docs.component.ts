import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import linkH from '!./examples/link-example.component.html?raw';
import linkTs from '!./examples/link-example.component.ts?raw';

@Component({
    selector: 'app-icon',
    templateUrl: './link-docs.component.html'
})
export class LinkDocsComponent {
    link: ExampleFile[] = [
        {
            language: 'html',
            code: linkH,
            fileName: 'link-example'
        },
        {
            language: 'typescript',
            code: linkTs,
            fileName: 'link-example',
            component: 'LinkExampleComponent'
        }
    ];
}
