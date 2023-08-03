/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * Configuration for opening a dialog with the DialogService.
 */
import { Injectable, InjectionToken } from '@angular/core';
import { DialogConfigBase } from '../base/dialog-config-base.class';

export const DIALOG_DEFAULT_CONFIG = new InjectionToken<DialogConfig>('Default DialogConfig');

@Injectable()
export class DialogConfig<T = any> extends DialogConfigBase<T> {
    /** @deprecated Use 'mobile' to set the dialog to full-screen mode. */
    set fullScreen(value: boolean | undefined) {
        console.warn(
            "Property fullScreen is deprecated. Use Use 'mobile' to set the dialog to full-screen mode. instead."
        );
        this._fullScreen = value;
    }

    get fullScreen(): boolean | undefined {
        return this._fullScreen;
    }

    /** Whether the dialog should be draggable. */
    draggable?: boolean;

    /** Whether the dialog should be resizable. */
    resizable?: boolean;

    /** @hidden */
    private _fullScreen?: boolean;
}
