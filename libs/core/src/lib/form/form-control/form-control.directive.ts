import { Input, ElementRef, Component, Directive } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

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
export class FormControlDirective extends AbstractFdNgxClass {

    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `error`, `warning` or blank for default.
     */
    @Input()
    state: string;


    @Input()
    type: string;

    /** @hidden */
    _setProperties() {

        this._addClassToElement('fd-form-control');
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }

        switch (this.type) {
            case 'checkbox': {
                this._addClassToElement('fd-checkbox');
                break;
            }
            case 'radio': {
                this._addClassToElement('fd-radio');
                break;
            }
            default: {
                if (this.getElementTag() === 'input') {
                    this._addClassToElement('fd-input');
                } else if (this.getElementTag() === 'textarea') {
                    this._addClassToElement('fd-textarea');
                } else if (this.getElementTag() === 'select') {
                    this._addClassToElement('fd-form-select');
                }
                break;
            }
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    private getElementTag(): string {
        if (this.elementRef && this.elementRef.nativeElement) {
            return this.elementRef.nativeElement.tagName.toLocaleLowerCase();
        }
    }
}
