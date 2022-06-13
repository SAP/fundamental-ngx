import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/core/shared';
import { Subscription } from 'rxjs';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/core/utils';

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
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlComponent implements CssClassBuilder, OnInit, OnChanges, OnDestroy {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates | null = null;

    /**
     * Whether form is in compact mode
     */
    @Input()
    compact?: boolean;

    @Input()
    type: string;

    /** user's custom classes */
    @Input()
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [this.state ? 'is-' + this.state : '', this.class];
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

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
        return this._elementRef;
    }

    /** @hidden */
    private _getElementTag(): string | undefined {
        if (this.elementRef() && this.elementRef().nativeElement) {
            return this.elementRef().nativeElement.tagName.toLocaleLowerCase();
        }
    }
}
