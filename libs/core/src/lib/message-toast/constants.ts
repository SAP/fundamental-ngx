import { InjectionToken } from '@angular/core';
import { MessageToastConfig } from './message-toast-utils/message-toast-config';

export const MESSAGE_TOAST_CONFIG = new InjectionToken<MessageToastConfig>('MessageToastConfig');
