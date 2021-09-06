import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as splitterBasicHtml from '!raw-loader!./examples/default/splitter-default-example.component.html';
import * as splitterBasicTs from '!raw-loader!./examples/default/splitter-default-example.component.ts';
import * as splitterRequiredParentWidthHtml from '!raw-loader!./examples/required-parent-width/splitter-required-parent-width-example.component.html';
import * as splitterRequiredParentWidthTs from '!raw-loader!./examples/required-parent-width/splitter-required-parent-width-example.component.ts';


@Component({
    selector: 'app-splitter',
    templateUrl: './splitter-docs.component.html'
})
export class SplitterDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: splitterBasicHtml,
            fileName: 'splitter-default-example',
            name: 'splitter-required-parent-width-example.component.html'
        },
        {
            language: 'typescript',
            code: splitterBasicTs,
            fileName: 'splitter-default-example',
            component: 'SplitterBasicExampleComponent',
            name: 'splitter-required-parent-width-example.component.ts'
        }
    ];

    requiredParentWidth: ExampleFile[] = [
        {
            language: 'html',
            code: splitterRequiredParentWidthHtml,
            fileName: 'splitter-required-parent-width-example',
            name: 'splitter-required-parent-width-example.component.html'
        },
        {
            language: 'typescript',
            code: splitterRequiredParentWidthTs,
            fileName: 'splitter-required-parent-width-example',
            component: 'SplitterRequiredParentWidthExampleComponent',
            name: 'splitter-required-parent-width-example.component.ts'
        }
    ];
}
