import { ElementRef, InjectionToken, Provider, Type } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

/** An injection token, that should be used with all controls, that can be put inside `fd-form-item` */
export const FORM_ITEM_CONTROL = new InjectionToken<FormItemControl>('Form Item Control');

/** Utility function to provide `FORM_ITEM_CONTROL` injection token  */
export function registerFormItemControl(control: Type<FormItemControl>): Provider {
    return {
        provide: FORM_ITEM_CONTROL,
        useExisting: control,
        multi: true
    };
}

/** Set of fields of FormItemControl component */
export interface FormItemControl {
    ariaLabelledBy: Nullable<string>;
    elmRef?: ElementRef;
}
