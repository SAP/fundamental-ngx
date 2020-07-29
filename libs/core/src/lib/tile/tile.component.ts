import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

type TileType = '' | 'kpi' | 'launch';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fd-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TileComponent implements CssClassBuilder, AfterViewInit, OnChanges {
    /** user's custom classes */
    @Input()
    class: string;

    /** Optional 'small' modifier to reduce the tile size. */
    @Input()
    small: boolean = false;

    /** Optional 'double' modifier to double the tile width. */
    @Input()
    double: boolean = false;

    /** Type of tile.  Options are 'kpi' or 'launch', or leave blank for default. */
    @Input()
    type: TileType = '';

    /** @hidden */
    @ViewChild('tileDiv')
    ref: ElementRef;

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
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
            this.type ? 'fd-tile--' + this.type : '',
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    elementRef(): ElementRef<any> {
        return this.ref;
    }

}
