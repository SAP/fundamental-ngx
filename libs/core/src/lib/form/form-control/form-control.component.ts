import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from './form-states';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-form-control]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlComponent implements CssClassBuilder, OnInit, OnChanges {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether form is in compact mode
     */
    @Input()
    compact = false;

    @Input()
    type: string;

    /** user's custom classes */
    @Input()
    class: string;

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            this.state ? 'is-' + this.state : '',
            this._getFormClass(),
            this.compact ? this._getFormClass() + '--compact' : '',
            this.class
        ];
    }

    private _getFormClass(): string {
        switch (this._getElementTag()) {
            case 'input':
                return 'fd-input';
            case 'textarea':
                return 'fd-textarea';
        }
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
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    private _getElementTag(): string {
        if (this.elementRef() && this.elementRef().nativeElement) {
            return this.elementRef().nativeElement.tagName.toLocaleLowerCase();
        }
    }
}
