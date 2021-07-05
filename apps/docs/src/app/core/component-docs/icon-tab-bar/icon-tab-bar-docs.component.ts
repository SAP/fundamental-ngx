import { Component, OnInit } from '@angular/core';

import * as iconTabBarHtml from '!raw-loader!./examples/icon-tab-bar-example.component';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'fd-icon-tab-bar-docs',
    templateUrl: './icon-tab-bar-docs.component.html'
})
export class IconTabBarDocsComponent implements OnInit {

    iconTabBarHtml: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarHtml,
            fileName: 'icon-tab-bar-example'
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
