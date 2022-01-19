import { Component } from '@angular/core';

import panelEdgeBleedSrc from '!./examples/layout-panel-edge-bleed-example.component.html?raw';
import panelEdgeBleedSrcTs from '!./examples/layout-panel-edge-bleed-example.component.ts?raw';
import panelSrc from '!./examples/layout-panel-example.component.html?raw';
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
