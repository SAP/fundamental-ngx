import { Component } from '@angular/core';

import * as popoverSrc from '!raw-loader!./examples/popover-simple/popover-example.component.html';
import * as popoverProgrammaticHtmlSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.html';
import * as popoverProgrammaticTsSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.ts';
import * as popoverPlacementHtmlSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.html';
import * as popoverPlacementTsSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.ts';
import * as popoverModalHtmlSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.html';
import * as popoverModalTsSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.ts';
import * as popoverFillHSrc from '!raw-loader!./examples/popover-c-fill/popover-c-fill.component.html';
import * as popoverDynamicHSrc from '!raw-loader!./examples/popover-dynamic/popover-dynamic-example.component.html';
import * as popoverDynamicTSrc from '!raw-loader!./examples/popover-dynamic/popover-dynamic-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent {

    popoverExample: ExampleFile[] = [{
        language: 'html',
        code: popoverSrc
    }];

    popoverProgrammaticExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverProgrammaticHtmlSrc,
        },
        {
            language: 'typescript',
            code: popoverProgrammaticTsSrc
        }
    ];

    popoverPlacementExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverPlacementHtmlSrc,
        },
        {
            language: 'typescript',
            code: popoverPlacementTsSrc
        }
    ];

    popoverModalExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverModalHtmlSrc,
        },
        {
            language: 'typescript',
            code: popoverModalTsSrc
        }
    ];

    popoverDynamicExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverDynamicHSrc,
        },
        {
            language: 'typescript',
            code: popoverDynamicTSrc
        }
    ];

    popoverFillExample: ExampleFile[] = [{
        language: 'html',
        code: popoverFillHSrc
    }];
}
