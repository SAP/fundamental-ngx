import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-label]',
    host: {
        'class': 'fd-list__label'
    }
})
export class ListLabelDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-title]',
    host: {
        'class': 'fd-list__title'
    }
})
export class ListTitleDirective {
    /**
     * Enabling this flag causes forcing title directive to not wrap text,
     * instead of wrapping there will be text truncation
     */
    @Input()
    @HostBinding('class.fd-list__title--no-wrap')
    noWrap: boolean = false;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-secondary]',
    host: {
        'class': 'fd-list__secondary'
    }
})
export class ListSecondaryDirective {
    /**
     * Enabling this flag causes forcing secondary item directive to not wrap text,
     * instead of wrapping there will be text truncation
     */
    @Input()
    @HostBinding('class.fd-list__secondary--no-wrap')
    noWrap: boolean = false;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-group-header]',
    host: {
        'class': 'fd-list__group-header'
    }
})
export class ListGroupHeaderDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-icon]'
})
export class ListIconDirective implements OnInit {

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    private _glyph: string;
    @Input()
    set glyph(glyph: string) {
        this._glyph = glyph;
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
            'fd-list__icon',
            this._glyph ? ('sap-icon--' + this._glyph) : '',
            this._class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }


}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-footer]',
    host: {
        'class': 'fd-list__footer'
    }
})
export class ListFooterDirective {}
