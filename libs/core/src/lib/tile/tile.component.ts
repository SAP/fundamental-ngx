import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

type TileType = null | 'kpi' | 'launch' | 'feed' | 'slide' | 'line';
type TileSize = null | 's';

@Component({
    selector: 'fd-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements CssClassBuilder, AfterViewInit, OnChanges {
    /** user's custom classes */
    @Input()
    class: string;

    /** Size modifier. Options are null (default) and 's'. */
    @Input()
    size: TileSize;

    /** Optional 'double' modifier to double the tile width. */
    @Input()
    double = false;

    /** Type of tile.  Options are 'kpi', 'launch', 'feed', 'slide', 'line', or leave null for default. */
    @Input()
    type: TileType;

    /** Whether or not the tile is in 'action' mode. */
    @Input()
    action = false;

    /** @hidden */
    @ViewChild('container')
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
    buildComponentCssClass(): string[] {
        return [
            'fd-tile',
            this.size ? 'fd-tile--' + this.size : '',
            this.double ? 'fd-tile--double' : '',
            this.type ? 'fd-tile--' + this.type : '',
            this.action ? 'fd-tile--action' : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.ref;
    }
}
