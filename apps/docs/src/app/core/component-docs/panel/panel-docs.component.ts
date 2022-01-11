import { Component } from '@angular/core';

import panelExpandableSrc from '!./examples/panel-expandable-example.component.html?raw';
import panelFixedSrc from '!./examples/panel-fixed-example.component.html?raw';
import panelCompactSrc from '!./examples/panel-compact-example.component.html?raw';
import panelFixedHeightSrc from '!./examples/panel-fixed-height-example.component.html?raw';
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
