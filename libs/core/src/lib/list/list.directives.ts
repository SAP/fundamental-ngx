import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-label]',
    host: {
        'class': 'fd-list__label'
    }
})
export class ListLabelDirective { }

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
export class ListGroupHeaderDirective { }

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-icon]'
})
export class ListIconDirective implements OnChanges, OnInit {

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    glyph: string;

    /** Apply user custom styles */
    @Input()
    class: string;

    constructor(
        private _elementRef: ElementRef
    ) { }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
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
            this.glyph ? ('sap-icon--' + this.glyph) : '',
            this.class
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
export class ListFooterDirective { }
