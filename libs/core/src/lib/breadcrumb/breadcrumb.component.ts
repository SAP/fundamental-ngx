import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    isDevMode,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { OverflowLayoutComponent } from '@fundamental-ngx/core/overflow-layout';
import { DestroyedService, RtlService } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { MenuComponent } from '@fundamental-ngx/core/menu';
import { Placement } from '@fundamental-ngx/core/shared';
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
    selector: 'fd-breadcrumb',
    host: {
        class: 'fd-breadcrumb',
        role: 'tree'
    },
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
})
export class BreadcrumbComponent implements OnInit, AfterViewInit {
    /**
     * @deprecated
     * Breadcrumbs component now uses more advanced calculation mechanism without the need of specifying the container element.
     *
     * The element to act as the breadcrumb container. When provided, the breadcrumb's responsive collapsing behavior
     * performs better. When not provided, the immediate parent element's width will be used.
     */
    @Input()
    set containerElement(_: HTMLElement) {
        if (isDevMode()) {
            console.warn(
                'Breadcrumbs component now uses more advanced calculation mechanism without the need of specifying the container element.'
            );
        }
    }

    /** Whether to append items to the overflow dropdown in reverse order. Default is true. */
    @Input()
    reverse = false;

    /** Tabindex of the breadcrumb. */
    @Input()
    tabIndex = '0';

    /**
     * Event emitted when visible items count is changed.
     */
    @Output()
    visibleItemsCount = new EventEmitter<number>();

    /**
     * Event emitted when hidden items count is changed.
     */
    @Output()
    hiddenItemsCount = new EventEmitter<number>();

    /** @hidden */
    @ContentChildren(BreadcrumbItemComponent)
    private readonly _contentItems: QueryList<BreadcrumbItemComponent>;

    /** @hidden */
    @ContentChildren(forwardRef(() => BreadcrumbItemComponent))
    breadcrumbItems: QueryList<BreadcrumbItemComponent>;

    /** @hidden */
    @ViewChild(MenuComponent)
    private readonly _menuComponent: MenuComponent;

    /** @hidden */
    @ViewChild(OverflowLayoutComponent)
    private readonly _overflowLayout: OverflowLayoutComponent;

    /**
     * @hidden
     * Array of breadcrumb items.
     */
    _items: BreadcrumbItemComponent[] = [];

    /** @hidden */
    _placement$ = new BehaviorSubject<Placement>('bottom-start');

    /** @hidden */
    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private _onDestroy$: DestroyedService,
        @Optional() private _rtlService: RtlService | null,
        private _cdr: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._rtlService?.rtl
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((value) => this._placement$.next(value ? 'bottom-end' : 'bottom-start'));
    }

    /** @hidden */
    onResize(): void {
        this._overflowLayout.triggerRecalculation();
    }

    /**
     * We catch interactions with item, Enter, Space, Mouse click and Touch click,
     * if original element had router link we are proxying click to that element
     * */
    itemClicked(breadcrumbItem: BreadcrumbItemComponent, $event: any): void {
        if (breadcrumbItem._needsClickProxy) {
            $event.preventDefault();
            breadcrumbItem.breadcrumbLink.elementRef().nativeElement.click();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setItems();

        this._contentItems.changes.subscribe(() => this._setItems());
    }

    /** @hidden */
    _keyDownHandle(event: Event): void {
        this._menuComponent.toggle();
        event.preventDefault();
    }

    /** @hidden */
    _onHiddenChange(isHidden: boolean, breadcrumb: BreadcrumbItemComponent): void {
        if (!isHidden) {
            breadcrumb._detach();
        } else {
            breadcrumb._attach();
        }
    }

    /** @hidden */
    _onVisibleItemsCountChange(visibleItemsCount: number): void {
        this.visibleItemsCount.emit(visibleItemsCount);
    }

    /** @hidden */
    _onHiddenItemsCountChange(hiddenItemsCount: number): void {
        this.hiddenItemsCount.emit(hiddenItemsCount);
    }

    /** @hidden */
    private _setItems(): void {
        this._contentItems.forEach((item) => item.setPortal());
        this._items = this._contentItems.toArray();
        this._cdr.detectChanges();
    }
}
