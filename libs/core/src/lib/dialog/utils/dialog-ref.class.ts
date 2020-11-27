import { BehaviorSubject, Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { DialogRefBase } from '../base/dialog-ref-base.class';

/**
 * Reference to a dialog component
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */

/** DialogRef injection token */
export const DIALOG_REF = new InjectionToken<string[]>('DialogRef');

export class DialogRef<T = any> extends DialogRefBase<T> {
    private readonly _onHide = new BehaviorSubject<boolean>(false);
    private readonly _onLoading = new BehaviorSubject<boolean>(false);

    /** Observable that is triggered whenever the dialog should be visually hidden or visible.*/
    public onHide: Observable<boolean> = this._onHide.asObservable();

    /** Observable that is triggered whenever the dialog should be displayed in loading state.*/
    public onLoading: Observable<boolean> = this._onLoading.asObservable();

    /** @hidden */
    constructor() {
        super();
    }

    /**
     * Visually hides the dialog.
     * @param isHidden Value used to determine if dialog window should be hidden or visible.
     */
    hide(isHidden: boolean): void {
        this._onHide.next(isHidden);
    }

    /**
     * Displays the dialog in loading state.
     * @param isLoading Value used to determine if dialog window should be displayed in loading state.
     */
    loading(isLoading: boolean): void {
        this._onLoading.next(isLoading);
    }
}
