/* tslint:disable:no-inferrable-types */

import { DialogConfigBase } from '../../dialog/base/dialog-config-base.class';
import { InjectionToken } from '@angular/core';

export const MESSAGE_BOX_CONFIG = new InjectionToken<MessageBoxConfig>('MessageBoxConfig');
export const MESSAGE_BOX_DEFAULT_CONFIG = new InjectionToken<MessageBoxConfig>('Default MessageBoxConfig');
export type MessageBoxType = 'error' | 'success' | 'warning' | 'information' | 'confirmation';

export class MessageBoxConfig<T = any> extends DialogConfigBase<T> {
    type?: MessageBoxType;
    responsivePadding?: boolean = true;
}
