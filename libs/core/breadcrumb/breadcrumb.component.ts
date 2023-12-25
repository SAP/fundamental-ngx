import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    computed,
    inject,
    signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { of } from 'rxjs';
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
export class BreadcrumbComponent implements AfterViewInit {
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
    @ContentChildren(FD_BREADCRUMB_ITEM_COMPONENT)
    private readonly _contentItems: QueryList<BreadcrumbItemComponent>;

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
    _items$ = signal<BreadcrumbItemComponent[]>([]);

    /** @hidden */
    _placement$ = computed<Placement>(() => (this._rtl$() ? 'bottom-end' : 'bottom-start'));

    /** Element reference. */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    private readonly _rtl$ = toSignal(inject(RtlService, { optional: true })?.rtl || of(false));

    /** @hidden */
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
        this._items$.set(this._contentItems.toArray());
    }
}
