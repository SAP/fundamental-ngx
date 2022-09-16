import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const layoutGridBlockSrc = 'example-layout-grid-block.component.ts';

const layoutGridBasicSrcTs = 'layout-grid-basic-example.component.ts';
const layoutGridBasicSrc = 'layout-grid-basic-example.component.html';

const growingGridBasicSrcTs = 'layout-grid-growing-example.component.ts';
const growingGridBasicSrc = 'layout-grid-growing-example.component.html';

const layoutGridOffsetSrcTs = 'layout-grid-offset-example.component.ts';
const layoutGridOffsetSrc = 'layout-grid-offset-example.component.html';

const layoutGridResponsiveSrcTs = 'layout-grid-responsive-example.component.ts';
const layoutGridResponsiveSrc = 'layout-grid-responsive-example.component.html';

const layoutGridResponsiveOffsetSrcTs = 'layout-grid-responsive-offset-example.component.ts';
const layoutGridResponsiveOffsetSrc = 'layout-grid-responsive-offset-example.component.html';

const layoutGridNestingSrcTs = 'layout-grid-nesting-example.component.ts';
const layoutGridNestingSrc = 'layout-grid-nesting-example.component.html';

const layoutGridRowSrcTs = 'layout-grid-row-example.component.ts';
const layoutGridRowSrc = 'layout-grid-row-example.component.html';

const layoutGridNoGapSrcTs = 'layout-grid-no-gap-example.component.ts';
const layoutGridNoGapSrc = 'layout-grid-no-gap-example.component.html';

@Component({
    selector: 'app-layoutGrid',
    templateUrl: './layout-grid-docs.component.html',
    styles: [
        `
            strong {
                margin-right: 0.5rem;
            }
        `
    ]
})
export class LayoutGridDocsComponent {
    basicLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutGridBasicSrc),
            fileName: 'layout-grid-basic-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridBasicExampleComponent',
            code: getAssetFromModuleAssets(layoutGridBasicSrcTs),
            fileName: 'layout-grid-basic-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];

    growingLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(growingGridBasicSrc),
            fileName: 'layout-grid-growing-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridGrowingExampleComponent',
            code: getAssetFromModuleAssets(growingGridBasicSrcTs),
            fileName: 'layout-grid-growing-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];

    offsetLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutGridOffsetSrc),
            fileName: 'layout-grid-offset-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridOffsetExampleComponent',
            code: getAssetFromModuleAssets(layoutGridOffsetSrcTs),
            fileName: 'layout-grid-offset-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];

    responsiveLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutGridResponsiveSrc),
            fileName: 'layout-grid-responsive-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridResponsiveExampleComponent',
            code: getAssetFromModuleAssets(layoutGridResponsiveSrcTs),
            fileName: 'layout-grid-responsive-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];

    rowLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutGridRowSrc),
            fileName: 'layout-grid-row-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridRowExampleComponent',
            code: getAssetFromModuleAssets(layoutGridRowSrcTs),
            fileName: 'layout-grid-row-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];

    noGapLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutGridNoGapSrc),
            fileName: 'layout-grid-no-gap-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridNoGapExampleComponent',
            code: getAssetFromModuleAssets(layoutGridNoGapSrcTs),
            fileName: 'layout-grid-no-gap-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];

    nestingLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutGridNestingSrc),
            fileName: 'layout-grid-nesting-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridNestingExampleComponent',
            code: getAssetFromModuleAssets(layoutGridNestingSrcTs),
            fileName: 'layout-grid-nesting-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];

    layoutGridResponsiveOffset: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutGridResponsiveOffsetSrc),
            fileName: 'layout-grid-responsive-offset-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridResponsiveOffsetExample',
            code: getAssetFromModuleAssets(layoutGridResponsiveOffsetSrcTs),
            fileName: 'layout-grid-responsive-offset-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: getAssetFromModuleAssets(layoutGridBlockSrc),
            fileName: 'example-layout-grid-block'
        }
    ];
}
