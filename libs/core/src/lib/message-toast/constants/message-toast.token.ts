/** Injection token that can be used to access the data that was passed in to a Message Toast. */
import { InjectionToken } from '@angular/core';
import { MessageToastConfig } from '../config/message-toast.config';

export const MESSAGE_TOAST_DATA = new InjectionToken<any>('MessageToastData');
export const MESSAGE_TOAST_CONFIG = new InjectionToken<MessageToastConfig>('MessageToastConfig');
