import { Directive } from '@angular/core';

/**
 * Used for easily displaying forms with a margin. Not necessary for fundamental forms to be functional.
 *
 * ```html
 * <div fd-form-set>
 *     <div fd-form-item>
 *         ...
 *     </div>
 * </div>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-form-set]',
    host: {
        class: 'fd-form-set'
    }
})
export class FormSetDirective {}
