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
import { PanelExpandableExampleComponent } from './examples/panel-expandable-example.component';
import { PanelFixedExampleComponent } from './examples/panel-fixed-example.component';
import { PanelFixedHeightExampleComponent } from './examples/panel-fixed-height-example.component';

const panelExpandableSrc = 'panel-expandable-example.component.html';
const panelExpandableTs = 'panel-expandable-example.component.ts';
const panelFixedSrc = 'panel-fixed-example.component.html';
const panelFixedHeightSrc = 'panel-fixed-height-example.component.html';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PanelExpandableExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PanelFixedExampleComponent,
        PanelFixedHeightExampleComponent
    ]
})
export class PanelDocsComponent {
    panelExpandable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelExpandableSrc),
            fileName: 'panel-expandable-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(panelExpandableTs),
            fileName: 'panel-expandable-example',
            component: 'PanelExpandableExampleComponent'
        }
    ];

    panelFixed: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(panelFixedSrc),
            fileName: 'panel-fixed-example'
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
