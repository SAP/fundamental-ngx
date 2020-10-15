import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'fd-action-sheet-mobile-example',
    templateUrl: './action-sheet-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ActionSheetMobileExampleComponent {
    /** Whenever links should be visible **/
    @Input()
    isOpen = false;

    toggleOpen(): void {
        this.isOpen = !this.isOpen;
        console.log(this.isOpen)
    }
}
