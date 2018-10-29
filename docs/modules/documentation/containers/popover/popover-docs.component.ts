import { Component } from '@angular/core';

import * as popoverSrc from '!raw-loader!./examples/popover-example.component.html';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent {
    popoverExampleHtml = popoverSrc;

    constructor() {}
}
