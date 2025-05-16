import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { CarouselItemInterface } from '../carousel.service';

export type Visibility = 'visible' | 'hidden';

let carouselItemCounter = 0;

@Component({
    selector: 'fd-carousel-item',
    templateUrl: './carousel-item.component.html',
    styles: [
        `
            .fd-carousel__slides {
                min-width: initial !important;
            }
            .fd-carousel__item--active {
                display: flex;
                max-width: 100%;
            }
        `
    ],
    host: {
        role: 'option',
        class: 'fd-carousel__item fd-carousel__item--active',
        '[attr.aria-setsize]': 'ariaSetsize()',
        '[attr.aria-posinset]': 'ariaPosinset()',
        '[attr.aria-selected]': 'ariaSelected()',
        '[attr.aria-hidden]': 'ariaHidden()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [BusyIndicatorComponent]
})
export class CarouselItemComponent<T = any> implements CarouselItemInterface {
    /** Id of the Carousel items. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-carousel-item-${carouselItemCounter++}`;

    /** Sets aria-label attribute for carousel item */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string>;

    /** Sets aria-labelledby attribute for carousel item */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledBy: Nullable<string>;

    /** Sets aria-describedby attribute for carousel item */
    @Input()
    @HostBinding('attr.aria-describedby')
    ariaDescribedBy: Nullable<string>;

    /**
     * Loading indicator when item is not yet loaded
     */
    @Input()
    loading = false;

    /** Sets tooltip for carousel item */
    @Input()
    @HostBinding('attr.title')
    title = null;

    /** Initial height value, needed when carousel is inside popover */
    @Input()
    initialHeight: number;

    /** Initial height value, needed when carousel is inside popover */
    @Input()
    initialWidth: number;

    /** Value of carousel item */
    @Input()
    value: T;

    /** @hidden Hide/show slide, useful for managing tab order */
    @HostBinding('style.visibility')
    _visibility: Visibility = 'visible';

    /** @hidden value for aria-setsize attribute */
    ariaSetsize = signal<number>(0);

    /** @hidden value for aria-posinset attribute */
    ariaPosinset = signal<number>(0);

    /** @hidden value for aria-selected attribute */
    ariaSelected = signal<boolean>(false);

    /** @hidden value for aria-hidden attribute */
    ariaHidden = signal<boolean>(false);

    /** @hidden */
    set visibility(visibility: Visibility) {
        this._visibility = visibility;
    }

    get visibility(): Visibility {
        return this._visibility;
    }

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

    /** Native element  */
    get element(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** Width of element */
    getWidth(): number {
        return this.element.getBoundingClientRect().width || this.initialWidth;
    }

    /** Height of element */
    getHeight(): number {
        return this.element.getBoundingClientRect().height || this.initialHeight;
    }
}
