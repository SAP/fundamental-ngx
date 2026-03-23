import { Directive, ElementRef, effect, inject, input, isDevMode } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { BaseButton, ButtonType } from './base-button';
import { FD_BUTTON_COMPONENT } from './tokens';

export const badgeEnabledButtonTypes: ButtonType[] = ['emphasized', 'standard', 'ghost', 'transparent'];

/**
 * Directive to display a badge on a button.
 *
 * Badges are small status indicators that can be added to buttons to show
 * notifications, counts, or other supplementary information.
 *
 * Usage:
 * ```html
 * <button fd-button>
 *   Button Text
 *   <fd-button-badge [content]="5" />
 * </button>
 * ```
 *
 * @note Badge content should not exceed 4 characters for optimal display.
 * @note Badges are only supported on emphasized, standard, ghost, and transparent button types.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-button-badge',
    host: {
        class: 'fd-button__badge'
    }
})
export class ButtonBadgeDirective implements HasElementRef {
    /**
     * Content to display inside the badge.
     * Should not exceed 4 characters for optimal display.
     * Supports both string and numeric values.
     */
    readonly content = input<string | number>();

    /** @hidden */
    readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    protected readonly buttonComponent = inject<BaseButton>(FD_BUTTON_COMPONENT, { host: true });

    /** @hidden */
    constructor() {
        // Single-purpose effect: Sync badge content to DOM
        effect(() => {
            this.elementRef.nativeElement.textContent = String(this.content() ?? '');
        });

        // Validation effect only in development mode (zero overhead in production)
        if (isDevMode()) {
            effect(() => {
                this._validateBadge();
            });
        }
    }

    /**
     * Validates badge configuration in development mode.
     * Checks content length and button type compatibility.
     * @hidden
     */
    private _validateBadge(): void {
        const contentValue = this.content();
        if (contentValue && contentValue.toString().length > 4) {
            console.warn('Badge content should not be longer than 4 characters');
        }

        if (!badgeEnabledButtonTypes.includes(this.buttonComponent.getFdType())) {
            console.warn(
                `Currently the ${JSON.stringify(
                    badgeEnabledButtonTypes
                )} type of buttons are required for Badge enablement`
            );
        }
    }
}
