import { Component } from '@angular/core';

import * as panelExpandableSrc from '!raw-loader!./examples/panel-expandable-example.component.html';
import * as panelFixedSrc from '!raw-loader!./examples/panel-fixed-example.component.html';
import * as panelCompactSrc from '!raw-loader!./examples/panel-compact-example.component.html';
import * as panelFixedHeightSrc from '!raw-loader!./examples/panel-fixed-height-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent {
    panelExpandable: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'panel-expandable-example',
            code: panelExpandableSrc
        }
    ];

    panelFixed: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'panel-fixed-example',
            code: panelFixedSrc
        }
    ];

    panelCompact: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'panel-compact-example',
            code: panelCompactSrc
        }
    ];

    panelFixedHeight: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'panel-fixed-height-example',
            code: panelFixedHeightSrc
        }
    ];
}
