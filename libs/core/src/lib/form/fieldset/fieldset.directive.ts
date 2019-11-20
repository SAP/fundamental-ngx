import { Directive } from '@angular/core';

/**
 * Used for easily displaying forms with a margin. Not necessary for fundamental forms to be functional.
 *
 * ```html
 * <div fd-fieldset
 *     <div fd-form-item>
 *         ...
 *     </div>
 * </div>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-fieldset]',
    host: {
        class: 'fd-fieldset'
    }
})
export class FieldsetDirective {}
