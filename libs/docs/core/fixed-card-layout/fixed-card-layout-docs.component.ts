import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const fixedCardLayoutH = 'default/fixed-card-layout-examples.component.html';
const disabledDragFixedCardLayoutH = 'disabled-drag-drop/fixed-card-layout-disabled-drag.component.html';
const disabledDragFixedCardLayoutTs = 'disabled-drag-drop/fixed-card-layout-disabled-drag.component.ts';
const mobileFixedCardlayoutH = 'mobile/fixed-card-layout-mobile-examples.component.html';
const mobileFixedCardlayoutTs = 'mobile/fixed-card-layout-mobile-examples.component.ts';
const customColumnWidthHtml = 'custom-column-width/fixed-card-layout-custom-column-width-example.component.html';
const customColumnWidthTs = 'custom-column-width/fixed-card-layout-custom-column-width-example.component.ts';
const maxColumnsHtml = 'max-columns/fixed-card-layout-max-columns-example.component.html';
const maxColumnsTs = 'max-columns/fixed-card-layout-max-columns-example.component.ts';

@Component({
    selector: 'fd-fixed-card-layout-docs',
    templateUrl: './fixed-card-layout-docs.component.html'
})
export class FixedCardLayoutDocsComponent {
    defaultFixedCardLayout: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(fixedCardLayoutH),
            fileName: 'fixed-card-layout-examples'
        }
    ];

    dragDisabledFixedCardLayout: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(disabledDragFixedCardLayoutH),
            fileName: 'fixed-card-layout-disabled-drag'
        },
        {
            language: 'typescript',
            component: 'FixedCardLayoutDisabledDragExampleComponent',
            code: getAssetFromModuleAssets(disabledDragFixedCardLayoutTs),
            fileName: 'fixed-card-layout-disabled-drag'
        }
    ];

    mobileFixedCardLayout: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(mobileFixedCardlayoutH),
            fileName: 'fixed-card-layout-mobile-examples'
        },
        {
            language: 'typescript',
            component: 'FixedCardLayoutMobileExampleComponent',
            code: getAssetFromModuleAssets(mobileFixedCardlayoutTs),
            fileName: 'fixed-card-layout-mobile-examples'
        }
    ];

    customColumnWidth: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customColumnWidthHtml),
            fileName: 'fixed-card-layout-custom-column-width-example'
        },
        {
            language: 'typescript',
            component: 'FixedCardLayoutCustomColumnWidthExampleComponent',
            code: getAssetFromModuleAssets(customColumnWidthTs),
            fileName: 'fixed-card-layout-custom-column-width-example'
        }
    ];

    maxColumns: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(maxColumnsHtml),
            fileName: 'fixed-card-layout-max-columns-example'
        },
        {
            language: 'typescript',
            component: 'FixedCardLayoutMaxColumnsExampleComponent',
            code: getAssetFromModuleAssets(maxColumnsTs),
            fileName: 'fixed-card-layout-max-columns-example'
        }
    ];
}
