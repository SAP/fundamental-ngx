import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { MessageStates } from '../form/form-message/form-message.component';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-message]',
})
export class ListMessageDirective implements OnInit, CssClassBuilder {

    /** Type of the message. Can be 'success' | 'error' | 'warning' | 'information' */
    private _type: MessageStates;
    @Input()
    set type(type: MessageStates) {
        this._type = type;
        this.buildComponentCssClass();
    }

    private _class: string = '';
    @Input() set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    } // user's custom classes

    constructor(
        private _elementRef: ElementRef
    ) {}

    /** Function runs when component is initialized
     * function should build component css class
     */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-list__message',
            this._type ? ('fd-list__message--' + this._type) : '',
            this._class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
