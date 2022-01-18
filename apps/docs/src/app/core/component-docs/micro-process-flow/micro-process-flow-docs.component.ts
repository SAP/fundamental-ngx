import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import microProcessFlowExampleHtml from '!./examples/micro-process-flow-example.component.html?raw';
import microProcessFlowExampleTs from '!./examples/micro-process-flow-example.component.ts?raw';

import independentMicroProcessFlowExampleHtml from '!./examples/micro-process-flow-independent-items-example.component.html?raw';
import independentMicroProcessFlowExampleTs from '!./examples/micro-process-flow-independent-items-example.component.ts?raw';

import microProcessFlowOtherControlsExampleHtml from '!./examples/micro-process-flow-other-controls-example.component.html?raw';
import microProcessFlowOtherControlsExampleTs from '!./examples/micro-process-flow-other-controls-example.component.ts?raw';

import microProcessFlowOverflowExampleHtml from '!./examples/micro-process-flow-overflow-example.component.html?raw';
import microProcessFlowOverflowExampleTs from '!./examples/micro-process-flow-overflow-example.component.ts?raw';

import microProcessFlowPopoverExampleHtml from '!./examples/micro-process-flow-popover-example.component.html?raw';
import microProcessFlowPopoverExampleTs from '!./examples/micro-process-flow-popover-example.component.ts?raw';

import microProcessFlowCustomWidthExampleHtml from '!./examples/micro-process-flow-custom-width-example.component.html?raw';
import microProcessFlowCustomWidthExampleTs from '!./examples/micro-process-flow-custom-width-example.component.ts?raw';

import microProcessFlowObjectBetweenNodesExampleHtml from '!./examples/micro-process-flow-object-between-nodes-example.component.html?raw';
import microProcessFlowObjectBetweenNodesExampleTs from '!./examples/micro-process-flow-object-between-nodes-example.component.ts?raw';

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
