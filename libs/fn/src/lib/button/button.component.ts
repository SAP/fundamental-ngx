import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { BaseButton } from '@fundamental-ngx/core/button';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';
import { Subscription } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectableItemToken } from '@fundamental-ngx/fn/cdk';

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
        '[attr.type]': 'type'
    },
    providers: [{ provide: SelectableItemToken, useExisting: ButtonComponent }]
})
export class ButtonComponent
    extends BaseButton
    implements OnChanges, SelectableItemToken<string>, CssClassBuilder, OnInit, OnDestroy
{
    /** The property allows user to pass additional css classes. */
    @Input()
    class = '';

    /** The type of the button. Types include:
     * '' | 'secondary' | 'layout' | 'positive' | 'critical' | 'negative'.
     * Leave empty for default (Standard button).'
     * Default value is set to ''
     */
    @Input()
    fnType: ButtonType = '';

    @Input()
    set emphasized(value: BooleanInput) {
        this._emphasized = coerceBooleanProperty(value);
    }

    @Input()
    set selected(value: BooleanInput) {
        this.setSelected(coerceBooleanProperty(value));
    }

    /**
     * Native disabled attribute of button element
     */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: BooleanInput) {
        this.setDisabled(coerceBooleanProperty(value));
    }

    @Input()
    value: string;

    /** @hidden */
    _selected: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _emphasized: boolean;

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    public ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fn-button',
            this.fnType ? `fn-button--${this.fnType}` : '',
            // this._disabled || this._ariaDisabled ? 'is-disabled' : '',
            this.glyph && !this.label ? 'fn-button--icon-only' : '',
            this._emphasized ? `fn-button--emphasized` : '',
            this.class
        ];
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    public elementRef(): ElementRef<HTMLButtonElement | HTMLAnchorElement> {
        return this._elementRef;
    }

    setSelected(selected: boolean): void {
        const selectedClass = 'fn-button--selected';
        this._selected = selected;
        const classList = this.elementRef().nativeElement.classList;
        selected ? classList.add(selectedClass) : classList.remove(selectedClass);
        this.elementRef().nativeElement.setAttribute('aria-selected', `${selected}`);
    }

    getSelected(): boolean {
        return this._selected;
    }

    setDisabled(disabled: boolean): void {
        this._disabled = disabled;
        if (disabled) {
            this.elementRef().nativeElement.classList.add('is-disabled');
            this.elementRef().nativeElement.setAttribute('disabled', `${disabled}`);
            this.elementRef().nativeElement.setAttribute('aria-disabled', `${disabled}`);
        } else {
            this.elementRef().nativeElement.classList.remove('is-disabled');
            this.elementRef().nativeElement.removeAttribute('disabled');
            this.elementRef().nativeElement.removeAttribute('aria-disabled');
        }
    }

    getDisabled(): boolean {
        return this._disabled;
    }

    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
