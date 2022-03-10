/** Injection token that can be used to access the data that was passed in to a Notification. */
import { InjectionToken } from '@angular/core';

export const NOTIFICATION_DATA = new InjectionToken<any>('NotificationData');
