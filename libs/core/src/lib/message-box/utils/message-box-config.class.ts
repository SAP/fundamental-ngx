/* tslint:disable:no-inferrable-types */

import { Injectable, InjectionToken, Injector } from '@angular/core';
import { DialogConfigBase } from '@fundamental-ngx/core/dialog';

export const MESSAGE_BOX_DEFAULT_CONFIG = new InjectionToken<MessageBoxConfig>('Default MessageBoxConfig');
/** @hidden */
export const MESSAGE_BOX_CONFIGURABLE_ELEMENT = new InjectionToken<MessageBoxConfigurableElement>(
    'Configurable Message Box element'
);

export type MessageBoxType = 'error' | 'success' | 'warning' | 'information' | 'confirmation';

/** @hidden */
export interface MessageBoxConfigurableElement {
    messageBoxConfig: MessageBoxConfig;
}

@Injectable()
export class MessageBoxConfig<T = any> extends DialogConfigBase<T> {
    type?: MessageBoxType;
    showSemanticIcon?: boolean = false;
    customSemanticIcon?: string;
    injector?: Injector;
}
