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
        '[class]': '_cssClass()',
        '[attr.type]': '_internalType()',
        '[attr.aria-label]': '_ariaLabelAttr || ariaLabel() || null',
        '[attr.aria-labelledby]': '_ariaLabelledByAttr || ariaLabelledBy() || null',
        '[attr.aria-invalid]': 'state() === "error" ? true : null'
    }
})
export class FormControlComponent implements FormItemControl {
    /**
     * The state of the form control - applies css classes.
     * Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    readonly state = input<FormStates | null>(null);

    /**
     * Type of the form control.
     * For type="number", it will be converted to type="text" internally.
     */
    readonly type = input<string>('text');

    /**
     * User's custom classes
     */
    readonly class = input<string>('');

    /**
     * aria-label for form-control.
     */
    readonly ariaLabel = input<string | undefined | null>();

    /**
     * aria-labelledby for form-control.
     */
    readonly ariaLabelledBy = input<string | undefined | null>();

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);

    /** @hidden */
    protected readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    protected readonly _ariaLabelAttr: string;

    /** @hidden */
    protected readonly _ariaLabelledByAttr: string;

    /** @hidden Computed CSS classes */
    protected readonly _cssClass = computed(() => {
        const tagName = this.elementRef.nativeElement.tagName.toLowerCase();
        const classes: string[] = [];

        // Add state class
        if (this.state()) {
            classes.push(`is-${this.state()}`);
        }

        // Add base class
        if (tagName === 'textarea') {
            classes.push('fd-textarea');
        } else if (tagName === 'input') {
            classes.push('fd-input');
        }

        // Add custom classes
        if (this.class()) {
            classes.push(this.class());
        }

        return classes.join(' ');
    });

    /** @hidden Internal type - converts number to text */
    protected readonly _internalType = computed(() => {
        const inputType = this.type();
        return inputType === 'number' ? 'text' : inputType;
    });

    /** @hidden */
    constructor(
        @Attribute('aria-label') ariaLabelAttr: string,
        @Attribute('aria-labelledby') ariaLabelledByAttr: string
    ) {
        this._ariaLabelAttr = ariaLabelAttr;
        this._ariaLabelledByAttr = ariaLabelledByAttr;
        this._contentDensityObserver.subscribe();
    }
}
