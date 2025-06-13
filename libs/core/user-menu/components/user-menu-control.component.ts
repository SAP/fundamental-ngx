import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';

import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'fd-user-menu-control',
    template: `<ng-content />`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class UserMenuControlComponent {
    /** Event emitted event when control element is clicked */
    @Output()
    clicked: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden Saves element that is focused before dialog opened */
    private _focusedElementBeforeDialogOpened: HTMLElement | null = null;

    /** @hidden */
    @HostListener('click', ['$event'])
    onClick(): void {
        this._focusedElementBeforeDialogOpened = _getFocusedElementPierceShadowDom();
        this.clicked.emit();
    }

    /** @hidden */
    _focus(): void {
        this._focusedElementBeforeDialogOpened?.focus();
    }
}
