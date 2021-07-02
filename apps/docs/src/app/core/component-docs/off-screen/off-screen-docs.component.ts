import { Component } from '@angular/core';

import * as simpleOffscreen from '!raw-loader!./examples/off-screen-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
@Component({
    selector: 'app-off-screen-docs',
    templateUrl: './off-screen-docs.component.html'
})
export class OffScreenDocsComponent {
    offScreenBasic: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'OffScreenExampleComponent',
            code: simpleOffscreen,
            fileName: 'off-screen-example'
        }
    ];
}
