/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * Configuration for opening a dialog with the DialogService.
 */
import { Injectable, InjectionToken } from '@angular/core';
import { DialogConfigBase } from '../base/dialog-config-base.class';

export const DIALOG_DEFAULT_CONFIG = new InjectionToken<DialogConfig>('Default DialogConfig');

@Injectable()
export class DialogConfig<T = any> extends DialogConfigBase<T> {
    /** Whether the dialog should be draggable. */
    draggable?: boolean;

    /** Whether the dialog should be resizable. */
    resizable?: boolean;
}
