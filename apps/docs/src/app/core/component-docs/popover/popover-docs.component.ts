import { Component } from '@angular/core';

import * as popoverSrc from '!raw-loader!./examples/popover-simple/popover-example.component.html';
import * as popoverSrcScss from '!raw-loader!./examples/popover-simple/popover-example.component.scss';
import * as popoverSrcTs from '!raw-loader!./examples/popover-simple/popover-example.component.ts';
import * as popoverComplexSrc from '!raw-loader!./examples/popover-complex-example/popover-complex-example.component.html';
import * as popoverComplexSrcTs from '!raw-loader!./examples/popover-complex-example/popover-complex-example.component.ts';
import * as popoverProgrammaticHtmlSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.html';
import * as popoverProgrammaticScssSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.scss';
import * as popoverProgrammaticTsSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.ts';
import * as popoverPlacementHtmlSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.html';
import * as popoverPlacementTsSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.ts';
import * as popoverModalHtmlSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.html';
import * as popoverModalTsSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.ts';
import * as popoverFillHSrc from '!raw-loader!./examples/popover-c-fill/popover-c-fill.component.html';
import * as popoverFillSrcTs from '!raw-loader!./examples/popover-c-fill/popover-c-fill.component.ts';
import * as popoverDynamicHSrc from '!raw-loader!./examples/popover-dynamic/popover-dynamic-example.component.html';
import * as popoverDynamicTSrc from '!raw-loader!./examples/popover-dynamic/popover-dynamic-example.component.ts';
import * as dropdownPopoverHtml from '!raw-loader!./examples/popover-dropdown/popover-dropdown.component.html';
import * as dropdownPopoverTs from '!raw-loader!./examples/popover-dropdown/popover-dropdown-example.component.ts';
import * as dropdownPopoverScss from '!raw-loader!./examples/popover-dropdown/popover-dropdown.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent {
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

    popoverComplex: ExampleFile[] = [
        {
            language: 'html',
            code: popoverComplexSrc,
            fileName: 'popover-complex-example',
            typescriptFileCode: popoverComplexSrcTs,
            component: 'PopoverComplexExampleComponent',
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

    dropdownPopover: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownPopoverHtml,
            fileName: 'popover-dropdown',
            scssFileCode: dropdownPopoverScss
        },
        {
            language: 'typescript',
            code: dropdownPopoverTs,
            fileName: 'popover-dropdown-example',
            typescriptFileCode: dropdownPopoverTs,
            component: 'PopoverDropdownExampleComponent',
        },
        {
            language: 'scss',
            code: dropdownPopoverScss,
            fileName: 'popover-dropdown',
            component: 'PopoverDropdownComponent',
            scssFileCode: dropdownPopoverScss
        }
    ];
}
