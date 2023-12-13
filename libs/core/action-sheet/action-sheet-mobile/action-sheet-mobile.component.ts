import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef } from '@angular/core';

type OpenChangeHandle = (isOpen: boolean) => void;

@Component({
    selector: 'fd-action-sheet-mobile',
    templateUrl: './action-sheet-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet]
})
export class ActionSheetMobileComponent {
    /** Whenever links should be visible */
    open = false;

    /** @ignore */
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>;
        isOpenChangeHandle: OpenChangeHandle;
    } | null = null;

    /** @ignore */
    get _isOpenChangeHandle(): OpenChangeHandle | undefined {
        return this.childContent?.isOpenChangeHandle;
    }

    /** @ignore */
    constructor(private readonly _changeDetectionRef: ChangeDetectorRef) {}

    /** @ignore */
    toggleOpenState(isOpen: boolean): void {
        this.open = isOpen;
        this._changeDetectionRef.detectChanges();
    }
}
