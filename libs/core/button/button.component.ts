import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { BaseButton } from './base-button';

import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_BUTTON_COMPONENT } from './tokens';

let buttonId = 0;

const SPECIAL_BUTTON_TYPES = new Set(['emphasized', 'positive', 'negative', 'attention']);

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
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly contentDensityObserver = inject(ContentDensityObserver);

    /**
     * Calculate aria-label attribute
     * @hidden
     */
    protected readonly buttonArialabel = computed(() => {
        if (this.ariaLabel()) {
            return this.ariaLabel(); // return the input aria-label
        }

        const nativeLabel = this._nativeAriaLabel();

        if (nativeLabel) {
            return nativeLabel; // return the native attribute aria-label
        }

        if (SPECIAL_BUTTON_TYPES.has(this.fdTypeState())) {
            return this.label() ?? this._glyphLabel() ?? null;
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

        if (SPECIAL_BUTTON_TYPES.has(this.fdTypeState())) {
            return this.fdTypeState();
        }

        return null;
    });

    /**
     * Computed CSS classes for the button.
     * Built as a string to avoid array allocation overhead.
     * @hidden
     */
    protected readonly cssClass = computed(() => {
        let classes = 'fd-button';

        const type = this.fdTypeState();
        if (type) {
            classes += ` fd-button--${type}`;
        }

        if (this.fdMenu()) {
            classes += ' fd-button--menu';
        }

        if (this._disabledState() || this.ariaDisabled()) {
            classes += ' is-disabled';
        }

        if (this.toggledState()) {
            classes += ' fd-button--toggled';
        }

        return classes;
    });

    /**
     * Memoized glyph label for aria-label fallback.
     * Transforms glyph name (e.g., "slim-arrow-down") to readable text (e.g., "slim arrow down").
     * @hidden
     */
    private readonly _glyphLabel = computed(() => {
        const glyph = this.glyph();
        return glyph ? glyph.replace(/-/g, ' ') : null;
    });

    /**
     * Native aria-label attribute read from the DOM element.
     * Captured once after render for use in aria-label computation.
     * @hidden
     */
    private readonly _nativeAriaLabel = signal<string | null>(null);

    /** @hidden */
    constructor() {
        super();

        // Read native aria-label attribute once after render
        afterNextRender(() => {
            const nativeLabel = this.elementRef.nativeElement.getAttribute('aria-label');
            if (nativeLabel) {
                this._nativeAriaLabel.set(nativeLabel);
            }
        });
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
