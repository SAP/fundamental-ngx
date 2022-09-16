import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const microProcessFlowExampleHtml = 'micro-process-flow-example.component.html';
const microProcessFlowExampleTs = 'micro-process-flow-example.component.ts';

const independentMicroProcessFlowExampleHtml = 'micro-process-flow-independent-items-example.component.html';
const independentMicroProcessFlowExampleTs = 'micro-process-flow-independent-items-example.component.ts';
const microProcessFlowOtherControlsExampleHtml = 'micro-process-flow-other-controls-example.component.html';
const microProcessFlowOtherControlsExampleTs = 'micro-process-flow-other-controls-example.component.ts';

const microProcessFlowOverflowExampleHtml = 'micro-process-flow-overflow-example.component.html';
const microProcessFlowOverflowExampleTs = 'micro-process-flow-overflow-example.component.ts';

const microProcessFlowPopoverExampleHtml = 'micro-process-flow-popover-example.component.html';
const microProcessFlowPopoverExampleTs = 'micro-process-flow-popover-example.component.ts';

const microProcessFlowCustomWidthExampleHtml = 'micro-process-flow-custom-width-example.component.html';
const microProcessFlowCustomWidthExampleTs = 'micro-process-flow-custom-width-example.component.ts';

const microProcessFlowObjectBetweenNodesExampleHtml = 'micro-process-flow-object-between-nodes-example.component.html';
const microProcessFlowObjectBetweenNodesExampleTs = 'micro-process-flow-object-between-nodes-example.component.ts';
@Component({
    selector: 'app-micro-process-flow-docs',
    templateUrl: './micro-process-flow-docs.component.html'
})
export class MicroProcessFlowDocsComponent {
    basicExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-example',
            code: getAssetFromModuleAssets(microProcessFlowExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(microProcessFlowExampleTs),
            fileName: 'micro-process-flow-example',
            component: 'MicroProcessFlowExampleComponent'
        }
    ];

    independentExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-independent-items-example',
            code: getAssetFromModuleAssets(independentMicroProcessFlowExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(independentMicroProcessFlowExampleTs),
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
            code: getAssetFromModuleAssets(microProcessFlowOtherControlsExampleTs),
            fileName: 'micro-process-flow-other-controls-example',
            component: 'MicroProcessFlowOtherControlsExampleComponent'
        }
    ];

    popoverExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-popover-example',
            code: getAssetFromModuleAssets(microProcessFlowPopoverExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(microProcessFlowPopoverExampleTs),
            fileName: 'micro-process-flow-popover-example',
            component: 'MicroProcessFlowPopoverExampleComponent'
        }
    ];

    overflowExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-overflow-example',
            code: getAssetFromModuleAssets(microProcessFlowOverflowExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(microProcessFlowOverflowExampleTs),
            fileName: 'micro-process-flow-overflow-example',
            component: 'MicroProcessFlowOverflowExampleComponent'
        }
    ];

    customWidthExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-custom-width-example',
            code: getAssetFromModuleAssets(microProcessFlowCustomWidthExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(microProcessFlowCustomWidthExampleTs),
            fileName: 'micro-process-flow-custom-width-example',
            component: 'MicroProcessFlowCustomWidthExampleComponent'
        }
    ];

    objectBetweenNodesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'micro-process-flow-object-between-nodes-example',
            code: getAssetFromModuleAssets(microProcessFlowObjectBetweenNodesExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(microProcessFlowObjectBetweenNodesExampleTs),
            fileName: 'micro-process-flow-object-between-nodes-example',
            component: 'MicroProcessFlowObjectBetweenNodesExampleComponent'
        }
    ];
}
