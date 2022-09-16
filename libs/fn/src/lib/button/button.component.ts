import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FnClickedProvider, SelectableItemToken, SelectComponentRootToken } from '@fundamental-ngx/fn/cdk';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import { Observable } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';

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
        '[class.fn-button--emphasized]': 'emphasized',
        '[class.fn-button--icon-only]': 'glyph && !label',
        '[attr.aria-label]': 'ariaLabel',
        '[class.fn-button--selected]': 'selected',
        '[attr.aria-selected]': 'selected',
        '[value]': 'value'
    },
    providers: [{ provide: SelectableItemToken, useExisting: ButtonComponent }, FnClickedProvider]
})
export class ButtonComponent implements SelectableItemToken<string> {
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
    emphasized: BooleanInput;

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
     * Native type of button element
     */
    @Input()
    type: Nullable<string> = 'button';

    /** Position of glyph related to text */
    @Input()
    glyphPosition: 'before' | 'after' = 'before';

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    glyph: Nullable<string>;

    /**
     * Text rendered inside button component
     */
    @Input()
    label: string;

    /** adding native aria-label to the component */
    @Input()
    ariaLabel: Nullable<string>;

    /** Whether button is in toggled state. */
    @Input()
    @coerceBoolean
    toggled = false;

    /** Whether to apply menu mode to the button.
     * Default value is set to false
     */
    @Input()
    fdMenu = false;

    @Output() clicked: Observable<MouseEvent | KeyboardEvent>;

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
        private _changeDetectorRef: ChangeDetectorRef,
        _clicked: FnClickedProvider
    ) {
        this.clicked = _clicked.asObservable();
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
