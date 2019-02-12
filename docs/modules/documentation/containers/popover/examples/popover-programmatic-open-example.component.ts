import { Component, ViewChild } from '@angular/core';
import { PopoverComponent } from '../../../../../../library/src/lib/popover/popover.component';

@Component({
    selector: 'fd-popover-programmatic-open-example',
    templateUrl: './popover-programmatic-open-example.component.html',
    styles: [
        `.fd-button {
            margin: 10px;
        }`
    ]
})
export class PopoverProgrammaticOpenExampleComponent {

    @ViewChild('customPopover') customPopover: PopoverComponent;

    customPopoverToggle(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.customPopover.isOpen) {
            this.customPopover.close();
        } else {
            this.customPopover.open();
        }
    }

}
