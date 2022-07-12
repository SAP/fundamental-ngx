import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { ResizeObserverService, RtlService } from '@fundamental-ngx/core/utils';
import { BehaviorSubject, firstValueFrom, map, startWith, Subscription, tap } from 'rxjs';
import { MenuComponent } from '@fundamental-ngx/core/menu';
import { Placement } from '@fundamental-ngx/core/shared';

/**
 * Breadcrumb parent wrapper directive. Must have breadcrumb item child directives.
 *
 * ```html
 * <fd-breadcrumb>
 *     <fd-breadcrumb-item>
 *         <a fd-link [routerLink]="'#'">Breadcrumb Link</a>
 *     </fd-breadcrumb-item>
 * </fd-breadcrumb>
 * ```
 */
@Component({
    // TODO to be discussed
    // eslint-disable-next-line
    selector: 'fd-breadcrumb',
    host: {
        class: 'fd-breadcrumb'
    },
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements AfterViewInit, OnInit, OnDestroy {
    /** @hidden */
    @ContentChildren(forwardRef(() => BreadcrumbItemComponent))
    breadcrumbItems: QueryList<BreadcrumbItemComponent>;

    /** @hidden */
    @ViewChild(MenuComponent)
    menuComponent: MenuComponent;

    /** @hidden */
    collapsedBreadcrumbItems: Array<BreadcrumbItemComponent> = [];

    /** @hidden */
    placement$ = new BehaviorSubject<Placement>('bottom-start');

    /**
     * The element to act as the breadcrumb container. When provided, the breadcrumb's responsive collapsing behavior
     * performs better. When not provided, the immediate parent element's width will be used.
     */
    @Input()
    containerElement: HTMLElement;

    /** Whether to append items to the overflow dropdown in reverse order. Default is true. */
    @Input()
    reverse = false;

    /** @hidden */
    containerBoundary: number;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _itemToSize = new Map<BreadcrumbItemComponent, number>();

    constructor(
        public elementRef: ElementRef<Element>,
        @Optional() private _rtlService: RtlService,
        private _cdRef: ChangeDetectorRef,
        private _resizeObserver: ResizeObserverService,
        private _ngZone: NgZone
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((value) => this.placement$.next(value ? 'bottom-end' : 'bottom-start'))
            );
        }
    }

    ngAfterViewInit(): void {
        this._subscriptions.add(
            this.breadcrumbItems.changes
                .pipe(
                    startWith(this.breadcrumbItems),
                    map((items) => items.toArray() as BreadcrumbItemComponent[]),
                    map((items) => items.map((item) => [item, item.width]) as [BreadcrumbItemComponent, number][]),
                    tap((itemToSize: [BreadcrumbItemComponent, number][]) => (this._itemToSize = new Map(itemToSize)))
                )
                .subscribe()
        );
        firstValueFrom(this._ngZone.onStable).then(() => {
            this._subscriptions.add(
                this._resizeObserver
                    .observe(this.containerElement || (this.elementRef.nativeElement.parentElement as Element))
                    .subscribe(() => this.onResize())
            );
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    onResize(): void {
        if (!this.elementRef.nativeElement.parentElement) {
            return;
        }
        this.containerBoundary = this.elementRef.nativeElement.parentElement.getBoundingClientRect().width;

        if (this.containerElement) {
            this.containerBoundary = this.containerElement.getBoundingClientRect().width;
        }

        let visibleSum = 0;
        const breadcrumbItemComponents = this.breadcrumbItems.toArray();
        let i;
        for (i = breadcrumbItemComponents.length - 1; i >= 0; i--) {
            const breadcrumbItem = breadcrumbItemComponents[i];
            const itemSize = this._itemToSize.has(breadcrumbItem)
                ? (this._itemToSize.get(breadcrumbItem) as number)
                : breadcrumbItem.width;
            if (visibleSum + itemSize <= this.containerBoundary) {
                visibleSum += itemSize;
                breadcrumbItem.show();
            } else {
                break;
            }
        }
        const collapsedBreadcrumbItems = breadcrumbItemComponents.slice(0, ++i);
        this.collapsedBreadcrumbItems = this.reverse ? collapsedBreadcrumbItems : collapsedBreadcrumbItems.reverse();
        this.collapsedBreadcrumbItems.forEach((item) => item.hide());
        this._cdRef.detectChanges();
    }

    /** @hidden */
    keyDownHandle(event: Event): void {
        this.menuComponent.toggle();
        event.preventDefault();
    }

    /**
     * We catch interactions with item, Enter, Space, Mouse click and Touch click,
     * if original element had router link we are proxying click to that element
     * */
    itemClicked(breadcrumbItem: BreadcrumbItemComponent, $event: any): void {
        if (breadcrumbItem.needsClickProxy) {
            $event.preventDefault();
            breadcrumbItem.breadcrumbLink.elementRef().nativeElement.click();
        }
    }
}
