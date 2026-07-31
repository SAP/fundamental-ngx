import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    OnInit,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { resolveTranslationSignalFn } from '@fundamental-ngx/i18n';
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
        '[attr.aria-describedby]': 'ariaDescribedby() || null',
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
export class ButtonComponent extends BaseButton implements HasElementRef, OnInit {
    /** Button ID - default value is provided if not set  */
    readonly id = input(`fd-button-${++buttonId}`);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly contentDensityObserver = inject(ContentDensityObserver);

    /**
     * Check if button has a special type (emphasized, positive, negative, attention)
     * @hidden
     */
    protected readonly isSpecialButtonType = computed(() => SPECIAL_BUTTON_TYPES.has(this.fdTypeState()));

    /**
     * Calculate aria-describedby attribute value.
     * If the user explicitly provides aria-describedby (via input or native attribute),
     * that value is used as-is. Otherwise, auto-generates IDs referencing hidden description spans.
     * Returns null if no descriptions apply (attribute not set).
     * @hidden
     */
    protected readonly ariaDescribedby = computed(() => {
        // User-provided value takes full precedence — bypass the auto-generated spans
        const userProvided = this.ariaDescribedBy() ?? this.nativeAriaDescribedBy();
        if (userProvided != null) {
            return userProvided || null;
        }

        const ids: string[] = [];

        if (this.effectiveAriaDescription()) {
            ids.push(this.id() + '-description');
        }

        if (this.isSpecialButtonType()) {
            ids.push(this.id() + '-type-description');
        }

        return ids.length > 0 ? ids.join(' ') : null;
    });

    /**
     * Native aria-describedby attribute read from the DOM element.
     * Captured once during init; signals user intent to manage describedby manually.
     * @hidden
     */
    protected readonly nativeAriaDescribedBy = signal<string | null>(null);

    /**
     * Effective aria description: explicit input takes precedence over native attribute.
     * Prioritizes ariaDescription input, falls back to native attribute.
     * Empty string from ariaDescription is preserved (clears description).
     * @hidden
     */
    protected readonly effectiveAriaDescription = computed(
        () => this.ariaDescription() ?? this._nativeAriaDescription()
    );

    /**
     * Translated aria description for the current special button type, or null if not special.
     * @hidden
     */
    protected readonly defaultButtonTypeDescription = computed(() => {
        const type = this.fdTypeState() as keyof typeof this._typeDescriptions;
        return this._typeDescriptions[type]?.() ?? null;
    });

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

        if (this.isSpecialButtonType()) {
            return this.label() ?? this._glyphLabel() ?? null;
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

    /**
     * Native aria-description attribute read from the DOM element.
     * Captured once after render for use in aria-description computation.
     * @hidden
     */
    private readonly _nativeAriaDescription = signal<string | null>(null);

    /** @hidden Resolves per-key translation signals */
    private readonly _translate = resolveTranslationSignalFn();

    /** @hidden Translated aria descriptions for each special button type */
    private readonly _typeDescriptions = {
        attention: this._translate('coreButton.attentionTypeDescription'),
        emphasized: this._translate('coreButton.emphasizedTypeDescription'),
        negative: this._translate('coreButton.negativeTypeDescription'),
        positive: this._translate('coreButton.positiveTypeDescription')
    } as const;

    /** @hidden */
    constructor() {
        super();
    }

    /**
     * Capture native aria-label and aria-description attributes during initialization.
     * Runs during ngOnInit to ensure attributes are captured before rendering the template.
     * The native aria-description is removed from the DOM after capture to prevent
     * duplicate accessibility attributes (ACC-264.1).
     */
    ngOnInit(): void {
        const nativeLabel = this.elementRef.nativeElement.getAttribute('aria-label');
        if (nativeLabel) {
            this._nativeAriaLabel.set(nativeLabel);
        }

        const nativeDescription = this.elementRef.nativeElement.getAttribute('aria-description');
        if (nativeDescription) {
            this._nativeAriaDescription.set(nativeDescription);
            // Remove native attribute to prevent ACC-264.1 (duplicate aria-description)
            this.elementRef.nativeElement.removeAttribute('aria-description');
        }

        const nativeDescribedBy = this.elementRef.nativeElement.getAttribute('aria-describedby');
        if (nativeDescribedBy) {
            this.nativeAriaDescribedBy.set(nativeDescribedBy);
        }
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
