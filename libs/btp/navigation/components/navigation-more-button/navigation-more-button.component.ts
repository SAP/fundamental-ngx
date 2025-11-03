import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { NgClass } from '@angular/common';
import {
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
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk';
import { PopoverBodyComponent, PopoverComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
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
export class NavigationMoreButtonComponent {
    /** @hidden */
    @Input()
    listItems: FdbNavigationListItem[] = [];

    /** @hidden */
    @ViewChild(FdbNavigationItemLink)
    private readonly _link: Nullable<FdbNavigationItemLink>;

    /** @hidden */
    customMoreRenderer: Nullable<TemplateRef<any>>;

    /** Whether the show more is visible. */
    isVisible$ = signal(true);

    /** Whether popover is open. Applicable for snapped navigation state. */
    readonly popoverOpen$ = signal(false);

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

    /**
     * @hidden
     * Popover position. Changes based on rtl value.
     */
    readonly _popoverPlacement$ = computed<Placement>(() => (this._rtl$() ? 'left-start' : 'right-start'));

    /** @hidden */
    private _popoverClicked = false;

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _rtl$ = computed<boolean>(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    constructor() {
        this._navigation.closeAllPopups.pipe(takeUntilDestroyed(inject(DestroyRef))).subscribe(() => {
            this.popoverOpen$.set(false);
        });
    }

    /** @hidden */
    _onPopoverOpenChange(isOpen: boolean): void {
        this.popoverOpen$.set(isOpen);

        // When popover opens, focus the first item
        if (isOpen) {
            // Use a short timeout to ensure the DOM is updated
            setTimeout(() => {
                // Query the document for any open popover (since popover is rendered at document level)
                const popoverBody = document.querySelector('.fd-popover__body:not([style*="display: none"])');

                if (popoverBody) {
                    const firstLink = popoverBody.querySelector('a[fdb-navigation-link]') as HTMLElement;

                    if (firstLink) {
                        firstLink.focus();
                        return;
                    }
                }

                // Fallback to listItems array if DOM query fails
                if (this.listItems && this.listItems.length > 0) {
                    const firstItem = this.listItems[0];
                    const link = firstItem.link$();

                    if (link?.elementRef?.nativeElement) {
                        link.elementRef.nativeElement.focus();
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
        const isRtl = this._rtl$() || false;

        const isOpenAction = KeyUtil.isKeyCode(event, isRtl ? LEFT_ARROW : RIGHT_ARROW);

        this.popoverOpen$.set(isOpenAction);
    }

    /** @hidden */
    canItemBeSelected(): boolean {
        return false; // More button cannot be selected
    }
}
