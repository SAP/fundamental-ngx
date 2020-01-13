import { Component, OnInit } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformInputExampleSrc from '!raw-loader!./platform-input-example/platform-input-example.component.html';
import * as platformInputExampleTsSrc from '!raw-loader!./platform-input-example/platform-input-example.component.ts';


@Component({
    selector: 'fd-platform-input-docs',
    templateUrl: './platform-input-docs.component.html'
})
export class PlatformInputDocsComponent implements OnInit {
    defaultselectType: ExampleFile[] = [
        {
            language: 'html',
            code: platformInputExampleSrc,
            fileName: 'platform-select-types-default-example'
        },
        {
            language: 'typescript',
            code: platformInputExampleTsSrc,
            fileName: 'platform-input-example.component',
            component: 'PlatformInputExampleComponent'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
