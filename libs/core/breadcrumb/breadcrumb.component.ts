import { PortalModule } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    computed,
    inject,
    input,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HasElementRef, RtlService } from '@fundamental-ngx/cdk/utils';
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
import { FD_LANGUAGE, FdLanguage, FdTranslatePipe, TranslationResolver } from '@fundamental-ngx/i18n';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { FD_BREADCRUMB_COMPONENT, FD_BREADCRUMB_ITEM_COMPONENT } from './tokens';

export type BreadcrumbSeparatorStyle =
    | ''
    | 'backslash'
    | 'double-slash'
    | 'double-backslash'
    | 'greater-than'
    | 'double-greater-than';

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
        role: 'navigation',
        '[class]': '_cssClass()',
        '[attr.aria-label]': '_ariaLabel'
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
        FdTranslatePipe
    ]
})
export class BreadcrumbComponent implements OnInit, AfterViewInit, HasElementRef {
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
     * Separator style for the breadcrumb items.
     * Can be 'backslash' | 'double-slash' | 'double-backslash' | 'greater-than' | 'double-greater-than'
     * Omit for default (slash)
     */
    separatorStyle = input<BreadcrumbSeparatorStyle>('');

    /** @hidden */
    _ariaLabel: string;

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
    protected readonly _cssClass = computed(() => {
        const classes = ['fd-breadcrumb'];
        const style = this.separatorStyle();
        if (style) {
            classes.push(`fd-breadcrumb--${style}`);
        }
        return classes.join(' ');
    });

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _rtl$ = computed<boolean>(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    onResize(): void {
        this._overflowLayout.triggerRecalculation();
    }

    /**
     * Function that handles click, touch, enter and space events.
     */
    itemClicked(breadcrumbItem: BreadcrumbItemComponent, $event: Event): void {
        $event.preventDefault();
        breadcrumbItem.breadcrumbLink.elementRef.nativeElement.click();
    }

    /** @hidden */
    ngOnInit(): void {
        this._lang$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((lang: FdLanguage) => {
            this._ariaLabel = this._translationResolver.resolve(lang, 'coreBreadcrumb.breadcrumbTrailLabel');
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setItems();

        this._contentItems.changes.subscribe(() => this._setItems());

        this._menuComponent._navContainerRole = 'dialog';
        this._menuComponent._menuListContainerRole = 'menu';
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
