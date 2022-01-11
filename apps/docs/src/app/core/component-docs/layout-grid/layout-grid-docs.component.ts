import { Component } from '@angular/core';

import layoutGridBlockSrc from '!./examples/example-layout-grid-block.component.ts?raw';

import layoutGridBasicSrcTs from '!./examples/layout-grid-basic-example.component.ts?raw';
import layoutGridBasicSrc from '!./examples/layout-grid-basic-example.component.html?raw';

import growingGridBasicSrcTs from '!./examples/layout-grid-growing-example.component.ts?raw';
import growingGridBasicSrc from '!./examples/layout-grid-growing-example.component.html?raw';

import layoutGridOffsetSrcTs from '!./examples/layout-grid-offset-example.component.ts?raw';
import layoutGridOffsetSrc from '!./examples/layout-grid-offset-example.component.html?raw';

import layoutGridResponsiveSrcTs from '!./examples/layout-grid-responsive-example.component.ts?raw';
import layoutGridResponsiveSrc from '!./examples/layout-grid-responsive-example.component.html?raw';

import layoutGridResponsiveOffsetSrcTs from '!./examples/layout-grid-responsive-offset-example.component.ts?raw';
import layoutGridResponsiveOffsetSrc from '!./examples/layout-grid-responsive-offset-example.component.html?raw';

import layoutGridNestingSrcTs from '!./examples/layout-grid-nesting-example.component.ts?raw';
import layoutGridNestingSrc from '!./examples/layout-grid-nesting-example.component.html?raw';

import layoutGridRowSrcTs from '!./examples/layout-grid-row-example.component.ts?raw';
import layoutGridRowSrc from '!./examples/layout-grid-row-example.component.html?raw';

import layoutGridNoGapSrcTs from '!./examples/layout-grid-no-gap-example.component.ts?raw';
import layoutGridNoGapSrc from '!./examples/layout-grid-no-gap-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

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
            code: layoutGridBasicSrc,
            fileName: 'layout-grid-basic-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridBasicExampleComponent',
            code: layoutGridBasicSrcTs,
            fileName: 'layout-grid-basic-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];

    growingLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: growingGridBasicSrc,
            fileName: 'layout-grid-growing-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridGrowingExampleComponent',
            code: growingGridBasicSrcTs,
            fileName: 'layout-grid-growing-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];

    offsetLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridOffsetSrc,
            fileName: 'layout-grid-offset-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridOffsetExampleComponent',
            code: layoutGridOffsetSrcTs,
            fileName: 'layout-grid-offset-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];

    responsiveLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridResponsiveSrc,
            fileName: 'layout-grid-responsive-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridResponsiveExampleComponent',
            code: layoutGridResponsiveSrcTs,
            fileName: 'layout-grid-responsive-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];

    rowLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridRowSrc,
            fileName: 'layout-grid-row-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridRowExampleComponent',
            code: layoutGridRowSrcTs,
            fileName: 'layout-grid-row-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];

    noGapLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridNoGapSrc,
            fileName: 'layout-grid-no-gap-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridNoGapExampleComponent',
            code: layoutGridNoGapSrcTs,
            fileName: 'layout-grid-no-gap-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];

    nestingLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridNestingSrc,
            fileName: 'layout-grid-nesting-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridNestingExampleComponent',
            code: layoutGridNestingSrcTs,
            fileName: 'layout-grid-nesting-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];

    layoutGridResponsiveOffset: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridResponsiveOffsetSrc,
            fileName: 'layout-grid-responsive-offset-example'
        },
        {
            language: 'typescript',
            component: 'LayoutGridResponsiveOffsetExample',
            code: layoutGridResponsiveOffsetSrcTs,
            fileName: 'layout-grid-responsive-offset-example'
        },
        {
            language: 'typescript',
            component: 'ExampleLayoutGridBlockComponent',
            code: layoutGridBlockSrc,
            fileName: 'example-layout-grid-block'
        }
    ];
}
