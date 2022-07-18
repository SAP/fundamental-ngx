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
import { BehaviorSubject, debounceTime, firstValueFrom, map, startWith, Subscription, tap } from 'rxjs';
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
    _breadcrumbItems: QueryList<BreadcrumbItemComponent>;

    /** @hidden */
    @ViewChild(MenuComponent)
    _menuComponent: MenuComponent;

    @ViewChild('overflowBreadcrumbsContainer')
    private readonly _overflowContainer: ElementRef<HTMLElement>;

    /** @hidden */
    _collapsedBreadcrumbItems: Array<BreadcrumbItemComponent> = [];

    /** @hidden */
    _placement$ = new BehaviorSubject<Placement>('bottom-start');

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
    _containerBoundary: number;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _itemToSize = new Map<BreadcrumbItemComponent, number>();

    constructor(
        public readonly elementRef: ElementRef<Element>,
        @Optional() private readonly _rtlService: RtlService | null,
        private readonly _cdRef: ChangeDetectorRef,
        private readonly _resizeObserver: ResizeObserverService,
        private readonly _ngZone: NgZone
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((value) => this._placement$.next(value ? 'bottom-end' : 'bottom-start'))
            );
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._subscriptions.add(
            this._breadcrumbItems.changes
                .pipe(
                    startWith(this._breadcrumbItems),
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
                    // Add small delay for performance reasons.
                    .pipe(debounceTime(30))
                    .subscribe(() => this.onResize())
            );
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * Callback function when breadcrumbs container has been resized.
     */
    onResize(): void {
        if (!this.elementRef.nativeElement.parentElement) {
            return;
        }
        this._containerBoundary = this.elementRef.nativeElement.parentElement.getBoundingClientRect().width;

        if (this.containerElement) {
            this._containerBoundary = this.containerElement.getBoundingClientRect().width;
        }

        if (this._overflowContainer) {
            this._containerBoundary -= this._overflowContainer.nativeElement.getBoundingClientRect().width;
        }

        let visibleSum = 0;
        const breadcrumbItemComponents = this._breadcrumbItems.toArray();
        let i;
        for (i = breadcrumbItemComponents.length - 1; i >= 0; i--) {
            const breadcrumbItem = breadcrumbItemComponents[i];
            const itemSize = this._itemToSize.has(breadcrumbItem)
                ? (this._itemToSize.get(breadcrumbItem) as number)
                : breadcrumbItem.width;
            if (visibleSum + itemSize <= this._containerBoundary) {
                visibleSum += itemSize;
                breadcrumbItem.show();
            } else {
                break;
            }
        }
        const collapsedBreadcrumbItems = breadcrumbItemComponents.slice(0, ++i);
        this._collapsedBreadcrumbItems = this.reverse ? collapsedBreadcrumbItems : collapsedBreadcrumbItems.reverse();
        this._collapsedBreadcrumbItems.forEach((item) => item.hide());
        this._cdRef.detectChanges();
    }

    /** @hidden */
    _keyDownHandle(event: Event): void {
        this._menuComponent.toggle();
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
