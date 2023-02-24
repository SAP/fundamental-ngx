import {
    Attribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Subscription } from 'rxjs';
import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';
import { FormItemControl, registerFormItemControl } from './../form-item-control/form-item-control';

/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-form-control]',
    template: ` <ng-content></ng-content>`,
    styleUrls: ['./form-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [registerFormItemControl(FormControlComponent)]
})
export class FormControlComponent implements CssClassBuilder, OnInit, OnChanges, OnDestroy, FormItemControl {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates | null = null;

    /** Type of the form control. */
    @Input()
    type: string;

    /** user's custom classes */
    @Input()
    class: string;

    /** aria-label for form-control. */
    @Input()
    ariaLabel: Nullable<string>;

    /** aria-label for form-control. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** @hidden */
    @HostBinding('attr.aria-label')
    private get ariaLabelBinding(): string {
        return this.ariaLabelAttr || this.ariaLabel || '';
    }

    /** @hidden */
    @HostBinding('attr.aria-labelledby')
    private get ariaLabelledByBinding(): string {
        return this.ariaLabelledByAttr || this.ariaLabelledBy || '';
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [this.state ? 'is-' + this.state : '', this.class];
    }

    /** @hidden */
    constructor(
        public elmRef: ElementRef,
        @Attribute('aria-label') private ariaLabelAttr: string,
        @Attribute('aria-labelledby') private ariaLabelledByAttr: string
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.elmRef;
    }
}
