import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder } from '../../utils/interfaces/css-class-builder.interface';
import { applyCssClass } from '@fundamental-ngx/core';

@Directive({
    selector: '[fdLayoutGridCol]'
})
export class LayoutGridColDirective implements OnInit, OnChanges, CssClassBuilder {

    @Input()
    fdLayoutGridCol: string;

    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    private _class: string;

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
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-col',
            this.fdLayoutGridCol ? `fd-col--${this.fdLayoutGridCol}` : ''
        ]
    }
}
