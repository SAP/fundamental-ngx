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
import { PanelCompactExampleComponent } from './examples/panel-compact-example.component';
import { PanelExpandableExampleComponent } from './examples/panel-expandable-examples.component';
import { PanelFixedExampleComponent } from './examples/panel-fixed-example.component';
import { PanelFixedHeightExampleComponent } from './examples/panel-fixed-height-example.component';

const panelExpandableSrc = 'panel-expandable-example.component.html';
const panelFixedSrc = 'panel-fixed-example.component.html';
const panelCompactSrc = 'panel-compact-example.component.html';
const panelFixedHeightSrc = 'panel-fixed-height-example.component.html';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PanelExpandableExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PanelFixedExampleComponent,
        PanelCompactExampleComponent,
        PanelFixedHeightExampleComponent
    ]
})
export class PanelDocsComponent {
    panelExpandable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelExpandableSrc),
            fileName: 'panel-expandable-example'
        }
    ];

    panelFixed: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelFixedSrc),
            fileName: 'panel-fixed-example'
        }
    ];

    panelCompact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelCompactSrc),
            fileName: 'panel-compact-example'
        }
    ];

    panelFixedHeight: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelFixedHeightSrc),
            fileName: 'panel-fixed-height-example'
        }
    ];
}
