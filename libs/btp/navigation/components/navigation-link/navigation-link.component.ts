import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    Renderer2,
    Signal,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    effect,
    inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { of, startWith } from 'rxjs';
import { FdbNavigationItemLink } from '../../models/navigation-item-link.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';

@Directive({
    selector: '[fdbNavigationLinkRef]',
    standalone: true
})
export class NavigationLinkRefDirective {
    /** Link template ref. */
    readonly templateRef = inject(TemplateRef);
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'a[fdb-navigation-link], button[fdb-navigation-link]',
    imports: [IconComponent],
    hostDirectives: [RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FdbNavigationItemLink,
            useExisting: NavigationLinkComponent
        }
    ],
    host: {
        class: 'fd-navigation__link',
        '[attr.role]': 'quickCreate ? "button" : "link"'
    },
    templateUrl: './navigation-link.component.html'
})
export class NavigationLinkComponent extends FdbNavigationItemLink implements OnDestroy {
    /** @hidden */
    @Input()
    class: Nullable<string>;

    /** Link glyph */
    @Input()
    glyph: Nullable<string>;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Whether the link is for the external resource. */
    @Input()
    external = false;

    /** Whether it's a quick create button. */
    @Input({ transform: booleanAttribute })
    quickCreate = false;

    /** Whether the link is inside popover. */
    get inPopover(): boolean {
        return !!this.elementRef.nativeElement.parentElement?.classList.contains('fd-navigation__item--title');
    }

    /** Element reference. */
    readonly elementRef = inject<ElementRef<HTMLLinkElement>>(ElementRef);

    /** @hidden */
    readonly isActive$: Signal<boolean | undefined>;

    /** @hidden */
    readonly _listItemComponent = inject(FdbNavigationListItem, {
        optional: true
    });

    /** Router link reference. Used to determine whether the list item should be rendered with external expansion button. */
    readonly routerLink = inject(RouterLink, {
        optional: true,
        self: true
    });

    /** @hidden */
    private readonly _routerLinkActive = inject(RouterLinkActive, {
        optional: true,
        self: true
    });

    /** @hidden */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _navigation = inject(FdbNavigation);

    /** @hidden */
    private _renderer = inject(Renderer2);

    /** @hidden */
    private _tabIndexEffect = effect(() => {
        // Track all the signals that affect tabindex computation
        this._navigation.getActiveItem(); // Track active item changes
        const isParentPopoverOpen = this._listItemComponent?.popoverOpen$();
        const isGrandparentPopoverOpen = this._listItemComponent?.parentListItem?.popoverOpen$();

        const hasOpenPopover = isParentPopoverOpen || isGrandparentPopoverOpen;

        if (hasOpenPopover) {
            // For popover cases, update immediately to ensure tabindex is set before focus management
            this._updateTabIndex();
        } else {
            // For other cases, use setTimeout to avoid expression changed errors
            setTimeout(() => {
                this._updateTabIndex();
            }, 0);
        }
    });

