import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    GlyphMenuAddonDirective,
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import {
    OverflowExpandDirective,
    OverflowItemRefDirective,
    OverflowLayoutComponent,
    OverflowLayoutItemDirective
} from '@fundamental-ngx/core/overflow-layout';
import { Placement } from '@fundamental-ngx/core/shared';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { FD_BREADCRUMB_COMPONENT, FD_BREADCRUMB_ITEM_COMPONENT } from './tokens';

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
    styleUrl: './breadcrumb.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_BREADCRUMB_COMPONENT,
            useExisting: BreadcrumbComponent
        }
    ],
    standalone: true,
    imports: [
        OverflowLayoutComponent,
        OverflowItemRefDirective,
        OverflowLayoutItemDirective,
        PortalModule,
        OverflowExpandDirective,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        GlyphMenuAddonDirective,
        MenuAddonDirective,
        MenuTitleDirective,
        MenuTriggerDirective,
        LinkComponent,
        IconComponent,
        AsyncPipe,
        FdTranslatePipe
    ]
})
export class BreadcrumbComponent implements OnInit, AfterViewInit {
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

    /** @ignore */
    @ContentChildren(FD_BREADCRUMB_ITEM_COMPONENT)
    private readonly _contentItems: QueryList<BreadcrumbItemComponent>;

    /** @ignore */
    @ViewChild(MenuComponent)
    private readonly _menuComponent: MenuComponent;

    /** @ignore */
    @ViewChild(OverflowLayoutComponent)
    private readonly _overflowLayout: OverflowLayoutComponent;

    /**
     * @ignore
     * Array of breadcrumb items.
     */
    _items: BreadcrumbItemComponent[] = [];

    /** @ignore */
    _placement$ = new BehaviorSubject<Placement>('bottom-start');

    /** @ignore */
    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private _destroyRef: DestroyRef,
        @Optional() private _rtlService: RtlService | null,
        private _cdr: ChangeDetectorRef
    ) {}

    /** @ignore */
    ngOnInit(): void {
        this._rtlService?.rtl
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((value) => this._placement$.next(value ? 'bottom-end' : 'bottom-start'));
    }

    /** @ignore */
    onResize(): void {
        this._overflowLayout.triggerRecalculation();
    }

    /**
     * We catch interactions with item, Enter, Space, Mouse click and Touch click,
     * if original element had router link we are proxying click to that element
     * */
    itemClicked(breadcrumbItem: BreadcrumbItemComponent, $event: Event): void {
        if (breadcrumbItem._needsClickProxy) {
            $event.preventDefault();
            breadcrumbItem.breadcrumbLink.elementRef.nativeElement.click();
        }
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._setItems();

        this._contentItems.changes.subscribe(() => this._setItems());
    }

    /** @ignore */
    _keyDownHandle(event: Event): void {
        this._menuComponent.toggle();
        event.preventDefault();
    }

    /** @ignore */
    _onHiddenChange(isHidden: boolean, breadcrumb: BreadcrumbItemComponent): void {
        if (!isHidden) {
            breadcrumb._detach();
        } else {
            breadcrumb._attach();
        }
    }

    /** @ignore */
    _onVisibleItemsCountChange(visibleItemsCount: number): void {
        this.visibleItemsCount.emit(visibleItemsCount);
    }

    /** @ignore */
    _onHiddenItemsCountChange(hiddenItemsCount: number): void {
        this.hiddenItemsCount.emit(hiddenItemsCount);
    }

    /** @ignore */
    private _setItems(): void {
        this._contentItems.forEach((item) => item.setPortal());
        this._items = this._contentItems.toArray();
        this._cdr.detectChanges();
    }
}
