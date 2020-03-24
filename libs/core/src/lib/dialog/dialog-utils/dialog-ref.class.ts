import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';

/**
 * Reference to a dialog component generated via the DialogService.
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */

/** DialogRef injection token */
export const DIALOG_REF = new InjectionToken<string[]>('DialogRef');

export class DialogRef {
    private readonly _afterClosed = new Subject<any>();
    private readonly _onHide = new BehaviorSubject<boolean>(false);
    private readonly _onLoading = new BehaviorSubject<boolean>(false);

    /**
     * Observable that is triggered when the dialog is closed.
     * On close a *result* is passed back. On dismiss, an *error* is returned instead.
     */
    public afterClosed: Observable<any> = this._afterClosed.asObservable();

    /** Observable that is triggered whenever the dialog should be visually hidden or visible.*/
    public onHide: Observable<boolean> = this._onHide.asObservable();

    /** Observable that is triggered whenever the dialog should be displayed in loading state.*/
    public onLoading: Observable<boolean> = this._onLoading.asObservable();

    /** Data passed from the calling component to the content.*/
    public data: any;

    /**
     * Closes the dialog and passes the argument to the afterClosed observable.
     * @param result Value passed back to the observable as a result.
     */
    close(result?: any): void {
        this._afterClosed.next(result);
        this._afterClosed.complete();
    }

    /**
     * Dismisses the dialog and passes the argument to the afterClosed observable as an error.
     * @param reason Value passed back to the observable as an error.
     */
    dismiss(reason?: any): void {
        this._afterClosed.error(reason);
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
