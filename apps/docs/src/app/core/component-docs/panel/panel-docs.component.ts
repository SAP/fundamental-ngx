import { Component } from '@angular/core';

import * as panelEdgeBleedSrc from '!raw-loader!./examples/panel-edge-bleed-example.component.html';
import * as panelEdgeBleedSrcTs from '!raw-loader!./examples/panel-edge-bleed-example.component.ts';
import * as panelSrc from '!raw-loader!./examples/panel-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as panelSrcTs from '!raw-loader!./examples/panel-examples.component.ts';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent {

    panelBasic: ExampleFile[] = [{
        language: 'html',
        component: 'PanelExampleComponent',
        code: panelSrc,
        fileName: 'panel-example',
        secondFile: 'panel-examples',
        typescriptFileCode: panelSrcTs
    }];

    tableBleed: ExampleFile[] = [{
        language: 'html',
        component: 'PanelEdgeBleedExampleComponent',
        code: panelEdgeBleedSrc,
        fileName: 'panel-edge-bleed-example',
        typescriptFileCode: panelEdgeBleedSrcTs
    }];

}
