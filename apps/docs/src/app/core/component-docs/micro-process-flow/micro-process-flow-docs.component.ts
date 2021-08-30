import { Component, OnInit } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as microProcessFlowExampleHtml from '!raw-loader!./examples/micro-process-flow-example.component.html';
import * as microProcessFlowExampleTs from '!raw-loader!./examples/micro-process-flow-example.component.ts';

import * as independentMicroProcessFlowExampleHtml from '!raw-loader!./examples/micro-process-flow-independent.component.html';
import * as independentMicroProcessFlowExampleTs from '!raw-loader!./examples/micro-process-flow-independent.component.ts';

import * as microProcessFlowOtherControlsExampleHtml from '!raw-loader!./examples/micro-process-flow-other-controls.component.html';
import * as microProcessFlowOtherControlsExampleTs from '!raw-loader!./examples/micro-process-flow-other-controls.component.ts';

import * as microProcessFlowOverflowExampleHtml from '!raw-loader!./examples/micro-process-flow-overflow.component.html';
import * as microProcessFlowOverflowExampleTs from '!raw-loader!./examples/micro-process-flow-overflow.component.ts';

import * as microProcessFlowPopoverExampleHtml from '!raw-loader!./examples/micro-process-flow-overflow.component.html';
import * as microProcessFlowPopoverExampleTs from '!raw-loader!./examples/micro-process-flow-overflow.component.ts';

@Component({
    selector: 'app-micro-process-flow-docs',
    templateUrl: './micro-process-flow-docs.component.html'
})
export class MicroProcessFlowDocsComponent implements OnInit {

    basicExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-example',
            code: microProcessFlowExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowExampleTs,
            fileName: 'micro-process-flow-example',
            component: 'MicroProcessFlowExampleComponent'
        }
    ];

    independentExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-independent',
            code: independentMicroProcessFlowExampleHtml
        },
        {
            language: 'typescript',
            code: independentMicroProcessFlowExampleTs,
            fileName: 'micro-process-flow-independent',
            component: 'MicroProcessFlowIndependentComponent'
        }
    ];

    customControlsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-other-controls',
            code: microProcessFlowOtherControlsExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowOtherControlsExampleTs,
            fileName: 'micro-process-flow-other-controls',
            component: 'MicroProcessFlowOtherControlsComponent'
        }
    ];

    popoverExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-popover',
            code: microProcessFlowPopoverExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowPopoverExampleTs,
            fileName: 'micro-process-flow-popover',
            component: 'MicroProcessFlowPopoverComponent'
        }
    ];

    overflowExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-overflow',
            code: microProcessFlowOverflowExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowOverflowExampleTs,
            fileName: 'micro-process-flow-overflow',
            component: 'MicroProcessFlowOverflowComponent'
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
