/* tslint:disable:no-inferrable-types */

import { DialogConfigBase } from '../../dialog/base';
import { InjectionToken } from '@angular/core';

export const MESSAGE_BOX_CONFIG = new InjectionToken<MessageBoxConfig>('MessageBoxConfig');
export const MESSAGE_BOX_DEFAULT_CONFIG = new InjectionToken<MessageBoxConfig>('Default MessageBoxConfig');
export const MESSAGE_BOX_CONFIGURABLE_ELEMENT = new InjectionToken<MessageBoxConfigurableElement>('');

export type MessageBoxType = 'error' | 'success' | 'warning' | 'information' | 'confirmation';

export interface MessageBoxConfigurableElement {
    _messageBoxConfig: MessageBoxConfig
}

export class MessageBoxConfig<T = any> extends DialogConfigBase<T> {
    type?: MessageBoxType;
    responsivePadding?: boolean = true;
}