    /** @hidden */
    constructor() {
        super();
        this._listItemComponent?.registerLink(this);
        this.isActive$ = toSignal(
            this._routerLinkActive?.isActiveChange.pipe(startWith(this._routerLinkActive.isActive)) || of(false)
        );
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    _clickHandler(event: Event): void {
        // Check if this is a NavigationMoreButtonComponent (More button itself)
        if (
            this._listItemComponent &&
            'type' in this._listItemComponent &&
            (this._listItemComponent as any).type === 'showMore'
        ) {
            return;
        }

        const disabled = this._listItemComponent?.disabled$?.() || false;

        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (this.inPopover || !this._listItemComponent?.isVisible$() || this._listItemComponent?.isOverflow$()) {
            this._navigation.closePopups();
        }

        if (this.routerLink) {
            return;
        }

        // Handle selection directly if in click mode
        if (this._navigation.selectionMode === 'click' && this._listItemComponent) {
            const canSelect = this._canItemBeSelected();

            if (canSelect) {
                this._navigation.service.setSelectedItem(this._listItemComponent);
            } else {
                // Handle expansion for items with children
                this._listItemComponent?.toggleExpanded();
            }
        } else {
            // Handle expansion for items with children
            this._listItemComponent?.toggleExpanded();
        }
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _keyDownHandler(event: Event): void {
        const keyboardEvent = event as KeyboardEvent;
        // Simple disabled check at the start
        const isDisabled = this._listItemComponent?.disabled$?.() || false;
        if (isDisabled) {
            return; // Just ignore, don't prevent - let CSS handle it
        }

        // Handle Space and Enter for selection (same as click behavior)
        if (KeyUtil.isKeyCode(keyboardEvent, [SPACE, ENTER])) {
            // Check if this is a NavigationMoreButtonComponent (More button itself)
            if (
                this._listItemComponent &&
                'type' in this._listItemComponent &&
                (this._listItemComponent as any).type === 'showMore'
            ) {
                return; // Let the popover handle Space/Enter
            }

            // Prevent default scrolling behavior for Space
            keyboardEvent.preventDefault();

            if (this.inPopover || !this._listItemComponent?.isVisible$() || this._listItemComponent?.isOverflow$()) {
                this._navigation.closePopups();
            }

            // Ignore if link has URL applied to it (let router handle it)
            if (this.routerLink) {
                return;
            }

            // Handle selection directly if in click mode
            if (this._navigation.selectionMode === 'click' && this._listItemComponent) {
                const canSelect = this._canItemBeSelected();

                if (canSelect) {
                    this._navigation.service.setSelectedItem(this._listItemComponent);
                } else {
                    // Handle expansion for items with children
                    this._listItemComponent?.toggleExpanded();
                }
            } else {
                // Handle expansion for items with children
                this._listItemComponent?.toggleExpanded();
            }
            return;
        }

        if (this.inPopover && KeyUtil.isKeyCode(keyboardEvent, DOWN_ARROW)) {
            this._listItemComponent?.popoverLinkArrowDown();
            return;
        }

        if (!KeyUtil.isKeyCode(keyboardEvent, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        // Skip keyboard expansion for More buttons - they handle their own keyboard events
        if ((this._listItemComponent as any).type === 'showMore') {
            return;
        }

        const expansionKey = this._rtl?.rtl.value ? LEFT_ARROW : RIGHT_ARROW;

        this._listItemComponent?.keyboardExpanded(KeyUtil.isKeyCode(keyboardEvent, expansionKey));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._listItemComponent?.unregisterLink(this);
    }

    /** @hidden */
    private _updateTabIndex(): void {
        try {
            // Check if this link should have tabindex=0
            const isActiveItem = this._navigation.getActiveItem()?.link$() === this;

            // Check if any ancestor has an open popover
            const isParentPopoverOpen = this._listItemComponent?.popoverOpen$();
            const isGrandparentPopoverOpen = this._listItemComponent?.parentListItem?.popoverOpen$();

            // When a popover is open, all links in the popover hierarchy should be focusable
            if (isParentPopoverOpen || isGrandparentPopoverOpen) {
                // All links in popover context should be focusable (except disabled ones)
                const tabIndex = 0;
                this._renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', tabIndex.toString());
            } else {
                // Normal case: active item gets tabindex=0, others get -1
                const tabIndex = isActiveItem ? 0 : -1;
                this._renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', tabIndex.toString());
            }
        } catch {
            // Fallback to -1 if there's any issue during evaluation
            this._renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '-1');
        }
    }

    /** @hidden */
    private _canItemBeSelected(): boolean {
        if (!this._listItemComponent) {
            return false;
        }

        // Group items (headers) cannot be selected
        if (this._listItemComponent.isGroup$()) {
            return false;
        }

        // Items with children that don't have a router link cannot be selected
        // (they should only expand/collapse)
        if (this._listItemComponent.hasChildren$() && !this.routerLink) {
            return false;
        }

        // Separator and spacer items cannot be selected
        if (this._listItemComponent.separator || this._listItemComponent.spacer) {
            return false;
        }

        // All other items (leaf items and items with both links and children) can be selected
        return true;
    }
}
