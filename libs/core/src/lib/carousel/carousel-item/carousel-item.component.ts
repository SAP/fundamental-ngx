import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';

let carouselItemUniqueId = 0;

@Component({
    selector: 'fd-carousel-item',
    templateUrl: './carousel-item.component.html',
    styleUrls: ['./carousel-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CarouselItemComponent {
    /** Id of the Carousel items. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-carousel-item-${carouselItemUniqueId++}`;

    /** Sets aria-label attribute for carousel item */
    @Input()
    ariaLabel: string;

    /** Sets aria-labelledby attribute for carousel item */
    @Input()
    ariaLabelledBy: string;

    /** Sets aria-describedby attribute for carousel item */
    @Input()
    ariaDescribedBy: string;

    /** Value of carousel item */
    @Input()
    value: any;

    /** Sets tooltip for carousel item */
    @Input()
    title: string;

    /** Display mode of carousel item. By default it is hidden.*/
    @Input()
    isActive = false;

    /** @hidden sets margin */
    setMargin: boolean;

    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    /** Add right margin to carousel item. */
    public addMargin(): void {
        this.setMargin = true;
        this._changeDetectorRef.markForCheck();
    }

    /** Remove previously added right margin from carousel item. */
    public removeMargin(): void {
        this.setMargin = false;
        this._changeDetectorRef.markForCheck();
    }

    /** Shows carousel item */
    public showItem(): void {
        this.isActive = true;
        this._changeDetectorRef.markForCheck();
    }

    /** Hides carousel item */
    public hideItem(): void {
        this.isActive = false;
        this._changeDetectorRef.markForCheck();
    }
}
