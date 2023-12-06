/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Injectable, InjectionToken, Injector } from '@angular/core';
import { DialogConfigBase } from '@fundamental-ngx/core/dialog';

export const MESSAGE_BOX_DEFAULT_CONFIG = new InjectionToken<MessageBoxConfig>('Default MessageBoxConfig');

export type MessageBoxType = 'error' | 'success' | 'warning' | 'information' | 'confirmation';

/** @hidden */
export abstract class MessageBoxHost {
    /** @hidden */
    _messageBoxConfig: MessageBoxConfig | undefined;
}

@Injectable()
export class MessageBoxConfig<T = any> extends DialogConfigBase<T> {
    /** Message box type */
    type?: MessageBoxType;
    /** Whether to show the semantic icon */
    showSemanticIcon?: boolean = false;
    /** Custom semantic icon name */
    customSemanticIcon?: string;
    /** Injector */
    injector?: Injector;
}
