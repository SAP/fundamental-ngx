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
    /** Whether button is in toggled state. */
    readonly toggled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** Whether button is selected. */
    readonly selected = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * Native type of button element
     */
    readonly type = input<string | null | undefined>('button');

    /** Position of glyph related to text */
    readonly glyphPosition = input<GlyphPosition>('before');

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    readonly glyph = input<string | null | undefined>();

    /** Glyph font family */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Leave empty for default (Standard button).'
     * Default value is set to 'standard'
     */
    readonly fdType = input<ButtonType>(defaultButtonType);

    /**
     * Text rendered inside button component
     */
    readonly label = input<string | undefined>();

    /** Whether to apply menu mode to the button.
     * Default value is set to false
     */
    readonly fdMenu = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * Native disabled attribute of button element
     */
    readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * Native aria-disabled attribute of button element
     */
    readonly ariaDisabled = input<boolean, BooleanInput>(false, {
        alias: 'aria-disabled',
        transform: booleanAttribute
    });

    /** adding native aria-label to the component */
    readonly ariaLabel = input<string | null | undefined>();

    /** adding native aria-description to the component */
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
     * This allows parent components to update the button's disabled state.
     */
    setDisabled(value: boolean): void {
        this._disabledState.set(value);
    }

    /**
     * Get the current disabled state.
     * Returns the internal disabled state which may have been modified programmatically.
     */
    isDisabled(): boolean {
        return this._disabledState();
    }

    /**
     * Programmatically set the button type.
     * This allows directives to override the button type.
     */
    setFdType(value: ButtonType): void {
        this.fdTypeState.set(value);
    }

    /**
     * Get the current button type.
     * Returns the internal button type which may have been modified programmatically.
     */
    getFdType(): ButtonType {
        return this.fdTypeState();
    }

    /**
     * Programmatically set the selected state.
     * This allows parent components to update the button's selected state.
     */
    setSelected(value: boolean): void {
        this.selectedState.set(value);
    }

    /**
     * Get the current selected state.
     * Returns the internal selected state which may have been modified programmatically.
     */
    isSelected(): boolean {
        return this.selectedState();
    }

    /**
     * Programmatically set the toggled state.
     * This allows parent components to update the button's toggled state.
     */
    setToggled(value: boolean): void {
        this.toggledState.set(value);
    }

    /**
     * Get the current toggled state.
     * Returns the internal toggled state which may have been modified programmatically.
     */
    isToggled(): boolean {
        return this.toggledState();
    }
}
