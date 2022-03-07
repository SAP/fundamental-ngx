import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';

type OpenChangeHandle = (isOpen: boolean) => void;

@Component({
    selector: 'fd-action-sheet-mobile',
    templateUrl: './action-sheet-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetMobileComponent {
    /** Whenever links should be visible */
    open = false;

    /** @hidden */
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>;
        isOpenChangeHandle: OpenChangeHandle;
    } = null;

    /** @hidden */
    get _isOpenChangeHandle(): OpenChangeHandle {
        return this.childContent.isOpenChangeHandle;
    }

    /** @hidden */
    constructor(private readonly _changeDetectionRef: ChangeDetectorRef) {}

    /** @hidden */
    toggleOpenState(isOpen: boolean): void {
        this.open = isOpen;
        this._changeDetectionRef.markForCheck();
    }
}
