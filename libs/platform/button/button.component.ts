import { BooleanInput } from '@angular/cdk/coercion';
import { Component, booleanAttribute, computed, effect, input, output } from '@angular/core';

import { ModuleDeprecation, warnOnce } from '@fundamental-ngx/cdk/utils';
import { ButtonType, ButtonComponent as CoreButtonComponent, GlyphPosition } from '@fundamental-ngx/core/button';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { ButtonModel } from './button.model';
import { FDP_BUTTON } from './tokens';

let platformButtonId = 0;

/**
 * @deprecated
 * Button component is deprecated. Use `fd-button` from `@fundamental-ngx/core` instead.
 */
@Component({
    selector: 'fdp-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    providers: [
        {
            provide: FDP_BUTTON,
            useExisting: ButtonComponent
        }
    ],
    imports: [CoreButtonComponent],
    host: {
        role: 'button',
        '[attr.tabindex]': '-1'
    }
})
export class ButtonComponent implements ButtonModel {
    /** Button ID - default value is provided if not set */
    readonly id = input(`fdp-button-${++platformButtonId}`);

    /** Name for the element */
    readonly name = input<string>();

    /** Width of the element */
    readonly width = input<string>();

    /** Disabled status of the element */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** Sets the `aria-label` attribute to the element */
    readonly ariaLabel = input<string>();

    /** Sets the `aria-labelledby` attribute to the element */
    readonly ariaLabelledBy = input<string>();

    /** Sets the `aria-describedby` attribute to the element */
    readonly ariaDescribedBy = input<string>();

    /** Position of glyph related to text */
    readonly glyphPosition = input<GlyphPosition>('before');

    /** Text rendered inside button component */
    readonly label = input<string>();

    /** The icon to include in the button. See the icon page for the list of icons */
    readonly glyph = input<string>();

    /** Glyph font family */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Leave empty for default (Standard button).
     * Default value is set to 'standard'
     */
    readonly fdType = input<ButtonType>('standard');

    /**
     * @deprecated
     * Use `fdType` property.
     * The buttonType of the button. Types includes
     * 'standard','positive', 'negative', 'attention', 'ghost',
     * 'transparent', 'emphasized','menu'.
     * Leave empty for default (standard button).
     */
    readonly buttonType = input<ButtonType>();

    /** Whether button is in toggled state */
    readonly toggled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** arialabel, tooltip for button, intended to be used when the button only contains an icon */
    readonly title = input<string>();

    /** @deprecated use toggled input property instead
     * aria-selected for accessibility to the native HTML button
     */
    readonly ariaSelected = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** aria-disabled for accessibility to the native HTML button */
    readonly ariaDisabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** propagate aria-expanded for accessibility to the native HTML button */
    readonly ariaExpanded = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** propagate aria-controls for accessibility to the native HTML button */
    readonly ariaControlsId = input<string>();

    /** @deprecated use toggled input property instead
     * propagate aria-pressed for accessibility to the native HTML button
     */
    readonly ariaPressed = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** Specifies the type to the native HTML button */
    readonly type = input<string>();

    /** Specifies an initial value to the native HTML button */
    readonly value = input<string>();

    /** Event sent when button is clicked */
    readonly buttonClicked = output<any>();

    /** @hidden Computed to determine effective fdType (buttonType overrides fdType if provided) */
    protected readonly _effectiveFdType = computed(() => this.buttonType() || this.fdType());

    /** @hidden Computed to determine effective toggled state */
    protected readonly _effectiveToggled = computed(() => this.toggled() || this.ariaPressed() || this.ariaSelected());

    /** @hidden */
    constructor() {
        warnOnce(
            "Platform's ButtonComponent is deprecated and will be removed in the next major release. Consider using Core's ButtonComponent instead."
        );

        // Warn about deprecated inputs
        effect(() => {
            if (this.ariaSelected()) {
                warnOnce('Property ariaSelected is deprecated. Use `toggled` input property instead.');
            }
        });

        effect(() => {
            if (this.ariaPressed()) {
                warnOnce('Property ariaPressed is deprecated. Use `toggled` input property instead.');
            }
        });
    }

    /**
     * Programmatically set the disabled state.
     * Implements ButtonModel interface.
     * Note: Cannot directly set signal inputs. This method exists for interface compatibility.
     */
    setDisabled(_value: boolean): void {
        console.warn('setDisabled() cannot modify signal input. Use template binding [disabled]="value" instead.');
    }

    /**
     * Get the current disabled state.
     * Implements ButtonModel interface.
     */
    isDisabled(): boolean {
        return this.disabled();
    }

    /**
     * Programmatically set the button type.
     * Implements ButtonModel interface.
     * Note: Cannot directly set signal inputs. This method exists for interface compatibility.
     */
    setFdType(_value: ButtonType): void {
        console.warn('setFdType() cannot modify signal input. Use template binding [fdType]="value" instead.');
    }

    /**
     * Get the current button type.
     * Implements ButtonModel interface.
     */
    getFdType(): ButtonType {
        return this._effectiveFdType();
    }

    /**
     * No-op method for interface compatibility.
     * Implements ButtonModel interface.
     * Signal-based components don't need manual change detection.
     */
    markForCheck(): void {
        // No-op: signals automatically trigger change detection
    }

    /**
     * Handles button click
     */
    protected onBtnClick($event: any): void {
        this.buttonClicked.emit($event);
    }
}

export class DeprecatedButtonAriaSelected implements ModuleDeprecation {
    /** @hidden */
    message = 'ariaSelected input property is deprecated.';

    /** @hidden */
    alternative = {
        name: 'Use [toggled] input property instead',
        link: ['/platform', 'button'],
        fragment: 'state'
    };
}

export class DeprecatedButtonAriaPressed implements ModuleDeprecation {
    /** @hidden */
    message = 'ariaPressed input property is deprecated.';

    /** @hidden */
    alternative = {
        name: 'Use [toggled] input property instead',
        link: ['/platform', 'button'],
        fragment: 'state'
    };
}
