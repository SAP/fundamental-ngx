/**
 * Configuration for opening a dialog with the DialogService.
 */
import { Injectable, InjectionToken } from '@angular/core';
import { DialogConfigBase } from '../base/dialog-config-base.class';

export const DIALOG_DEFAULT_CONFIG = new InjectionToken<DialogConfig>('Default DialogConfig');

export type ExtendedDialogConfig<TAdditionalProperties extends Record<string, any> = Record<string, any>> =
    DialogConfig & TAdditionalProperties;

@Injectable()
export class DialogConfig<T = any> extends DialogConfigBase<T> {
    /** Whether the dialog should be draggable. */
    draggable?: boolean;

    /** Whether the dialog should be resizable. */
    resizable?: boolean;
}
