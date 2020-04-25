import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import { PlatformSelectTypesDefaultExampleComponent } from './platform-select-examples/platform-select-types-default-example.component';

import { PlatformSelectTypesNoBorderExampleComponent } from './platform-select-examples/platform-select-types-noborder-example.component';
import { PlatformSelectTypesSplitExampleComponent } from './platform-select-examples/platform-select-types-split-example.component';
import { PlatformSelectTypesWithIconExampleComponent } from './platform-select-examples/platform-select-types-with-icon-example.component';

import * as platformselectDefaultTypesSrc from '!raw-loader!./platform-select-examples/platform-select-types-default-example.component.html';
import * as platformselectDefaultTypesTsSrc from '!raw-loader!./platform-select-examples/platform-select-types-default-example.component.ts';

import * as platformselectNoBorderTypesSrc from '!raw-loader!./platform-select-examples/platform-select-types-noborder-example.component.html';
import * as platformselectNoBorderTypesTsSrc from '!raw-loader!./platform-select-examples/platform-select-types-noborder-example.component.ts';

import * as platformselectSplitTypesSrc from '!raw-loader!./platform-select-examples/platform-select-types-split-example.component.html';
import * as platformselectSplitTypesTsSrc from '!raw-loader!./platform-select-examples/platform-select-types-split-example.component.ts';

import * as platformselectWithIconTypesSrc from '!raw-loader!./platform-select-examples/platform-select-types-with-icon-example.component.html';
import * as platformselectWithIconTypesTsSrc from '!raw-loader!./platform-select-examples/platform-select-types-with-icon-example.component.ts';

@Component({
    selector: 'fd-select-docs',
    templateUrl: './platform-select-docs.component.html'
})
export class PlatformSelectDocsComponent implements OnInit {
    defaultselectType: ExampleFile[] = [
        {
            language: 'html',
            code: platformselectDefaultTypesSrc,
            fileName: 'platform-select-types-default-example'
        },
        {
            language: 'typescript',
            code: platformselectDefaultTypesTsSrc,
            fileName: 'platform-select-types-default-example',
            component: 'PlatformSelectTypesDefaultExampleComponent'
        }
    ];
    noborderselectType: ExampleFile[] = [
        {
            language: 'html',
            code: platformselectNoBorderTypesSrc,
            fileName: 'platform-select-types-noborder-example'
        },
        {
            language: 'typescript',
            code: platformselectNoBorderTypesTsSrc,
            fileName: 'platform-select-types-noborder-example',
            component: 'PlatformSelectTypesNoBorderExampleComponent'
        }
    ];
    splitselectType: ExampleFile[] = [
        {
            language: 'html',
            code: platformselectSplitTypesSrc,
            fileName: 'platform-select-types-split-example'
        },
        {
            language: 'typescript',
            code: platformselectSplitTypesTsSrc,
            fileName: 'platform-select-types-split-example',
            component: 'PlatformSelectTypesSplitExampleComponent'
        }
    ];
    WithIconselectType: ExampleFile[] = [
        {
            language: 'html',
            code: platformselectWithIconTypesSrc,
            fileName: 'platform-select-types-split-example'
        },
        {
            language: 'typescript',
            code: platformselectWithIconTypesTsSrc,
            fileName: 'platform-select-types-with-icon-example',
            component: 'PlatformSelectTypesWithIconExampleComponent'
        }
    ];

    ngOnInit() {}
}
