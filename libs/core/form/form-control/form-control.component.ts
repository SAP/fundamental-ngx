import {
    Attribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '../form-item-control/form-item-control';

/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'input[fd-form-control], textarea[fd-form-control]',
    template: ` <ng-content></ng-content>`,
    styleUrl: './form-control.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [registerFormItemControl(FormControlComponent), contentDensityObserverProviders()],
    host: {
        '[class]': 'cssClass()',
        '[attr.aria-label]': 'ariaLabel() ?? ariaLabelAttr ?? null',
        '[attr.aria-labelledby]': 'ariaLabelledBy() ?? ariaLabelledByAttr ?? null',
        '[attr.aria-invalid]': 'state() === "error" ? true : null',
        '[attr.type]': 'type() || null'
    }
})
export class FormControlComponent implements FormItemControl {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    readonly state = input<FormStates | null>(null);

    /** Type of the form control. */
    readonly type = input<string>();

    /** user's custom classes */
    readonly class = input<string>('');

    /** aria-label for form-control. */
    readonly ariaLabel = input<string | undefined | null>(null);

    /** aria-label for form-control. */
    readonly ariaLabelledBy = input<string | undefined | null>(null);

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);

    /** @hidden Injected to activate content density CSS class effects */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const tagName = this.elementRef.nativeElement.tagName.toLowerCase();
        return [
            this.state() ? 'is-' + this.state() : '',
            this.class(),
            tagName === 'textarea' ? 'fd-textarea' : tagName === 'input' ? 'fd-input' : ''
        ]
            .filter(Boolean)
            .join(' ');
    });

    /** @hidden */
    constructor(
        @Attribute('aria-label') protected ariaLabelAttr: string,
        @Attribute('aria-labelledby') protected ariaLabelledByAttr: string
    ) {}
}
