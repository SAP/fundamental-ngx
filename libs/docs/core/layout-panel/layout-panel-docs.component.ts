import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { LayoutPanelFooterVariationsExampleComponent } from './examples/layout-panel-footer-variations-example.component';
import { LayoutPanelTransparentExampleComponent } from './examples/layout-panel-transparent-example.component';
import { LayoutPanelEdgeBleedExampleComponent } from './examples/layout-panel-edge-bleed-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { LayoutPanelExampleComponent } from './examples/layout-panel-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const panelEdgeBleedSrc = 'layout-panel-edge-bleed-example.component.html';
const panelEdgeBleedSrcTs = 'layout-panel-edge-bleed-example.component.ts';
const panelSrc = 'layout-panel-example.component.html';
const panelTransparentSrc = 'layout-panel-transparent-example.component.html';
const panelFooterVariationsSrc = 'layout-panel-footer-variations-example.component.html';

@Component({
    selector: 'app-layout-panel',
    templateUrl: './layout-panel-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        LayoutPanelExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        LayoutPanelEdgeBleedExampleComponent,
        LayoutPanelTransparentExampleComponent,
        LayoutPanelFooterVariationsExampleComponent
    ]
})
export class LayoutPanelDocsComponent {
    panelBasic: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'panel-example',
            code: getAssetFromModuleAssets(panelSrc)
        }
    ];

    tableBleed: ExampleFile[] = [
        {
            language: 'html',
            component: 'LayoutPanelEdgeBleedExampleComponent',
            code: getAssetFromModuleAssets(panelEdgeBleedSrc),
            fileName: 'layout-panel-edge-bleed-example',
            typescriptFileCode: getAssetFromModuleAssets(panelEdgeBleedSrcTs)
        }
    ];

    panelTransparent: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'layout-panel-transparent-example',
            code: getAssetFromModuleAssets(panelTransparentSrc)
        }
    ];

    panelFooterVariations: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'layout-panel-footer-variations-example',
            code: getAssetFromModuleAssets(panelFooterVariationsSrc)
        }
    ];
}
