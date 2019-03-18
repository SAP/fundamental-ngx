import { Component } from '@angular/core';

import * as simpleH from '!raw-loader!./examples/popover-directive-example/popover-directive-example.component.html';
import * as triggerH from '!raw-loader!./examples/popover-triggers/popover-triggers.component.html';
import * as programH from '!raw-loader!./examples/popover-programmatic/popover-programmatic.component.html';

@Component({
    selector: 'app-popover-directive',
    templateUrl: './popover-directive-docs.component.html',
    styleUrls: ['./popover-directive-docs.component.scss']
})
export class PopoverDirectiveDocsComponent {
    simplePopoverH = simpleH;
    triggerPopoverH = triggerH;
    programmaticPopoverH = programH;
}
