/* tslint:disable:no-inferrable-types */
/**
 * Configuration for opening a dialog with the DialogService.
 */
import { InjectionToken } from '@angular/core';
import { DialogConfigBase } from '../base/dialog-config-base.class';

export const DIALOG_CONFIG = new InjectionToken<string[]>('DialogConfig');
export const DIALOG_DEFAULT_CONFIG = new InjectionToken<string[]>('Default DialogConfig');

export class DialogConfig<T = any> extends DialogConfigBase<T> {
    /** Whether the dialog should be displayed in full screen mode. */
    fullScreen?: boolean;

    /** Whether the dialog should be draggable. */
    draggable?: boolean;

    /** Whether the dialog should be resizable. */
    resizable?: boolean;
}
