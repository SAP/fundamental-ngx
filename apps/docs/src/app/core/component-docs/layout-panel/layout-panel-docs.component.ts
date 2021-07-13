import { Component } from '@angular/core';

import * as panelEdgeBleedSrc from '!raw-loader!./examples/layout-panel-edge-bleed-example.component.html';
import * as panelEdgeBleedSrcTs from '!raw-loader!./examples/layout-panel-edge-bleed-example.component.ts';
import * as panelSrc from '!raw-loader!./examples/layout-panel-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-layout-panel',
    templateUrl: './layout-panel-docs.component.html'
})
export class LayoutPanelDocsComponent {
    panelBasic: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'panel-example',
            code: panelSrc
        }
    ];

    tableBleed: ExampleFile[] = [
        {
            language: 'html',
            component: 'LayoutPanelEdgeBleedExampleComponent',
            code: panelEdgeBleedSrc,
            fileName: 'layout-panel-edge-bleed-example',
            typescriptFileCode: panelEdgeBleedSrcTs
        }
    ];
}
