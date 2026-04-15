import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
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
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import { HasElementRef, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
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
import { FD_LANGUAGE_SIGNAL, FdTranslatePipe, TranslationResolver } from '@fundamental-ngx/i18n';
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
        '[attr.aria-label]': '_ariaLabel',
        '(keydown)': '_onKeydown($event)'
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
export class BreadcrumbComponent implements AfterViewInit, HasElementRef {
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
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    protected readonly placement = computed<Placement>(() => (this._rtlService?.rtl() ? 'bottom-end' : 'bottom-start'));

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
    private readonly _langSignal = inject(FD_LANGUAGE_SIGNAL);

    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        effect(() => {
            const lang = this._langSignal();
            this._ariaLabel = this._translationResolver.resolve(lang, 'coreBreadcrumb.breadcrumbTrailLabel');
        });
    }

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
    ngAfterViewInit(): void {
        this._setItems();

        this._contentItems.changes.subscribe(() => {
            this._setItems();
            this._updateAriaLabels();
        });

        // Set menu roles for breadcrumb context
        (this._menuComponent as any)._navContainerRole = 'dialog';
        (this._menuComponent as any)._menuListContainerRole = 'menu';

        /**
         * Set initial aria-labels
         * Roving tabindex is applied in _onVisibleItemsCountChange once overflow layout resolves
         */
        this._updateAriaLabels();
    }

    /**
     * @hidden
     * Opens the overflow menu on keyboard activation.
     * Bound to keyup (not keydown) so that by the time the menu opens and captures focus,
     * the key has been fully released and no stale key events reach the first menu item.
     */
    openOverflowMenu(event: Event): void {
        event.preventDefault();
        if (!this._menuComponent.isOpen()) {
            this._menuComponent.open();
        }
    }

    /** @hidden */
    _onKeydown(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW])) {
            return;
        }

        const links = this._getVisibleLinks();
        if (links.length === 0) {
            return;
        }

        const activeEl = document.activeElement as HTMLElement;
        const currentIndex = links.indexOf(activeEl);
        if (currentIndex === -1) {
            return;
        }

        const isRtl = this._rtlService?.rtl();
        const isNext =
            KeyUtil.isKeyCode(event, DOWN_ARROW) || KeyUtil.isKeyCode(event, isRtl ? LEFT_ARROW : RIGHT_ARROW);
        const nextIndex = isNext ? Math.min(currentIndex + 1, links.length - 1) : Math.max(currentIndex - 1, 0);

        if (nextIndex !== currentIndex) {
            // Update roving tabindex: old item becomes unfocusable, new item becomes the tab stop
            links[currentIndex].setAttribute('tabindex', '-1');
            links[nextIndex].setAttribute('tabindex', '0');
            links[nextIndex].focus();
            event.preventDefault();
        }
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

        /**
         * Defer tabindex update: the overflow layout emits this event before detectChanges(),
         * so soft-hidden CSS classes haven't been applied yet.
         * A microtask ensures the DOM is up to date.
         */
        Promise.resolve().then(() => this._updateTabIndexes());
    }

    /** @hidden */
    _onHiddenItemsCountChange(hiddenItemsCount: number): void {
        this.hiddenItemsCount.emit(hiddenItemsCount);
    }

    /**
     * @hidden
     * Returns all focusable breadcrumb elements in DOM order: visible link items,
     * the overflow "..." collapse button, and the aria-current page span.
     * Excludes items hidden by the overflow layout (soft-hidden).
     *
     * Uses querySelectorAll rather than Angular queries because:
     * - The overflow "..." button is rendered in the component template, not projected
     *   as a content child, so it cannot be captured via @ContentChildren.
     * - The aria-current span is user-provided content inside fd-breadcrumb-item and
     *   is not an Angular component/directive — there's no token to query it.
     * - querySelectorAll naturally returns elements in DOM (visual) order, which is
     *   exactly what arrow key navigation needs, without manual sorting.
     */
    private _getVisibleLinks(): HTMLElement[] {
        const el = this.elementRef.nativeElement;
        return Array.from(
            el.querySelectorAll<HTMLElement>(
                '.fd-overflow-layout__item:not(.fd-overflow-layout__item--soft-hidden) a.fd-link, .fd-overflow-layout__item:not(.fd-overflow-layout__item--soft-hidden) [aria-current], .fd-breadcrumb__collapsed'
            )
        );
    }

    /**
     * @hidden
     * Applies roving tabindex: sets all focusable breadcrumb elements to tabindex="-1",
     * then promotes the first visible one to tabindex="0".
     * This ensures Tab enters/exits the breadcrumb as a single stop,
     * and non-href elements (click-only links, aria-current spans) are programmatically focusable.
     */
    private _updateTabIndexes(): void {
        const el = this.elementRef.nativeElement;
        // Set ALL focusable breadcrumb elements to -1 (including hidden ones)
        const allLinks = el.querySelectorAll<HTMLElement>('a.fd-link, [aria-current], .fd-breadcrumb__collapsed');
        allLinks.forEach((link) => link.setAttribute('tabindex', '-1'));

        // Promote the first visible one to 0
        const visibleLinks = this._getVisibleLinks();
        if (visibleLinks.length > 0) {
            visibleLinks[0].setAttribute('tabindex', '0');
        }
    }

    /** @hidden */
    private _setItems(): void {
        this._contentItems.forEach((item) => item.setPortal());
        this._items$.set(this._contentItems.toArray());
    }

    /** @hidden */
    private _updateAriaLabels(): void {
        const items = this._contentItems.toArray();
        const totalCount = items.length;
        const lang = this._langSignal();

        items.forEach((item, index) => {
            const position = index + 1;
            const positionLabel = this._translationResolver.resolve(lang, 'coreBreadcrumb.positionLabel', {
                current: position,
                total: totalCount
            });

            // Set aria-label on link if present
            if (item.breadcrumbLink) {
                const linkEl = item.breadcrumbLink.elementRef.nativeElement;
                const linkText = linkEl.textContent?.trim() || '';
                linkEl.setAttribute('aria-label', `${linkText}, ${positionLabel}`);
            } else {
                // Set aria-label on direct child span with aria-current if present
                const itemElement = item.elementRef.nativeElement;
                const directChildSpan = Array.from(itemElement.children).find(
                    (child) => child.tagName === 'SPAN' && child.hasAttribute('aria-current')
                ) as HTMLElement;
                if (directChildSpan) {
                    const spanText = directChildSpan.textContent?.trim() || '';
                    directChildSpan.setAttribute('aria-label', `${spanText}, ${positionLabel}`);
                }
            }
        });
    }
}
