import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as panelExpandableHtmlExample from '!raw-loader!./platform-panel-examples/platform-panel-expandable-example.component.html';
import * as panelExpandableTsExample from '!raw-loader!./platform-panel-examples/platform-panel-expandable-example.component.ts';
import * as panelActionsExample from '!raw-loader!./platform-panel-examples/platform-panel-actions-example.component.html';
import * as panelFixedExample from '!raw-loader!./platform-panel-examples/platform-panel-fixed-example.component.html';
import * as panelFixedHeightExample from '!raw-loader!./platform-panel-examples/platform-panel-fixed-height-example.component.html';
import * as panelCompactExample from '!raw-loader!./platform-panel-examples/platform-panel-compact-example.component.html';
import * as panelConfigHtmlExample from '!raw-loader!./platform-panel-examples/platform-panel-config-example.component.html';
import * as panelConfigTsExample from '!raw-loader!./platform-panel-examples/platform-panel-config-example.component.ts';

@Component({
    selector: 'app-panel',
    templateUrl: './platform-panel-docs.component.html'
})
export class PlatformPanelDocsComponent {
    panelExpandable: ExampleFile[] = [
        {
            language: 'html',
            code: panelExpandableHtmlExample,
            fileName: 'platform-panel-expandable-example'
        },
        {
            language: 'typescript',
            code: panelExpandableTsExample,
            fileName: 'platform-panel-expandable-example',
            component: 'PlatformPanelExpandableExampleComponent'
        }
    ];

    panelActions: ExampleFile[] = [
        {
            language: 'html',
            code: panelActionsExample,
            fileName: 'platform-panel-actions-example'
        }
    ];

    panelFixed: ExampleFile[] = [
        {
            language: 'html',
            code: panelFixedExample,
            fileName: 'platform-panel-fixed-example'
        }
    ];

    panelFixedHeight: ExampleFile[] = [
        {
            language: 'html',
            code: panelFixedHeightExample,
            fileName: 'platform-panel-fixed-height-example'
        }
    ];

    panelCompact: ExampleFile[] = [
        {
            language: 'html',
            code: panelCompactExample,
            fileName: 'platform-panel-compact-example'
        }
    ];

    panelConfig: ExampleFile[] = [
        {
            language: 'html',
            code: panelConfigHtmlExample,
            fileName: 'platform-panel-config-example'
        },
        {
            language: 'typescript',
            code: panelConfigTsExample,
            fileName: 'platform-panel-config-example',
            component: 'PlatformPanelConfigExampleComponent'
        }
    ];
}
