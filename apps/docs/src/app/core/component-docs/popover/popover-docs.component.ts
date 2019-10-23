import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as popoverSrc from '!raw-loader!./examples/popover-simple/popover-example.component.html';
import * as popoverSrcScss from '!raw-loader!./examples/popover-simple/popover-example.component.scss';
import * as popoverSrcTs from '!raw-loader!./examples/popover-simple/popover-example.component.ts';
import * as popoverProgrammaticHtmlSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.html';
import * as popoverProgrammaticScssSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.scss';
import * as popoverProgrammaticTsSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.ts';
import * as popoverPlacementHtmlSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.html';
import * as popoverPlacementTsSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.ts';
import * as popoverPlacementScssSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.scss';
import * as popoverModalHtmlSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.html';
import * as popoverModalTsSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.ts';
import * as popoverFillHSrc from '!raw-loader!./examples/popover-c-fill/popover-c-fill.component.html';
import * as popoverFillSrcTs from '!raw-loader!./examples/popover-c-fill/popover-c-fill.component.ts';
import * as popoverDynamicHSrc from '!raw-loader!./examples/popover-dynamic/popover-dynamic-example.component.html';
import * as popoverDynamicTSrc from '!raw-loader!./examples/popover-dynamic/popover-dynamic-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent implements OnInit {
    popoverExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverSrc,
            fileName: 'popover-example',
            typescriptFileCode: popoverSrcTs,
            component: 'PopoverExampleComponent',
            scssFileCode: popoverSrcScss
        }
    ];

    popoverProgrammaticExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverProgrammaticHtmlSrc,
            fileName: 'popover-programmatic-open-example',
            scssFileCode: popoverProgrammaticScssSrc
        },
        {
            language: 'typescript',
            component: 'PopoverProgrammaticOpenExampleComponent',
            code: popoverProgrammaticTsSrc,
            fileName: 'popover-programmatic-open-example',
        }
    ];

    popoverPlacementExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverPlacementHtmlSrc,
            fileName: 'popover-placement-example',
            scssFileCode: popoverPlacementScssSrc
        },
        {
            language: 'typescript',
            component: 'PopoverPlacementExampleComponent',
            code: popoverPlacementTsSrc,
            fileName: 'popover-placement-example',
        }
    ];

    popoverModalExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverModalHtmlSrc,
            fileName: 'popover-modal-example',
        },
        {
            language: 'typescript',
            component: 'PopoverModalExampleComponent',
            code: popoverModalTsSrc,
            fileName: 'popover-modal-example',
        }
    ];

    popoverDynamicExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverDynamicHSrc,
            fileName: 'popover-dynamic-example',
        },
        {
            language: 'typescript',
            component: 'PopoverDynamicExampleComponent',
            code: popoverDynamicTSrc,
            fileName: 'popover-dynamic-example',
        }
    ];

    popoverFillExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverFillHSrc,
            fileName: 'popover-c-fill',
            typescriptFileCode: popoverFillSrcTs,
            component: 'PopoverCFillComponent'
        }
    ];

    ngOnInit() { }
}
