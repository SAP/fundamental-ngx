import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk';
import { PopoverBodyComponent, PopoverComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { FD_LANGUAGE, FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';
import { map } from 'rxjs';
import { FdbNavigationItemLink } from '../../models/navigation-item-link.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationLinkComponent } from '../navigation-link/navigation-link.component';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

export interface NavigationMoreButtonRefContext {
    $implicit: () => void;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[fdb-navigation-more-button]',
    imports: [NavigationLinkComponent, NavigationListComponent, PopoverComponent, PopoverBodyComponent, NgClass],
    providers: [
        {
            provide: FdbNavigationListItem,
            useExisting: NavigationMoreButtonComponent
        }
    ],
    templateUrl: './navigation-more-button.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-navigation__list-item'
    }
})
export class NavigationMoreButtonComponent implements AfterViewInit {
    /** @hidden */
    @Input()
    listItems: FdbNavigationListItem[] = [];

    /** @hidden */
    @ViewChild(FdbNavigationItemLink)
    private readonly _link: Nullable<FdbNavigationItemLink>;

    /** @hidden */
    @ViewChild(PopoverComponent)
    private readonly _popover: Nullable<PopoverComponent>;

    /** @hidden */
    @ViewChild(NavigationListComponent)
    private readonly _navigationList: Nullable<NavigationListComponent>;

    /** @hidden */
    customMoreRenderer: Nullable<TemplateRef<any>>;

    /** Whether the show more is visible. */
    isVisible$ = signal(true);

    /** Whether popover is open. Applicable for snapped navigation state. */
    readonly popoverOpen$ = signal(false);

    /** ID for the more button. */
    readonly id = signal('fdb-navigation-more-button');

    /** @hidden */
    readonly type = 'showMore';

    /** @hidden */
    readonly placementContainer = undefined;

    /**
     * Whether the item is in overflow menu.
     */
    readonly isOverflow$ = signal(false);

    /** Whether item has child items. */
    readonly hasChildren$ = signal(false);

    /** @hidden */
    readonly _navigation = inject(FdbNavigation);

    /**
     * Link reference.
     */
    readonly link$ = signal<Nullable<FdbNavigationItemLink>>(null);

    /** More button aria-label attribute value. */
    readonly moreButtonAriaLabelAttr$ = computed(() => this._moreButtonAriaLabel$());

    /** Overflow menu aria-label attribute value. */
    readonly overflowMenuAriaLabelAttr$ = computed((): string => this._overflowMenuAriaLabel$() || '');

    /**
     * @hidden
     * Popover position. Changes based on rtl value.
     */
    protected readonly popoverPlacement = computed<Placement>(() => (this._isRtl() ? 'left-start' : 'right-start'));

    /** @hidden */
    private readonly _triggerElement = viewChild<ElementRef>('trigger');

    /** @hidden */
    private _popoverClicked = false;

    /** @hidden */
    private readonly elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private _translationResolver = inject(TranslationResolver);

    /** Translation signal for more button aria-label. */
    private readonly _moreButtonAriaLabel$ = toSignal(
        this._lang$.pipe(
            map((lang: FdLanguage) => this._translationResolver.resolve(lang, 'btpNavigation.moreButtonAriaLabel'))
        ),
        { initialValue: 'Displays additional navigation items that are hidden due to limited screen space' }
    );

    /** Translation signal for overflow menu aria-label. */
    private readonly _overflowMenuAriaLabel$ = toSignal(
        this._lang$.pipe(
            map((lang: FdLanguage) => this._translationResolver.resolve(lang, 'btpNavigation.overflowMenuAriaLabel'))
        ),
        { initialValue: 'Additional Navigation Items' }
    );

    /** @hidden */
    constructor() {
        this._navigation.closeAllPopups.pipe(takeUntilDestroyed(inject(DestroyRef))).subscribe(() => {
            this.popoverOpen$.set(false);
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // Set popover trigger reference
        const triggerElement = this._triggerElement();
        if (this._popover?.trigger && triggerElement) {
            this._popover.trigger.set(triggerElement);
        }
    }

    /** @hidden */
    _onPopoverOpenChange(isOpen: boolean): void {
        this.popoverOpen$.set(isOpen);

        // When popover opens, focus the first item
        if (isOpen) {
            // Use a short timeout to ensure the DOM is updated
            setTimeout(() => {
                if (this._navigationList) {
                    let firstValidIndex = 0;
                    const items = this._navigationList._listItems || [];
                    for (let i = 0; i < items.length; i++) {
                        if (items[i] && items[i]?.link$()?.elementRef?.nativeElement) {
                            firstValidIndex = i;
                            break;
                        }
                    }

                    this._navigationList.setActiveItemIndex(firstValidIndex);
                    return;
                }

                // Fallback: Focus the first item using the listItems array
                if (this.listItems && this.listItems.length > 0) {
                    const firstItem = this.listItems[0];
                    const link = firstItem.link$();

                    if (link?.elementRef?.nativeElement) {
                        link.elementRef.nativeElement.focus();
                        return;
                    }
                }

                // Last resort fallback: if direct access fails, try to focus any focusable element in the popover
                const popoverBody = (this._popover as any)?.popoverBody();
                const popoverBodyElement = popoverBody?._elementRef?.nativeElement;
                if (popoverBodyElement) {
                    const firstFocusableElement = popoverBodyElement.querySelector(
                        'a, button, [tabindex]:not([tabindex="-1"])'
                    ) as HTMLElement;
                    if (firstFocusableElement) {
                        firstFocusableElement.focus();
                    }
                }
            }, 150);
        }
    }

    /** @hidden */
    togglePopover(withClick = false): void {
        this._popoverClicked = withClick;
        this.popoverOpen$.update((value) => !value);
    }

    /** @hidden */
    registerLink(): void {}

    /** @hidden */
    unregisterLink(): void {}

    /** @hidden */
    registerChildList(): void {}

    /** @hidden */
    unregisterChildList(): void {}

    /** @hidden */
    focus(): void {
        this.focusLink();
    }

    /**
     * Focuses inner link element.
     * Optionally closes the popover.
     */
    focusLink(closePopover = false): void {
        this._link?.elementRef.nativeElement.focus();
        if (closePopover) {
            this.popoverOpen$.set(false);
        }
    }

    /** @hidden */
    toggleExpanded(): void {}

    /** @hidden */
    keyboardExpanded(shouldExpand: boolean): void {
        if (shouldExpand && !this.popoverOpen$()) {
            this.popoverOpen$.set(true);
        } else if (!shouldExpand && this.popoverOpen$()) {
            this.popoverOpen$.set(false);
        }
    }

    /** @hidden */
    _keydownPopoverToggle(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        const isRtl = this._isRtl();

        if (KeyUtil.isKeyCode(event, isRtl ? LEFT_ARROW : RIGHT_ARROW)) {
            // Open popover only if not already open
            if (!this.popoverOpen$()) {
                this.popoverOpen$.set(true);
            }
        }
    }

    /** @hidden */
    canItemBeSelected(): boolean {
        return false; // More button cannot be selected
    }
}
