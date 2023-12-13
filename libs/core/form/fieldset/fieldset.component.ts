import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

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
    styleUrl: './fieldset.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FieldsetComponent {
    /** @ignore */
    @HostBinding('class.fd-fieldset')
    fdFieldClass = true;
}
