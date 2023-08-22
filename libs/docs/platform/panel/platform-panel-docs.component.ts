import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformPanelConfigExampleComponent } from './examples/platform-panel-config-example.component';
import { PlatformPanelActionsExampleComponent } from './examples/platform-panel-actions-example.component';
import { PlatformPanelFixedHeightExampleComponent } from './examples/platform-panel-fixed-height-example.component';
import { PlatformPanelCompactExampleComponent } from './examples/platform-panel-compact-example.component';
import { PlatformPanelFixedExampleComponent } from './examples/platform-panel-fixed-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformPanelExpandableExampleComponent } from './examples/platform-panel-expandable-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const panelExpandableHtmlExample = 'platform-panel-expandable-example.component.html';
const panelExpandableTsExample = 'platform-panel-expandable-example.component.ts';
const panelActionsExample = 'platform-panel-actions-example.component.html';
const panelFixedExample = 'platform-panel-fixed-example.component.html';
const panelFixedHeightExample = 'platform-panel-fixed-height-example.component.html';
const panelCompactExample = 'platform-panel-compact-example.component.html';
const panelConfigHtmlExample = 'platform-panel-config-example.component.html';
const panelConfigTsExample = 'platform-panel-config-example.component.ts';

@Component({
    selector: 'app-panel',
    templateUrl: './platform-panel-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformPanelExpandableExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformPanelFixedExampleComponent,
        PlatformPanelCompactExampleComponent,
        PlatformPanelFixedHeightExampleComponent,
        PlatformPanelActionsExampleComponent,
        PlatformPanelConfigExampleComponent
    ]
})
export class PlatformPanelDocsComponent {
    panelExpandable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelExpandableHtmlExample),
            fileName: 'platform-panel-expandable-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(panelExpandableTsExample),
            fileName: 'platform-panel-expandable-example',
            component: 'PlatformPanelExpandableExampleComponent'
        }
    ];

    panelActions: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelActionsExample),
            fileName: 'platform-panel-actions-example'
        }
    ];

    panelFixed: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelFixedExample),
            fileName: 'platform-panel-fixed-example'
        }
    ];

    panelFixedHeight: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelFixedHeightExample),
            fileName: 'platform-panel-fixed-height-example'
        }
    ];

    panelCompact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelCompactExample),
            fileName: 'platform-panel-compact-example'
        }
    ];

    panelConfig: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelConfigHtmlExample),
            fileName: 'platform-panel-config-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(panelConfigTsExample),
            fileName: 'platform-panel-config-example',
            component: 'PlatformPanelConfigExampleComponent'
        }
    ];
}
