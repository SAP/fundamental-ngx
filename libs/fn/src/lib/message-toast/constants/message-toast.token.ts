/** Injection token that can be used to access the data that was passed in to a Message Toast. */
import { InjectionToken } from '@angular/core';

export const MESSAGE_TOAST_DATA = new InjectionToken<any>('MessageToastData');
