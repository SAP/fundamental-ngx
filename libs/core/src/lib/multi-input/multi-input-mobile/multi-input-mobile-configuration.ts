import { InjectionToken } from '@angular/core';

export const MULTI_INPUT_MOBILE_CONFIG = new InjectionToken<string[]>('MultiInputMobileConfiguration');


export class MultiInputMobileConfiguration {

    /** Dialog Title */
    title?: string;

    /** Approve Button Label. If empty, button will not appear */
    approveButton?: string;

    /** Cancel Button Label. If empty, button will not appear */
    cancelButton?: string;

    /** Defines if the close button should appear */
    closeButton?: boolean;

}
