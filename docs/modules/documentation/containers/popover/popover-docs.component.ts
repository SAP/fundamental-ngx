import { Component } from '@angular/core';

import * as popoverSrc from '!raw-loader!./examples/popover-simple/popover-example.component.html';
import * as popoverProgrammaticHtmlSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.html';
import * as popoverProgrammaticTsSrc from '!raw-loader!./examples/popover-programmatic/popover-programmatic-open-example.component.ts';
import * as popoverPlacementHtmlSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.html';
import * as popoverPlacementTsSrc from '!raw-loader!./examples/popover-placement/popover-placement-example.component.ts';
import * as popoverModalHtmlSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.html';
import * as popoverModalTsSrc from '!raw-loader!./examples/popover-modal/popover-modal-example.component.ts';
import * as popoverFillHSrc from '!raw-loader!./examples/popover-c-fill/popover-c-fill.component.html';


@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent {
    popoverExampleHtml = popoverSrc;
    popoverProgrammaticExampleHtml = popoverProgrammaticHtmlSrc;
    popoverProgrammaticExampleTs = popoverProgrammaticTsSrc;
    popoverPlacementExampleHtml = popoverPlacementHtmlSrc;
    popoverPlacementExampleTs = popoverPlacementTsSrc;
    popoverModalExampleHtml = popoverModalHtmlSrc;
    popoverModalExampleTs = popoverModalTsSrc;
    popoverFillExampleH = popoverFillHSrc;
}
