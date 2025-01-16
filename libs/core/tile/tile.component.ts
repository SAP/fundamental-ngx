import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

type TileType = null | 'kpi' | 'launch' | 'feed';
type TileSize = null | 's';

@Component({
    selector: 'fd-tile',
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
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

    /** Type of tile.  Options are 'kpi', 'launch', 'feed', or leave null for default. */
    @Input()
    type: TileType;

    /** Whether or not the tile is in 'action' mode. */
    @Input()
    action = false;

    /** Whether tile is focusable & clickable, (tileClick) event will be emitted on click. */
    @Input({ transform: booleanAttribute })
    clickable = false;

    /** Whether tile gets clicked or space/enter pressed. */
    @Output()
    readonly tileClick = new EventEmitter<void>();

    /** @hidden */
    @ViewChild('container')
    ref: ElementRef;

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
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
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    get elementRef(): ElementRef {
        return this.ref;
    }
}
