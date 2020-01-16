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

    /** @hidden */
    _setProperties(): void {
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }

        switch (this.type) {
            case 'radio': {
                this._addControlClass('fd-radio');
                break;
            }
            default: {
                if (this.getElementTag() === 'input') {
                    this._addControlClass('fd-input');
                } else if (this.getElementTag() === 'textarea') {
                    this._addControlClass('fd-textarea');
                } else if (this.getElementTag() === 'select') {
                    this._addControlClass('fd-form-select');
                }
                break;
            }
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    private getElementTag(): string {
        if (this.elementRef && this.elementRef.nativeElement) {
            return this.elementRef.nativeElement.tagName.toLocaleLowerCase();
        }
    }

    /** @hidden */
    private _addControlClass(className: string): void {
        this._addClassToElement(className);
        if (this.compact) {
            this._addClassToElement(className + '--compact');
        }
    }
}
