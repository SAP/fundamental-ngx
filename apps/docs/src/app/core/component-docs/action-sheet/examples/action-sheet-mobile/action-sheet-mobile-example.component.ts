import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'fd-action-sheet-mobile-example',
    templateUrl: './action-sheet-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetMobileExampleComponent {
    /** Whenever links should be visible **/
    @Input()
    isOpen = false;

    toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }
}
