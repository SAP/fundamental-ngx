import { Component, OnInit } from '@angular/core';
import * as linkTypesSrc from '!raw-loader!./link-example.component.html';
import * as linkTypesSrcts from '!raw-loader!./link-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'fd-link-example',
    templateUrl: './link-example.component.html',
    styleUrls: ['./link-example.component.scss']
})
export class LinkExampleComponent implements OnInit {
    defaultselectType: ExampleFile[] = [
        {
            language: 'html',
            code: linkTypesSrc,
            fileName: 'link-example'
        },
        {
            language: 'typescript',
            code: linkTypesSrcts,
            fileName: 'link-example',
            component: 'LinkComponent'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
