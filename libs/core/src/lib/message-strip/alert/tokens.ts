import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { MessageStripAlertPosition } from './message-strip-alert.position';
import { Observable } from 'rxjs';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MessageStripAlertRef } from './message-strip-alert.ref';
import { MessageStripConfiguration } from './message-strip-configuration-type';

/**
 * Injection token for getting the position of the message strip alert container.
 * Is available in any of the message strip alert components and in footer component.
 */
export const MessageStripAlertContainerPosition = new InjectionToken<MessageStripAlertPosition>(
    'MessageStripAlertContainerPosition'
);
/**
 * Injection token for getting the list of the message strip alert refs
 * in the given container. Is available in the footer component injection
 * context.
 */
export const MessageStripAlertContainerAlertRefs = new InjectionToken<Observable<Nullable<MessageStripAlertRef[]>>>(
    'MessageStripAlertContainerAlertRefs'
);

export const MessageStripAlertComponentData = new InjectionToken<{
    content: string | TemplateRef<any> | Type<any>;
    messageStripConfig: MessageStripConfiguration;
}>('MessageStripAlertComponentData');
