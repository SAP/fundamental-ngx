import { Directive } from '@angular/core';

/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-message-box-decisive-button]',
    host: {
        '[class.fd-message-box__decisive-button]': 'true'
    }
})
export class MessageBoxDecisiveButton {}
