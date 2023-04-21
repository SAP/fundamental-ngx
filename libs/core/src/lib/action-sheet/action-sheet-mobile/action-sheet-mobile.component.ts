import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

type OpenChangeHandle = (isOpen: boolean) => void;

@Component({
    selector: 'fd-action-sheet-mobile',
    templateUrl: './action-sheet-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgTemplateOutlet]
})
export class ActionSheetMobileComponent {
    /** Whenever links should be visible */
    open = false;

    /** @hidden */
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>;
        isOpenChangeHandle: OpenChangeHandle;
    } | null = null;

    /** @hidden */
    get _isOpenChangeHandle(): OpenChangeHandle | undefined {
        return this.childContent?.isOpenChangeHandle;
    }

    /** @hidden */
    constructor(private readonly _changeDetectionRef: ChangeDetectorRef) {}

    /** @hidden */
    toggleOpenState(isOpen: boolean): void {
        this.open = isOpen;
        this._changeDetectionRef.detectChanges();
    }
}
