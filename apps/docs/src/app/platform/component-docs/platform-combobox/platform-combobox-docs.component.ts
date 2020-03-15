import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformComboboxDefaultTypesSrc from '!raw-loader!./platform-combobox-examples/platform-combobox-types-default-example.component.html';
import * as platformComboboxDefaultTypesTsSrc from '!raw-loader!./platform-combobox-examples/platform-combobox-types-default-example.component.ts';


@Component({
    selector: 'fd-combobox-docs',
    templateUrl: './platform-combobox-docs.component.html'
})
export class PlatformComboboxDocsComponent implements OnInit {
    defaultComboboxType: ExampleFile[] = [
        {
            language: 'html',
            code: platformComboboxDefaultTypesSrc,
            fileName: 'platform-combobox-types-default-example'
        },
        {
            language: 'typescript',
            code: platformComboboxDefaultTypesTsSrc,
            fileName: 'platform-combobox-types-default-example',
            component: 'PlatformComboboxTypesDefaultExampleComponent'
        }
    ];

    ngOnInit() { }
}
