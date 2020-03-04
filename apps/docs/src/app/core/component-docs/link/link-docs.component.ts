import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as linkH from '!raw-loader!./examples/link-example.component.html';
import * as linkTs from '!raw-loader!./examples/link-example.component.ts';


@Component({
    selector: 'app-icon',
    templateUrl: './link-docs.component.html'
})
export class LinkDocsComponent {

    link: ExampleFile[] = [
        {
            language: 'html',
            code: linkH,
            fileName: 'link-example',
        },
        {
            language: 'typescript',
            code: linkTs,
            fileName: 'link-example',
            component: 'LinkExampleComponent'
        }
    ];

}
