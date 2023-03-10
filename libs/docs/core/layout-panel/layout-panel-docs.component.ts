import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const panelEdgeBleedSrc = 'layout-panel-edge-bleed-example.component.html';
const panelEdgeBleedSrcTs = 'layout-panel-edge-bleed-example.component.ts';
const panelSrc = 'layout-panel-example.component.html';
const panelTransparentSrc = 'layout-panel-transparent-example.component.html';
const panelFooterVariationsSrc = 'layout-panel-footer-variations-example.component.html';

@Component({
    selector: 'app-layout-panel',
    templateUrl: './layout-panel-docs.component.html'
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
