import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 *
 * ```html
 * <h4 fd-form-header>Form Header</h4>
 * ```
 */
@Component({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-form-header]',
    template: `<span class="fd-form-header__text"><ng-content></ng-content></span>`,
    styleUrl: './form-header.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FormHeaderComponent {
    /** @ignore */
    @HostBinding('class.fd-form-header')
    fdFormHeaderClass = true;
}
