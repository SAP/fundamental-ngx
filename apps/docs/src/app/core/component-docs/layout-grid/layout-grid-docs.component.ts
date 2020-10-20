import { Component } from '@angular/core';

import * as layoutGridBasicSrc from '!raw-loader!./examples/layout-grid-basic-example.component.html';
import * as layoutGridOffsetSrc from '!raw-loader!./examples/layout-grid-offset-example.component.html';
import * as layoutGridResponsiveSrc from '!raw-loader!./examples/layout-grid-responsive-example.component.html';
import * as layoutGridResponsiveOffsetSrc from '!raw-loader!./examples/layout-grid-responsive-offset-example.component.html';
import * as layoutGridAdjustingSrc from '!raw-loader!./examples/layout-grid-adjusting-example.component.html';
import * as layoutGridNestingSrc from '!raw-loader!./examples/layout-grid-nesting-example.component.html';
import * as layoutGridRowSrc from '!raw-loader!./examples/layout-grid-row-example.component.html';
import * as layoutGridNoGapSrc from '!raw-loader!./examples/layout-grid-no-gap-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-layoutGrid',
    templateUrl: './layout-grid-docs.component.html'
})
export class LayoutGridDocsComponent {
    basicLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridBasicSrc,
            fileName: 'layout-grid-basic-example'
        }
    ];

    offsetLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridOffsetSrc,
            fileName: 'layout-grid-offset-example'
        }
    ];

    responsiveLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridResponsiveSrc,
            fileName: 'layout-grid-responsive-example'
        }
    ];

    rowLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridRowSrc,
            fileName: 'layout-grid-row-example'
        }
    ];

    noGapLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridNoGapSrc,
            fileName: 'layout-grid-nogap-example'
        }
    ];

    adjustingLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridAdjustingSrc,
            fileName: 'layout-grid-adjusting-example'
        }
    ];

    nestingLayoutGrid: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridNestingSrc,
            fileName: 'layout-grid-nesting-example'
        }
    ];

    layoutGridResponsiveOffsetSrc: ExampleFile[] = [
        {
            language: 'html',
            code: layoutGridNestingSrc,
            fileName: 'layout-grid-responsive-offset-example'
        }
    ];
}
