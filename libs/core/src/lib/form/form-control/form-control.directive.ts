import { Input, ElementRef, Directive, OnInit, OnChanges } from '@angular/core';
import { FormStates } from './form-states';
import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-form-control]',
})
export class FormControlDirective implements CssClassBuilder, OnInit, OnChanges {

    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `invalid`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether form is in compact mode
     */
    @Input()
    compact: boolean = false;

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
    buildComponentCssClass(): string {
        return [
            this.state ? 'is-' + this.state : '',
            this.type === 'radio' ? 'fd-radio' : '',
            this._getElementTag() === 'input' ? 'fd-input' : '',
            this._getElementTag() === 'textarea' ? 'fd-textarea' : '',
            this._getElementTag() === 'select' ? 'fd-form-select' : '',
            this.compact && this._getElementTag() === 'input' ? 'fd-input--compact' : '',
            this.compact && this._getElementTag() === 'textarea' ? 'fd-textarea--compact' : '',
            this.compact && this._getElementTag() === 'select' ? 'fd-form-select--compact' : '',
            this.class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef
    ) {
    }

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

