import { Provider } from '@angular/core';
import { MessageToastConfig } from './config/message-toast.config';
import { MESSAGE_TOAST_CONFIG } from './constants/message-toast.token';

/**
 * Function allows to provide custom configuration for Message Toast.
 * @param config
 * @returns
 */
export function provideMessageToastConfig(config: MessageToastConfig): Provider {
    return {
        provide: MESSAGE_TOAST_CONFIG,
        useValue: config
    };
}
