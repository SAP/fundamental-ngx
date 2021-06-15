import { Component } from '@angular/core';

import * as layoutGridBlockSrc from '!raw-loader!./examples/example-layout-grid-block.component.ts';

import * as layoutGridBasicSrcTs from '!raw-loader!./examples/layout-grid-basic-example.component.ts';
import * as layoutGridBasicSrc from '!raw-loader!./examples/layout-grid-basic-example.component.html';

import * as growingGridBasicSrcTs from '!raw-loader!./examples/layout-grid-growing-example.component.ts';
import * as growingGridBasicSrc from '!raw-loader!./examples/layout-grid-growing-example.component.html';

import * as layoutGridOffsetSrcTs from '!raw-loader!./examples/layout-grid-offset-example.component.ts';
import * as layoutGridOffsetSrc from '!raw-loader!./examples/layout-grid-offset-example.component.html';

import * as layoutGridResponsiveSrcTs from '!raw-loader!./examples/layout-grid-responsive-example.component.ts';
import * as layoutGridResponsiveSrc from '!raw-loader!./examples/layout-grid-responsive-example.component.html';

import * as layoutGridResponsiveOffsetSrcTs from '!raw-loader!./examples/layout-grid-responsive-offset-example.component.ts';
import * as layoutGridResponsiveOffsetSrc from '!raw-loader!./examples/layout-grid-responsive-offset-example.component.html';

import * as layoutGridNestingSrcTs from '!raw-loader!./examples/layout-grid-nesting-example.component.ts';
import * as layoutGridNestingSrc from '!raw-loader!./examples/layout-grid-nesting-example.component.html';

import * as layoutGridRowSrcTs from '!raw-loader!./examples/layout-grid-row-example.component.ts';
import * as layoutGridRowSrc from '!raw-loader!./examples/layout-grid-row-example.component.html';

import * as layoutGridNoGapSrcTs from '!raw-loader!./examples/layout-grid-no-gap-example.component.ts';
import * as layoutGridNoGapSrc from '!raw-loader!./examples/layout-grid-no-gap-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-layoutGrid',
    templateUrl: './layout-grid-docs.component.html',
    styles: [`
        strong {
            margin-right: 0.5rem;
        }
    `]
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
