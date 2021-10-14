import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'fd-action-sheet-mobile',
    templateUrl: './action-sheet-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetMobileComponent {
    /** Whenever links should be visible **/
    open = false;

    /** @hidden */
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>;
    } = null;

    constructor(private _changeDetectionRef: ChangeDetectorRef) {}

    toggleOpenState(isOpen: boolean): void {
        this.open = isOpen;
        this._changeDetectionRef.detectChanges();
    }
}
