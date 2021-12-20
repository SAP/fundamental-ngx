import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, startWith, Subscription, tap } from 'rxjs';
import { TAB } from '@angular/cdk/keycodes';
import { FocusKeyManager } from '@angular/cdk/a11y';

import { KeyUtil } from '@fundamental-ngx/core/utils';
import { MenuComponent } from '@fundamental-ngx/core/menu';
import { Placement } from '@fundamental-ngx/core/shared';
import { DYNAMIC_PAGE_HEADER_COMPONENT, DynamicPageHeaderInterface } from '@fundamental-ngx/core/utils';
import { DynamicPageService } from '@fundamental-ngx/core/dynamic-page';
import { ContentDensityService, ResizeObserverService, RtlService } from '@fundamental-ngx/core/utils';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';

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
        class: 'fd-breadcrumb',
        role: 'tree'
    },
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements AfterViewInit, OnInit, OnDestroy {
    /** Whenever links wrapped inside overflow should be displayed in compact mode  */
    @Input()
    compact?: boolean;

    /** Allow keyboard navigation through breadcrumb link */
    @Input()
    arrowNavigation = false;

    /** Whenever arrow navigation is allowed it emits an event when Tab key pressed */
    @Output()
    tabOut: EventEmitter<void> = new EventEmitter<void>();

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

    @Input()
    tabIndex = '0';

    /** @hidden */
    containerBoundary: number;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _keyManager: FocusKeyManager<BreadcrumbItemDirective>;

    /** @hidden */
    private _itemToSize = new Map<BreadcrumbItemComponent, number>();

    constructor(
        public elementRef: ElementRef<Element>,
        @Optional() private _rtlService: RtlService,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _dynamicPageService: DynamicPageService,
        @Optional() @Inject(DYNAMIC_PAGE_HEADER_COMPONENT) private _dynamicPageHeader: DynamicPageHeaderInterface,
        private _cdRef: ChangeDetectorRef,
        private _resizeObserver: ResizeObserverService,
        private _ngZone: NgZone
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.onResize();

        if (this.arrowNavigation) {
            this._keyManager = new FocusKeyManager<BreadcrumbItemDirective>(this.breadcrumbItems)
                .withWrap(false)
                .skipPredicate((item) => !(item.breadcrumbLink || item.href))
                .withHorizontalOrientation(this._isRtl ? 'rtl' : 'ltr');

            this._subscriptions.add(
                this._keyManager.tabOut.subscribe(() => {
                    this.tabOut.emit();
                })
            );
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((value) => {
                    this._isRtl = value;
                    this.placement$.next(value ? 'bottom-end' : 'bottom-start');
                })
            );
        }
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._cdRef.markForCheck();
                })
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
    @HostListener('keydown', ['$event'])
    handleArrowKeydown(event: KeyboardEvent): void {
        if (this.arrowNavigation) {
            if (this._keyManager.activeItem === null) {
                this._keyManager.setActiveItem(0);
            }

            // prevent tab key default behaviour to avoid unexpected children focus
            if (KeyUtil.isKeyCode(event, TAB)) {
                event.preventDefault();
            }

            this._keyManager.onKeydown(event);
        }
    }

    /** @hidden */
    keyDownHandle(event: Event): void {
        this.menuComponent.toggle();
        event.preventDefault();
    }
}
