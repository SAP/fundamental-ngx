import { Component } from '@angular/core';

import * as layoutGridColumnsSrc from '!raw-loader!./examples/layout-grid-columns-example.component.html';
import * as layoutGapSrc from '!raw-loader!./examples/layout-grid-gap-size-example.component.html';
import * as layoutGridSrc from '!raw-loader!./examples/layout-grid-example.component.html';
import * as layoutGridNoGapSrc from '!raw-loader!./examples/layout-grid-nogap-example.component.html';
import * as layoutGridRowColumnSrc from '!raw-loader!./examples/layout-grid-column-span-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as layoutGridTsCode from '!raw-loader!./examples/layout-grid-examples.component.ts';

@Component({
    selector: 'app-layoutGrid',
    templateUrl: './layout-grid-docs.component.html'
})
export class LayoutGridDocsComponent {

    layoutGridGapSize: ExampleFile[] = [{
        language: 'html',
        code: layoutGapSrc,
        fileName: 'layout-grid-gap-size-example',
        secondFile: 'layout-grid-examples',
        typescriptFileCode: layoutGridTsCode,
        component: 'LayoutGridGapSizeExample'
    }];

    defaultLayoutGrid: ExampleFile[] = [{
        language: 'html',
        code: layoutGridSrc,
        fileName: 'layout-grid-example',
        secondFile: 'layout-grid-examples',
        typescriptFileCode: layoutGridTsCode,
        component: 'LayoutGridExampleComponent'
    }];

    noGapLayoutGrid: ExampleFile[] = [{
        language: 'html',
        code: layoutGridNoGapSrc,
        fileName: 'layout-grid-nogap-example',
        secondFile: 'layout-grid-examples',
        typescriptFileCode: layoutGridTsCode,
        component: 'LayoutGridNoGapExampleComponent'
    }];

    twoColumnsLayoutGrid: ExampleFile[] = [{
        language: 'html',
        code: layoutGridColumnsSrc,
        fileName: 'layout-grid-columns-example',
        secondFile: 'layout-grid-examples',
        typescriptFileCode: layoutGridTsCode,
        component: 'LayoutColumnsExampleComponent'
    }];

    columnSpanLayoutGrid: ExampleFile[] = [{
        language: 'html',
        code: layoutGridRowColumnSrc,
        fileName: 'layout-grid-column-span-example',
        secondFile: 'layout-grid-examples',
        typescriptFileCode: layoutGridTsCode,
        component: 'LayoutGridColumnSpanExampleComponent'
    }];

}
