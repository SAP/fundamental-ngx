import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/core/shared';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';

export enum STATE_ICON {
    information = 'information',
    warning = 'alert',
    error = 'error',
    success = 'sys-enter-2'
}

/**
 * Directive to be applied to the parent of a form control.
 *
 * ```html
 * <div fd-form-item>
 *     <input fd-form-control type="text" />
 * </div>
 * ```
 */
@Component({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fn-form-item',
    templateUrl: './form-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemComponent implements CssClassBuilder, OnInit, OnChanges {
    @HostBinding('class.is-disabled')
    disabled = false;

    @HostBinding('class.is-readonly')
    readonly = false;

    @Input()
    class: string;

    _icon: string;

    state?: FormStates;

    constructor(private _elementRef: ElementRef) {}

    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return ['fn-text-field', this._getStateClass(), this._getDisabledClass(), this._getReadonlyClass(), this.class];
    }

    _getStateClass(): string {
        return this.state ? 'fn-text-field--' + this.state : '';
    }

    _getDisabledClass(): string {
        return this.disabled ? 'is-disabled' : '';
    }

    _getReadonlyClass(): string {
        return this.readonly ? 'is-readonly' : '';
    }

    setState(state: FormStates): void {
        this.state = state;
        this.setStateIcon();
        this.buildComponentCssClass();
    }

    setStateIcon(): void {
        this._icon = (this.state && STATE_ICON[this.state]) || '';
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    updateState(): void {
        this.setStateIcon();
        this.buildComponentCssClass();
    }
}
