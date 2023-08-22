import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PanelFixedHeightExampleComponent } from './examples/panel-fixed-height-example.component';
import { PanelCompactExampleComponent } from './examples/panel-compact-example.component';
import { PanelFixedExampleComponent } from './examples/panel-fixed-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PanelExpandableExampleComponent } from './examples/panel-expandable-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
