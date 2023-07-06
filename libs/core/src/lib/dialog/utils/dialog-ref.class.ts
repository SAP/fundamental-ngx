import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, TemplateRef, Type } from '@angular/core';
import { DialogRefBase } from '../base/dialog-ref-base.class';

export interface DialogRefLoadingConfiguration {
    isLoading: boolean;
    loadingLabel?: string;
    loadingContent?: string | TemplateRef<any> | Type<any>;
}

/**
 * Reference to a dialog component
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */
@Injectable()
export class DialogRef<T = any, P = any> extends DialogRefBase<T, P> implements DialogRefLoadingConfiguration {
    /** @hidden */
    private readonly _onHide = new BehaviorSubject<boolean>(false);

    /** @hidden */
    private readonly _onLoading = new BehaviorSubject<boolean>(false);

    /** Observable that is triggered whenever the dialog should be visually hidden or visible.*/
    onHide: Observable<boolean> = this._onHide.asObservable();

    /** Observable that is triggered whenever the dialog should be displayed in loading state.*/
    onLoading: Observable<boolean> = this._onLoading.asObservable();

    /** Value used to determine if dialog window should be hidden or visible. */
    isLoading: boolean;

    /** Text, that is rendered in loading state */
    loadingLabel?: string;

    /** Content, that is rendered in loading state before busy indicator */
    loadingContent?: DialogRefLoadingConfiguration['loadingContent'];

    /**
     * Visually hides the dialog.
     * @param isHidden Value used to determine if dialog window should be hidden or visible.
     */
    hide(isHidden: boolean): void {
        this._onHide.next(isHidden);
    }

    /**
     * Displays the dialog in loading state.
     * @param loadingData Value used to determine if dialog window should be displayed in loading state.
     */
    loading(loadingData: boolean | DialogRefLoadingConfiguration): void {
        if (typeof loadingData === 'boolean') {
            return this.loading({ isLoading: loadingData });
        }
        this.loadingLabel = loadingData.loadingLabel;
        this.loadingContent = loadingData.loadingContent;
        this.isLoading = loadingData.isLoading;
        this._onLoading.next(loadingData.isLoading);
    }
}
