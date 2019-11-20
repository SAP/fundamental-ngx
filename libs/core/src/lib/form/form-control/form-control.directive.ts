import { Input, ElementRef, Directive } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { FormStates } from './form-states';


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
    state: FormStates;

    /**
     * Whether form is in compact mode
     */
    @Input()
    compact: boolean = false;


    @Input()
    type: string;

    /** @hidden */
    _setProperties() {
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }

        switch (this.type) {
            case 'checkbox': {
                this._addClassToElement('fd-checkbox');
                if (this.compact) {
                    this._addClassToElement('fd-checkbox--compact');
                }
                break;
            }
            case 'radio': {
                this._addClassToElement('fd-radio');
                if (this.compact) {
                    this._addClassToElement('fd-radio--compact');
                }
                break;
            }
            default: {
                if (this.getElementTag() === 'input') {
                    this._addClassToElement('fd-input');
                    if (this.compact) {
                        this._addClassToElement('fd-input--compact');
                    }
                } else if (this.getElementTag() === 'textarea') {
                    this._addClassToElement('fd-textarea');
                    if (this.compact) {
                        this._addClassToElement('fd-textarea--compact');
                    }
                } else if (this.getElementTag() === 'select') {
                    this._addClassToElement('fd-form-select');
                    if (this.compact) {
                        this._addClassToElement('fd-form-select--compact');
                    }
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
