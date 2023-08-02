import { Directive } from '@angular/core';
import deprecated from 'deprecated-decorator';

/**
 * @deprecated
 * Consider using `fd-button-bar`
 */
@deprecated('fd-button-bar')
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-message-box-decisive-button]',
    host: {
        '[class.fd-message-box__decisive-button]': 'true'
    }
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MessageBoxDecisiveButton {}
