import { Directive, ElementRef, forwardRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { InputGroupPlacement } from './input-group.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-input-group-input]',
})
export class InputGroupInputDirective {}


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-textarea-group-input]',
    providers: [{ provide: InputGroupInputDirective, useExisting: forwardRef(() => InputGroupTextareaDirective) }]
})
export class InputGroupTextareaDirective extends InputGroupInputDirective {}


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-input-group-addon]'
})
export class InputGroupAddOnDirective extends AbstractFdNgxClass {

    /** @hidden */
    @HostBinding('class.fd-input-group__addon')
    fdInputGroupAddonClass: boolean = true;

    /**
     * The placement of the add-on. Options include *before* and *after*
     */
    @Input()
    placement: InputGroupPlacement = 'after';

    /**
     * The placement of the add-on. Options include *before* and *after*
     */
    @Input()
    type: string;

    /**
     * Whether the icon add-on or the text add-on is a button.
     */
    @Input()
    button: boolean = false;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-input-group__addon');
        this._addClassToElement('fd-input-group__addon--' + this.placement);
        if (this.button) {
            this._addClassToElement('fd-input-group__addon--button');
        }
        if (this.type) {
            this._addClassToElement('fd-input-group__addon--' + this.type);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

}
