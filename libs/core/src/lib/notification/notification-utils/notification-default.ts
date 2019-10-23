import { TemplateRef } from '@angular/core';

/**
 * Object to generate default notification component, without creating any template.
 */
export class NotificationDefault {

    /** Notification Title */
    title?: string;

    /** Notification Description */
    description?: string;

    /** Notification Meta Data */
    metadata?: string;

    /** More Info button label */
    moreInfo?: string;

    /** More Info button Click Callback */
    moreInfoCallback?: Function;

    /** Approve Button Label */
    approve?: string;

    /** Approve Button Click Callback */
    approveCallback?: Function;

    /** Cancel Button Label */
    cancel?: string;

    /** Cancel Button Click Callback */
    cancelCallback?: Function;

    /** Close Button Callback. If not set empty, the close button won't show */
    closeButtonCallback?: Function;

    /** Avatar Template */
    avatar?: TemplateRef<any>
}
