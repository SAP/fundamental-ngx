import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformPanelActionsExampleComponent } from './examples/platform-panel-actions-example.component';
import { PlatformPanelConfigExampleComponent } from './examples/platform-panel-config-example.component';
import { PlatformPanelExpandableExampleComponent } from './examples/platform-panel-expandable-example.component';
import { PlatformPanelFixedExampleComponent } from './examples/platform-panel-fixed-example.component';
import { PlatformPanelFixedHeightExampleComponent } from './examples/platform-panel-fixed-height-example.component';

const panelExpandableHtmlExample = 'platform-panel-expandable-example.component.html';
const panelExpandableTsExample = 'platform-panel-expandable-example.component.ts';
const panelActionsExample = 'platform-panel-actions-example.component.html';
const panelFixedExample = 'platform-panel-fixed-example.component.html';
const panelFixedHeightExample = 'platform-panel-fixed-height-example.component.html';
const panelConfigHtmlExample = 'platform-panel-config-example.component.html';
const panelConfigTsExample = 'platform-panel-config-example.component.ts';

@Component({
    selector: 'app-panel',
    templateUrl: './platform-panel-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformPanelExpandableExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformPanelFixedExampleComponent,
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
