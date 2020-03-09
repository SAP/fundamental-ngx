import { AfterContentInit, Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { InputGroupPlacement } from './input-group.component';
import { FormStates } from '../form/form-control/form-states';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-input-group-input]',
})
export class InputGroupInputDirective extends AbstractFdNgxClass {

    @Input()
    compact: boolean = false;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-input');
        this._addClassToElement('fd-input-group__input');
        if (this.compact) {
            this._addClassToElement('fd-input--compact');
        }
    }


    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

}


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-textarea-group-input]',
})
export class InputGroupTextareaDirective  {}


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-input-group-addon]'
})
export class InputGroupAddOnDirective extends AbstractFdNgxClass implements AfterContentInit {

    /** @hidden */
    @HostBinding('class.fd-input-group__addon')
    fdInputGroupAddonClass: boolean = true;

    /**
     * The placement of the add-on. Options include *before* and *after*
     */
    @Input()
    placement: InputGroupPlacement = 'after';

    /** Whether to apply compact mode to the AddOn. */
    @Input()
    compact: boolean = false;

    /**
     * The placement of the add-on. Options include *before* and *after*
     */
    @Input()
    type: string;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `invalid`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether the icon add-on or the text add-on is a button.
     */
    @Input()
    button: boolean = false;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-input-group__addon');
        if (this.button) {
            this._addClassToElement('fd-input-group__addon--button');
        }
        if (this.type) {
            this._addClassToElement('fd-input-group__addon--' + this.type);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
        if (this.compact) {
            this._addClassToElement('fd-input-group__addon--compact')
        }
    }

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super(elementRef);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        /** Add fd-input-group__button to button child element */
        const button = this.elementRef.nativeElement.querySelector('button');
        if (button) {
            this.renderer.addClass(button, 'fd-input-group__button');
        }
    }

}
