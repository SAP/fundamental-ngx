import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

/**
 * Directive to be applied to the parent of a form control.
 *
 * ```html
 * <div fd-form-item>
 *     <input fd-form-control type="text" />
 * </div>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line: component-selector
    selector: '[fd-form-item]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemComponent {
    /** Whether the form item is inline. */
    @Input()
    @HostBinding('class.fd-form-item--inline')
    isInline = false;

    /** Whether the form item is horizontal. */
    @Input()
    @HostBinding('class.fd-form-item--horizontal')
    horizontal = false;

    /** @hidden */
    @HostBinding('class.fd-form-item')
    fdFormItemClass = true;
}
