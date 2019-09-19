import { Component } from '@angular/core';

import * as panelEdgeBleedSrc from '!raw-loader!./examples/panel-edge-bleed-example.component.html';
import * as panelSrc from '!raw-loader!./examples/panel-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent {

    panelBasic: ExampleFile[] = [{
        language: 'html',
        code: panelSrc
    }];

    tableBleed: ExampleFile[] = [{
        language: 'html',
        code: panelEdgeBleedSrc
    }];

}
