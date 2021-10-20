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

export type ButtonType = '' | 'secondary' | 'flat' | 'link' | 'outline' | 'naked';

/**
 * The Button component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the button.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'button[fn-button], a[fn-button]',
    exportAs: 'fn-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.type]': 'type',
        '[attr.disabled]': '_disabled || null'
    }
})
export class ExperimentalButtonComponent extends BaseButton implements OnChanges, CssClassBuilder, OnInit, OnDestroy {
    /** The property allows user to pass additional css classes. */
    @Input()
    class = '';

    /** The type of the button. Types include:
     * '' | 'secondary' | 'flat' | 'link' | 'outline' | 'naked'.
     * Leave empty for default (Standard button).'
     * Default value is set to ''
     */
    @Input()
    fnType: ButtonType = '';

    /** @hidden */
    private _subscriptions = new Subscription();

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
            this._disabled || this._ariaDisabled ? 'is-disabled' : '',
            this.glyph && !this.label ? 'fn-button--icon-only' : '',
            this.class
        ];
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    public elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
