import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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

    constructor(private cdRef: ChangeDetectorRef) {}

    open(): void {
        this.customPopover.isOpen = true;
        this.cdRef.detectChanges();
    }

    close(): void {
        this.customPopover.isOpen = false;
        this.cdRef.detectChanges();
    }

    customPopoverToggle() {
        if (!this.customPopover.isOpen) {
            this.customPopover.open();
            console.log('should open: ' + this.customPopover.isOpen);
        } else {
            this.customPopover.close();
            console.log('should close: ' + this.customPopover.isOpen);
        }
    }

}
