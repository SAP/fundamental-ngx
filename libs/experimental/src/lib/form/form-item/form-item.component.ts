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
    // tslint:disable-next-line: component-selector
    selector: 'fn-form-item',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentalFormItemComponent implements CssClassBuilder, OnInit, OnChanges {
    @HostBinding('class.is-disabled')
    disabled = false;

    @Input()
    class: string;

    _icon: string;

    private _state: FormStates;

    constructor(private _elementRef: ElementRef) {}

    ngOnInit() {
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
        return ['fn-text-field', this._getStateClass(), this.class];
    }

    _getStateClass(): string {
        return this._state ? 'fn-text-field--' + this._state : '';
    }

    setState(state: FormStates): void {
        this._state = state;
        this.setStateIcon();
        this.buildComponentCssClass();
    }

    setStateIcon(): void {
        this._icon = STATE_ICON[this._state] || '';
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
