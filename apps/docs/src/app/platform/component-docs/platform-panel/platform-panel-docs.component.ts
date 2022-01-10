import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import panelExpandableHtmlExample from '!./platform-panel-examples/platform-panel-expandable-example.component.html?raw';
import panelExpandableTsExample from '!./platform-panel-examples/platform-panel-expandable-example.component.ts?raw';
import panelActionsExample from '!./platform-panel-examples/platform-panel-actions-example.component.html?raw';
import panelFixedExample from '!./platform-panel-examples/platform-panel-fixed-example.component.html?raw';
import panelFixedHeightExample from '!./platform-panel-examples/platform-panel-fixed-height-example.component.html?raw';
import panelCompactExample from '!./platform-panel-examples/platform-panel-compact-example.component.html?raw';
import panelConfigHtmlExample from '!./platform-panel-examples/platform-panel-config-example.component.html?raw';
import panelConfigTsExample from '!./platform-panel-examples/platform-panel-config-example.component.ts?raw';

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
