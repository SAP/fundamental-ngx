import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';
import defaultExampleHtml from '!./examples/default-example/default-example.component.html?raw';
import defaultExampleTs from '!./examples/default-example/default-example.component.ts?raw';

@Component({
    selector: 'app-tabs',
    templateUrl: './selectable-list-docs.component.html',
    styleUrls: ['selectable-list-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectableListDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: defaultExampleHtml,
            language: 'html',
            fileName: 'selectable-list-default-example',
            component: 'SelectableListDefaultExample'
        },
        {
            code: defaultExampleTs,
            language: 'ts',
            fileName: 'selectable-list-default-example',
            component: 'SelectableListDefaultExample'
        }
    ];

    constructor() {}
}
