import { TemplateRef } from '@angular/core';

export interface DefaultDialogObject {

    /** Dialog Title */
    title?: string;

    /** Dialog Body */
    content?: TemplateRef<any>;

    /** Subheader Body */
    subHeader?: TemplateRef<any>;

    /** Approve Button Label */
    approveButton?: string;

    /** Approve Button Click Callback */
    approveButtonCallback?: Function;

    /** Cancel Button Label */
    cancelButton?: string;

    /** Cancel Button Click Callback */
    cancelButtonCallback?: Function;

    /** Close Button Callback. If left unprovided, the close button won't show */
    closeButtonCallback?: Function;
}
