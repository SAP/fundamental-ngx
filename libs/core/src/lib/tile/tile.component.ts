import { Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-tile]',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TileComponent implements CssClassBuilder, OnInit, OnChanges {
    /** user's custom classes */
    @Input()
    class: string;

    /** Optional 'small' modifier to reduce the tile size. */
    @Input()
    small: boolean = false;

    /** Optional 'double' modifier to double the tile width. */
    @Input()
    double: boolean = false;

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

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-tile',
            this.small ? 'fd-tile--s' : '',
            this.double ? 'fd-tile--double' : '',
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

}
