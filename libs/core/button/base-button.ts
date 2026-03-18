import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, booleanAttribute, inject, input, linkedSignal } from '@angular/core';

import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { ButtonModel } from './button.model';

export type GlyphPosition = 'before' | 'after';

export type ButtonType =
    | ''
    | 'standard'
    | 'positive'
    | 'negative'
    | 'attention'
    | 'half'
    | 'ghost'
    | 'transparent'
    | 'emphasized'
    | 'menu';

export const defaultButtonType = 'standard' as ButtonType;

@Directive({
    host: {
        '[class.fd-button--toggled]': 'toggledState()',
        '[attr.aria-pressed]': 'toggledState() || null',
        '[attr.aria-selected]': 'selectedState() || null'
    }
})
export class BaseButton implements HasElementRef, ButtonModel {
    /**
     * Whether the button is in a toggled state.
     * Used for toggle buttons that maintain an on/off state.
     * When true, adds the toggled class and sets aria-pressed="true".
     */
    readonly toggled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * Whether the button is selected.
     * Used in button groups or toolbars to indicate the currently selected option.
     * When true, sets aria-selected="true".
     */
    readonly selected = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * Native type attribute of the button element.
     * Defaults to 'button' to prevent form submission.
     * Set to 'submit' for form submission buttons or 'reset' for form reset buttons.
     */
    readonly type = input<string | null | undefined>('button');

    /**
     * Position of the icon relative to the button text.
     * - 'before': Icon appears before the text (default)
     * - 'after': Icon appears after the text
     */
    readonly glyphPosition = input<GlyphPosition>('before');

    /**
     * The icon to display in the button.
     * See the icon documentation for the list of available icons.
     * Example values: 'add', 'edit', 'delete', 'accept', 'decline'
     */
    readonly glyph = input<string | null | undefined>();

    /**
     * Font family for the icon.
     * Defaults to the SAP icon font.
     * Override when using custom icon fonts.
     */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /**
     * Visual style of the button.
     * Available types:
     * - 'standard': Default button style (blue)
     * - 'emphasized': High emphasis action (darker blue)
     * - 'positive': Successful/positive action (green)
     * - 'negative': Destructive/negative action (red)
     * - 'attention': Warning action (orange)
     * - 'transparent': No background, minimal style
     * - 'ghost': Subtle button with border on hover
     * - 'half': Split button style
     * - 'menu': Menu trigger button
     */
    readonly fdType = input<ButtonType>(defaultButtonType);

    /**
     * Text label displayed inside the button.
     * Can be used alone or combined with an icon.
     */
    readonly label = input<string | undefined>();

    /**
     * Whether to apply menu mode styling to the button.
     * When true, adds a dropdown arrow icon and menu-specific styling.
     */
    readonly fdMenu = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * Whether the button is disabled.
     * When true, the button cannot be interacted with and displays a disabled state.
     * This sets the native 'disabled' attribute on button elements.
     */
    readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * ARIA disabled attribute for accessibility.
     * Use this when you want to indicate a disabled state to screen readers
     * without preventing interaction (e.g., for showing tooltips on disabled buttons).
     * Unlike the 'disabled' attribute, this does not prevent click events.
     */
    readonly ariaDisabled = input<boolean, BooleanInput>(false, {
        alias: 'aria-disabled',
        transform: booleanAttribute
    });

    /**
     * ARIA label for the button.
     * Provides an accessible name for screen readers.
     * If not provided, special button types will auto-generate from label or glyph.
     */
    readonly ariaLabel = input<string | null | undefined>();

    /**
     * ARIA description for the button.
     * Provides additional context for screen readers beyond the label.
     * Special button types (emphasized, positive, negative, attention) will
     * auto-generate a description from their type if not provided.
     */
    readonly ariaDescription = input<string | null | undefined>();

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /**
     * Internal toggled state that can be mutated programmatically.
     * Syncs with the toggled input but allows internal modification.
     * @hidden
     */
    protected readonly toggledState = linkedSignal(() => this.toggled());

    /**
     * Internal selected state that can be mutated programmatically.
     * Syncs with the selected input but allows internal modification.
     * @hidden
     */
    protected readonly selectedState = linkedSignal(() => this.selected());

    /**
     * Internal button type state that can be mutated programmatically.
     * Syncs with the fdType input but allows internal modification.
     * @hidden
     */
    protected readonly fdTypeState = linkedSignal(() => this.fdType());

    /**
     * Internal disabled state that can be mutated programmatically.
     * Syncs with the disabled input but allows internal modification.
     * @hidden
     */
    protected readonly _disabledState = linkedSignal(() => this.disabled());

    /**
     * No-op for ButtonModel interface compatibility.
     * Signals automatically notify Angular when they change.
     * @deprecated Signals eliminate the need for manual change detection.
     */
    markForCheck(): void {
        // No-op: Signals automatically trigger change detection
    }

    /**
     * Programmatically set the disabled state.
     * This allows parent components or directives to update the button's disabled state.
     *
     * @param value - Whether the button should be disabled
     *
     * @example
     * ```typescript
     * // In a form component that needs to disable all buttons
     * this.submitButton.setDisabled(this.form.invalid);
     * ```
     */
    setDisabled(value: boolean): void {
        this._disabledState.set(value);
    }

    /**
     * Get the current disabled state.
     * Returns the internal disabled state which may have been modified programmatically.
     *
     * @returns True if the button is currently disabled
     *
     * @example
     * ```typescript
     * if (!this.button.isDisabled()) {
     *     this.button.setDisabled(true);
     * }
     * ```
     */
    isDisabled(): boolean {
        return this._disabledState();
    }

    /**
     * Programmatically set the button type.
     * This allows directives to override the button's visual style.
     *
     * @param value - The button type to apply
     *
     * @example
     * ```typescript
     * // A directive that changes button style based on validation state
     * if (this.validationFailed) {
     *     this.button.setFdType('negative');
     * }
     * ```
     */
    setFdType(value: ButtonType): void {
        this.fdTypeState.set(value);
    }

    /**
     * Get the current button type.
     * Returns the internal button type which may have been modified programmatically.
     *
     * @returns The current button type
     */
    getFdType(): ButtonType {
        return this.fdTypeState();
    }

    /**
     * Programmatically set the selected state.
     * This allows parent components to update the button's selected state.
     * Used in button groups or toolbars to indicate active selection.
     *
     * @param value - Whether the button should be selected
     *
     * @example
     * ```typescript
     * // In a button group component managing selection
     * this.buttons.forEach(btn => btn.setSelected(false));
     * this.activeButton.setSelected(true);
     * ```
     */
    setSelected(value: boolean): void {
        this.selectedState.set(value);
    }

    /**
     * Get the current selected state.
     * Returns the internal selected state which may have been modified programmatically.
     *
     * @returns True if the button is currently selected
     */
    isSelected(): boolean {
        return this.selectedState();
    }

    /**
     * Programmatically set the toggled state.
     * This allows parent components to update the button's toggled state.
     * Used for toggle buttons that maintain an on/off state.
     *
     * @param value - Whether the button should be toggled on
     *
     * @example
     * ```typescript
     * // In a toolbar with toggle buttons
     * handleBoldClick(): void {
     *     const isActive = !this.boldButton.isToggled();
     *     this.boldButton.setToggled(isActive);
     * }
     * ```
     */
    setToggled(value: boolean): void {
        this.toggledState.set(value);
    }

    /**
     * Get the current toggled state.
     * Returns the internal toggled state which may have been modified programmatically.
     *
     * @returns True if the button is currently toggled
     */
    isToggled(): boolean {
        return this.toggledState();
    }
}
