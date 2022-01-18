import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

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
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-fieldset]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./fieldset.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FieldsetComponent {
    /** @hidden */
    @HostBinding('class.fd-fieldset')
    fdFieldClass = true;
}
