/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Injectable, InjectionToken, Injector } from '@angular/core';
import { DialogConfigBase } from '@fundamental-ngx/core/dialog';

export const MESSAGE_BOX_DEFAULT_CONFIG = new InjectionToken<MessageBoxConfig>('Default MessageBoxConfig');

export type MessageBoxType = 'error' | 'success' | 'warning' | 'information' | 'confirmation';

/** @hidden */
export abstract class MessageBoxHost {
    _messageBoxConfig: MessageBoxConfig | undefined;
}

@Injectable()
export class MessageBoxConfig<T = any> extends DialogConfigBase<T> {
    type?: MessageBoxType;
    showSemanticIcon?: boolean = false;
    customSemanticIcon?: string;
    injector?: Injector;
}
