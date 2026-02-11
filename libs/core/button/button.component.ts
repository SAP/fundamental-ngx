import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { BaseButton } from './base-button';

import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_BUTTON_COMPONENT } from './tokens';

let buttonId = 0;

/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ``` selector: button[fd-button], a[fd-button] ```
 *
 * ```html
 * <button fd-button label="Button Text"></button>
 * <a fd-button label="Button Text"></a>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[fd-button], a[fd-button], span[fd-button]',
    exportAs: 'fd-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.type]': 'type()',
        '[attr.disabled]': '_disabledState() || null',
        '[attr.aria-disabled]': 'ariaDisabled() || null',
        '[attr.aria-label]': 'buttonArialabel()',
        '[attr.aria-description]': 'buttonAriaDescription()',
        '[attr.id]': 'id()',
        '[class]': 'cssClass()',
        '(click)': 'clicked($event)'
    },
    providers: [
        contentDensityObserverProviders(),
        {
            provide: FD_BUTTON_COMPONENT,
            useExisting: ButtonComponent
        }
    ],
    imports: [IconComponent]
})
export class ButtonComponent extends BaseButton implements HasElementRef {
    /** Button ID - default value is provided if not set  */
    readonly id = input(`fd-button-${++buttonId}`);

    /** @hidden */
    readonly specialButtonType: Array<string> = ['emphasized', 'positive', 'negative', 'attention'];

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /**
     * Calculate aria-label attribute
     * @hidden
     */
    protected readonly buttonArialabel = computed(() => {
        if (this.ariaLabel()) {
            return this.ariaLabel(); // return the input aria-label
        }

        const attrAriaLabel = this.elementRef.nativeElement.getAttribute('aria-label');
        if (attrAriaLabel) {
            return attrAriaLabel; // return the attribute aria-label
        }

        if (this.specialButtonType.includes(this.fdTypeState())) {
            return this.label() ?? this.glyph()?.replace(/-/g, ' ') ?? null;
        }

        return null;
    });

    /**
     * Calculate aria-description attribute
     * @hidden
     */
    protected readonly buttonAriaDescription = computed(() => {
        if (this.ariaDescription()) {
            return this.ariaDescription();
        }

        if (this.specialButtonType.includes(this.fdTypeState())) {
            return this.fdTypeState();
        }

        return null;
    });

    /** @hidden */
    protected readonly contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    protected readonly cssClass = computed(() =>
        [
            'fd-button',
            this.fdTypeState() ? `fd-button--${this.fdTypeState()}` : '',
            this.fdMenu() ? 'fd-button--menu' : '',
            this._disabledState() || this.ariaDisabled() ? 'is-disabled' : '',
            this.toggledState() ? 'fd-button--toggled' : ''
        ]
            .filter(Boolean)
            .join(' ')
    );

    /** @hidden */
    constructor() {
        super();
        this.contentDensityObserver.subscribe();
    }

    /** Forces the focus outline around the button, which is not default behavior in Safari. */
    protected clicked(event: Event): void {
        const target = event?.target as HTMLElement;
        // Target can be empty during unit tests execution.
        if (target && document.activeElement !== target) {
            target.focus();
        }
    }
}
