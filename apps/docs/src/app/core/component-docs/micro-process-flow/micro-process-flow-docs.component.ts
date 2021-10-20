import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as microProcessFlowExampleHtml from '!raw-loader!./examples/micro-process-flow-example.component.html';
import * as microProcessFlowExampleTs from '!raw-loader!./examples/micro-process-flow-example.component.ts';

import * as independentMicroProcessFlowExampleHtml from '!raw-loader!./examples/micro-process-flow-independent-items-example.component.html';
import * as independentMicroProcessFlowExampleTs from '!raw-loader!./examples/micro-process-flow-independent-items-example.component.ts';

import * as microProcessFlowOtherControlsExampleHtml from '!raw-loader!./examples/micro-process-flow-other-controls-example.component.html';
import * as microProcessFlowOtherControlsExampleTs from '!raw-loader!./examples/micro-process-flow-other-controls-example.component.ts';

import * as microProcessFlowOverflowExampleHtml from '!raw-loader!./examples/micro-process-flow-overflow-example.component.html';
import * as microProcessFlowOverflowExampleTs from '!raw-loader!./examples/micro-process-flow-overflow-example.component.ts';

import * as microProcessFlowPopoverExampleHtml from '!raw-loader!./examples/micro-process-flow-popover-example.component.html';
import * as microProcessFlowPopoverExampleTs from '!raw-loader!./examples/micro-process-flow-popover-example.component.ts';

import * as microProcessFlowCustomWidthExampleHtml from '!raw-loader!./examples/micro-process-flow-custom-width-example.component.html';
import * as microProcessFlowCustomWidthExampleTs from '!raw-loader!./examples/micro-process-flow-custom-width-example.component.ts';

import * as microProcessFlowObjectBetweenNodesExampleHtml from '!raw-loader!./examples/micro-process-flow-object-between-nodes-example.component.html';
import * as microProcessFlowObjectBetweenNodesExampleTs from '!raw-loader!./examples/micro-process-flow-object-between-nodes-example.component.ts';

@Component({
    selector: 'app-micro-process-flow-docs',
    templateUrl: './micro-process-flow-docs.component.html'
})
export class MicroProcessFlowDocsComponent {
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
            fileName: 'micro-process-flow-independent-items-example',
            code: independentMicroProcessFlowExampleHtml
        },
        {
            language: 'typescript',
            code: independentMicroProcessFlowExampleTs,
            fileName: 'micro-process-flow-independent-items-example',
            component: 'MicroProcessFlowIndependentItemsExampleComponent'
        }
    ];

    customControlsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-other-controls-example',
            code: microProcessFlowOtherControlsExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowOtherControlsExampleTs,
            fileName: 'micro-process-flow-other-controls-example',
            component: 'MicroProcessFlowOtherControlsExampleComponent'
        }
    ];

    popoverExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-popover-example',
            code: microProcessFlowPopoverExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowPopoverExampleTs,
            fileName: 'micro-process-flow-popover-example',
            component: 'MicroProcessFlowPopoverExampleComponent'
        }
    ];

    overflowExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-overflow-example',
            code: microProcessFlowOverflowExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowOverflowExampleTs,
            fileName: 'micro-process-flow-overflow-example',
            component: 'MicroProcessFlowOverflowExampleComponent'
        }
    ];

    customWidthExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-custom-width-example',
            code: microProcessFlowCustomWidthExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowCustomWidthExampleTs,
            fileName: 'micro-process-flow-custom-width-example',
            component: 'MicroProcessFlowCustomWidthExampleComponent'
        }
    ];

    objectBetweenNodesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-object-between-nodes-example',
            code: microProcessFlowObjectBetweenNodesExampleHtml
        },
        {
            language: 'typescript',
            code: microProcessFlowObjectBetweenNodesExampleTs,
            fileName: 'micro-process-flow-object-between-nodes-example',
            component: 'MicroProcessFlowObjectBetweenNodesExampleComponent'
        }
    ];
}
