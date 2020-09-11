import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import { PlatformTableDefaultExampleComponent } from './platform-table-examples/platform-table-default-example.component';

import * as platformTableDefaultSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.html';
import * as platformTableDefaultTsSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.ts';

@Component({
    selector: 'fdp-table-docs',
    templateUrl: './platform-table-docs.component.html'
})
export class PlatformTableDocsComponent implements OnInit {
    defaultTable: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableDefaultSrc,
            fileName: 'platform-table-default-example'
        },
        {
            language: 'typescript',
            code: platformTableDefaultTsSrc,
            fileName: 'platform-table-default-example',
            component: 'PlatformTableDefaultExampleComponent'
        }
    ];

    ngOnInit(): void {}
}
