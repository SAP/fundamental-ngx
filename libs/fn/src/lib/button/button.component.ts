import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { BaseButton } from '@fundamental-ngx/core/button';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectableItemToken, SelectComponentRootToken } from '@fundamental-ngx/fn/cdk';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';

export type ButtonType = '' | 'secondary' | 'layout' | 'positive' | 'critical' | 'negative';

/**
 * The Button component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the button.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[fn-button], a[fn-button]',
    exportAs: 'fn-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.type]': 'type',
        '[class.is-disabled]': 'disabled',
        '[class.fn-button--emphasized]': 'emphasized',
        '[class.fn-button--icon-only]': 'glyph && !label',
        '[attr.aria-disabled]': 'disabled',
        '[attr.aria-label]': 'ariaLabel',
        '[disabled]': 'disabled',
        '[class.fn-button--selected]': 'selected',
        '[attr.aria-selected]': 'selected',
        '[value]': 'value'
    },
    providers: [{ provide: SelectableItemToken, useExisting: ButtonComponent }]
})
export class ButtonComponent extends BaseButton implements SelectableItemToken<string> {
    /** The type of the button. Types include:
     * '' | 'secondary' | 'layout' | 'positive' | 'critical' | 'negative'.
     * Leave empty for default (Standard button).'
     * Default value is set to ''
     */
    @Input()
    fnType: ButtonType = '';

    /**
     * Set emphasized state of the button
     */
    @Input()
    @coerceBoolean
    emphasized: boolean;

    /**
     * Set selected state of the button
     */
    @Input()
    set selected(value: BooleanInput) {
        this.setSelected(coerceBooleanProperty(value));
    }

    get selected(): boolean {
        return this._selected;
    }

    /**
     * Native disabled attribute of button element
     */
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.selectComponent !== null && this.selectComponent.disabled);
    }

    set disabled(value: BooleanInput) {
        const newDisabledState = coerceBooleanProperty(value);
        if (this._disabled !== newDisabledState) {
            this._disabled = newDisabledState;
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * Value of the button
     */
    @Input()
    value: string;

    /**
     * Additional HTML classes
     */
    @Input()
    class: string;

    /**
     * Fiori Next button type class getter
     */
    @HostBinding('attr.class')
    get fnTypeClass(): string {
        return ['fn-button', this.fnType ? `fn-button--${this.fnType}` : '', this.class].filter((c) => !!c).join(' ');
    }

    /** @hidden */
    _selected: boolean;

    /** @hidden */
    constructor(
        @Optional() @Inject(SelectComponentRootToken) private selectComponent: SelectComponentRootToken,
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<HTMLButtonElement | HTMLAnchorElement> {
        return this._elementRef;
    }

    /** @hidden */
    setSelected(selected: boolean): void {
        if (selected !== this._selected) {
            this._selected = selected;
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden */
    getSelected(): boolean {
        return this._selected;
    }

    /** @hidden */
    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
