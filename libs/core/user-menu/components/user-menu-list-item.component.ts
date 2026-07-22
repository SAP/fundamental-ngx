import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
    afterNextRender,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Injector,
    input,
    Output,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { KeyboardSupportItemInterface, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Subject } from 'rxjs';

let uniqueId = 0;
let uniqueTextId = 0;
let uniqueSubtitleId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-list-item]',
    templateUrl: './user-menu-list-item.component.html',
    host: {
        class: 'fd-menu__item',
        role: 'none',
        '[attr.id]': 'uniqueId()',
        '[attr.aria-labelledby]': 'textId()',
        '(mouseenter)': 'onHostMouseEnter()',
        '(mouseleave)': 'onHostMouseLeave()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PopoverBodyComponent, PopoverComponent, PopoverControlComponent, CommonModule]
})
export class UserMenuListItemComponent implements KeyboardSupportItemInterface {
    /** @hidden Event name for child menu item state changes */
    private static readonly STATE_CHANGE_EVENT = 'fdMenuItemStateChange';

    /** @hidden Event name for sibling close coordination */
    private static readonly SIBLING_CLOSE_EVENT = 'fdMenuItemCloseSubmenu';

    /** @hidden Event name for force closing nested submenus */
    private static readonly FORCE_CLOSE_EVENT = 'fdMenuItemForceClose';
    /** Event emitter for isOpenChange event that controls the submenu popover body */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitter for showSubmenu event */
    @Output() showSubmenu: EventEmitter<TemplateRef<any> | null> = new EventEmitter();

    /** Event emitter for updateTitle event */
    @Output() updateTitle: EventEmitter<string | null> = new EventEmitter();

    /** Event emitter for keyDown event */
    readonly keyDown = output<KeyboardEvent>();

    /** Unique id for the menu list item. Default is provided. */
    uniqueId = input(`fd-menu-list-item-${++uniqueId}`);

    /** Icon name for the menu list item (optional) */
    icon = input<string>();

    /** Icon name for the menu list item (optional) */
    iconAfter = input<string>();

    /** Whether the icon after is in active state */
    iconAfterActive = input(false, { transform: booleanAttribute });

    /** Required text for the menu list item */
    text = input.required<string>();

    /** Unique id for the title. Default is provided. */
    textId = input(`fd-menu-list-item-title-${++uniqueTextId}`);

    /** Whether the text should be truncated */
    truncateText = input(false, { transform: booleanAttribute });

    /** Subtitle text for the menu list item */
    subtitle = input<string | undefined>();

    /** Unique id for the subtitle. Default is provided. */
    subtitleId = input(`fd-menu-list-item-subtitle-${++uniqueSubtitleId}`);

    /** Whether the subtitle should be truncated */
    truncateSubtitle = input(false, { transform: booleanAttribute });

    /** Whether the item has a submenu */
    hasSubmenu = input(false, { transform: booleanAttribute });

    /** Template ref for user menu list item submenu */
    submenu = input<TemplateRef<any> | null>(null);

    /** Whether the item is selected */
    selected = input(false, { transform: booleanAttribute });

    /** Whether the item's submenu is open */
    isOpen = signal(false);

    /** Whether the item is in mobile mode */
    mobile = signal(false);

    /** Reference to the popover */
    popover = viewChild(PopoverComponent);

    /** @hidden */
    readonly focused = new Subject<UserMenuListItemComponent>();

    /** Item's tabindex */
    readonly _tabIndex$ = signal<number | null>(null);

    /** @hidden */
    readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private _changeDetectionRef = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden RTL service for direction detection */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden Computed signal to track RTL state */
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden Track whether popover open/close was triggered by keyboard */
    private _keyboardTriggered = false;

    /** @hidden Timer for delayed close on mouseleave */
    private _hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;

    /** @hidden Track number of open child submenus */
    private _openChildCount = 0;

    /** @hidden Flag indicating mouse has left the popover and close is pending */
    private _pendingClose = false;

    /** @hidden Cleanup function for child state listener */
    private _childStateListenerCleanup: (() => void) | null = null;

    /** @hidden Cleanup function for sibling close listener */
    private _siblingCloseListenerCleanup: (() => void) | null = null;

    /** @hidden Grace period in ms before closing submenu on mouseleave */
    private readonly _hoverCloseDelay = 150;

    constructor() {
        afterNextRender(() => this._setupEventListeners(), { injector: this._injector });

        this._destroyRef.onDestroy(() => {
            this._childStateListenerCleanup?.();
            this._childStateListenerCleanup = null;
            this._siblingCloseListenerCleanup?.();
            this._siblingCloseListenerCleanup = null;
            this._cancelHoverCloseTimer();
        });
    }

    /** @hidden */
    @HostListener('focusin')
    focusHandler(): void {
        this.focused.next(this);
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (!this.hasSubmenu() || this.mobile()) {
            return;
        }

        const popoverInstance = this.popover();
        if (!popoverInstance) {
            return;
        }

        const isRtl = this._isRtl();

        // In RTL mode, LEFT arrow opens submenu and RIGHT arrow closes it
        // In LTR mode, RIGHT arrow opens submenu and LEFT arrow closes it
        const openKey = isRtl ? LEFT_ARROW : RIGHT_ARROW;
        const closeKey = isRtl ? RIGHT_ARROW : LEFT_ARROW;

        if (KeyUtil.isKeyCode(event, openKey) && !this.isOpen()) {
            event.preventDefault();
            this._keyboardTriggered = true;
            popoverInstance.open();
        } else if (KeyUtil.isKeyCode(event, closeKey) && this.isOpen()) {
            event.preventDefault();
            this._keyboardTriggered = true;
            popoverInstance.close();
        }
    }

    /** @hidden Handle keyboard in popover body */
    onPopoverBodyKeyDown(event: KeyboardEvent): void {
        const isRtl = this._isRtl();
        const closeKey = isRtl ? RIGHT_ARROW : LEFT_ARROW;

        if (KeyUtil.isKeyCode(event, closeKey) && this.isOpen()) {
            event.preventDefault();
            this._keyboardTriggered = true;
            const popoverInstance = this.popover();
            if (popoverInstance) {
                popoverInstance.close();
            }
        }

        // Escape is handled by the popover internally, but we need to set the flag
        // so that focus returns to the trigger item
        if (KeyUtil.isKeyCode(event, ESCAPE) && this.isOpen()) {
            this._keyboardTriggered = true;
        }
    }

    /** @hidden Open submenu on host mouseenter (non-mobile only) */
    onHostMouseEnter(): void {
        if (this.mobile()) {
            return;
        }

        this._cancelHoverCloseTimer();

        // Focus this item to maintain keyboard navigation state
        this.focus();

        // Close sibling submenus at the same nesting level
        this._closeSiblingSubmenus();

        // Open this item's submenu if it has one
        if (this.hasSubmenu()) {
            const popoverInstance = this.popover();
            if (popoverInstance && !this.isOpen()) {
                popoverInstance.open();
            }
        }
    }

    /** @hidden Schedule submenu close on host mouseleave */
    onHostMouseLeave(): void {
        if (!this.hasSubmenu() || this.mobile()) {
            return;
        }
        this._scheduleHoverClose();
    }

    /** @hidden Cancel close when mouse enters the submenu popover body */
    onSubmenuMouseEnter(): void {
        this._cancelHoverCloseTimer();
        this._pendingClose = false;
    }

    /** @hidden Schedule close when mouse leaves the submenu popover body */
    onSubmenuMouseLeave(event: MouseEvent): void {
        if (!this.hasSubmenu() || this.mobile()) {
            return;
        }

        const relatedTarget = event.relatedTarget as HTMLElement;
        // Navigate: popover() -> popoverBody signal -> PopoverBodyComponent -> ElementRef -> nativeElement
        const thisItemsPopoverBody = this.popover()?.popoverBody?.()?._elementRef?.nativeElement;

        // Don't close if mouse is still in this item's popover
        if (thisItemsPopoverBody && relatedTarget && thisItemsPopoverBody.contains(relatedTarget)) {
            return;
        }

        // Mark that we want to close, but wait if children are open
        this._pendingClose = true;

        // If any child submenu is open, wait for it to close
        if (this._openChildCount > 0) {
            return;
        }

        this._scheduleHoverClose();
    }

    /** Handles submenu selection in mobile mode */
    onShowDetailsView(): void {
        if (this.submenu() && this.mobile()) {
            this.showSubmenu.emit(this.submenu());
            this.updateTitle.emit(this.text());
        }
    }

    /** @hidden Support for KeyboardSupportItemInterface */
    click(): void {
        const linkElement: HTMLButtonElement = this._elementRef.nativeElement.querySelector('.fd-menu__link');
        linkElement.click();
    }

    /** @hidden */
    focus(): void {
        const linkElement: HTMLButtonElement = this._elementRef.nativeElement.querySelector('.fd-menu__link');
        linkElement.focus();
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean, popover: PopoverComponent): void {
        const popoverBodyEl = (popover as any).popoverBody?.();
        const firstTabbableElement: HTMLButtonElement =
            popoverBodyEl?._elementRef.nativeElement.querySelector('.fd-menu__link');

        const linkElement: HTMLButtonElement = this._elementRef.nativeElement.querySelector('.fd-menu__link');

        if (this.isOpen() === isOpen) {
            return;
        }

        const keyboardTriggered = this._keyboardTriggered;
        this._keyboardTriggered = false;

        this.isOpen.set(isOpen);

        this.isOpenChange.emit(isOpen);

        // Notify parent item (if any) about child state change
        this._notifyParentOfStateChange(isOpen);

        // Setup listener for child state changes if opening
        if (isOpen) {
            this._setupChildStateListener(popoverBodyEl?._elementRef.nativeElement);
        } else {
            // When closing, also close all nested child submenus
            this._closeAllNestedSubmenus(popoverBodyEl?._elementRef.nativeElement);
            // Reset state when closing
            this._openChildCount = 0;
            this._pendingClose = false;
            this._childStateListenerCleanup?.();
            this._childStateListenerCleanup = null;
        }

        afterNextRender(
            () => {
                this.isOpen() ? linkElement.classList.add('is-selected') : linkElement.classList.remove('is-selected');
                if (keyboardTriggered && firstTabbableElement && this.isOpen()) {
                    firstTabbableElement.focus();
                }
            },
            { injector: this._injector }
        );

        if (!this.isOpen() && keyboardTriggered) {
            linkElement.focus();
        }

        this._changeDetectionRef.detectChanges();
    }

    /** @hidden Notify parent menu item of this item's state change */
    private _notifyParentOfStateChange(isOpen: boolean): void {
        // Dispatch custom event that bubbles up to parent popover bodies
        const event = new CustomEvent(UserMenuListItemComponent.STATE_CHANGE_EVENT, {
            detail: { isOpen },
            bubbles: true
        });
        this._elementRef.nativeElement.dispatchEvent(event);
    }

    /** @hidden Setup listener for child menu item state changes */
    private _setupChildStateListener(popoverBody: HTMLElement): void {
        if (!popoverBody) {
            return;
        }

        // Clean up previous listener if any
        this._childStateListenerCleanup?.();

        // Listen for state changes from child menu items
        const handleChildStateChange = (event: Event): void => {
            const customEvent = event as CustomEvent<{ isOpen: boolean }>;
            // Stop propagation to prevent parent popover bodies from double-counting
            // this event. Each level re-emits its own state change via _notifyParentOfStateChange.
            event.stopPropagation();

            if (customEvent.detail.isOpen) {
                this._openChildCount++;
            } else {
                this._openChildCount = Math.max(0, this._openChildCount - 1);

                // If no more children are open and we have a pending close, execute it
                if (this._openChildCount === 0 && this._pendingClose) {
                    this._scheduleHoverClose();
                }
            }
        };

        popoverBody.addEventListener(UserMenuListItemComponent.STATE_CHANGE_EVENT, handleChildStateChange);

        // Store cleanup function (destroyed via constructor-registered onDestroy)
        this._childStateListenerCleanup = () => {
            popoverBody.removeEventListener(UserMenuListItemComponent.STATE_CHANGE_EVENT, handleChildStateChange);
        };
    }

    /** @hidden Schedule a delayed close of the submenu popover */
    private _scheduleHoverClose(): void {
        this._cancelHoverCloseTimer();
        this._hoverCloseTimer = setTimeout(() => {
            const popoverInstance = this.popover();
            if (popoverInstance && this.isOpen()) {
                popoverInstance.close();
            }
            this._pendingClose = false;
        }, this._hoverCloseDelay);
    }

    /** @hidden Cancel any pending hover close timer */
    private _cancelHoverCloseTimer(): void {
        if (this._hoverCloseTimer !== null) {
            clearTimeout(this._hoverCloseTimer);
            this._hoverCloseTimer = null;
        }
    }

    /**
     * Closes sibling menu items' submenus at the same nesting level.
     * Uses custom DOM events to coordinate between siblings.
     * Only dispatches if there are siblings that actually have submenus.
     * @hidden
     */
    private _closeSiblingSubmenus(): void {
        const thisElement = this._elementRef.nativeElement as HTMLElement;
        const parentElement = thisElement.parentElement;

        if (!parentElement) {
            return;
        }

        // Check if any siblings have submenus before dispatching the event
        // This prevents unnecessary closes when navigating within a submenu that has no submenu siblings
        const siblings = Array.from(parentElement.children);
        const hasSubmenuSiblings = siblings.some((sibling) => {
            if (sibling === thisElement) {
                return false;
            }
            // Check if this sibling has a popover (indicating a submenu)
            return sibling.querySelector('fd-popover') !== null;
        });

        if (!hasSubmenuSiblings) {
            // No siblings with submenus, no need to dispatch close event
            return;
        }

        // Dispatch an event that siblings will listen for
        const event = new CustomEvent(UserMenuListItemComponent.SIBLING_CLOSE_EVENT, {
            detail: { sourceElement: thisElement },
            bubbles: false // Don't bubble, only direct siblings should hear it
        });
        parentElement.dispatchEvent(event);
    }

    /**
     * Recursively closes all nested child submenus within a popover body.
     * Called when a submenu is closing to ensure all descendants are also closed.
     * @hidden
     */
    private _closeAllNestedSubmenus(popoverBodyEl: HTMLElement): void {
        if (!popoverBodyEl) {
            return;
        }

        // Find all menu items with popovers inside this popover body
        const childItems = popoverBodyEl.querySelectorAll('[fd-user-menu-list-item]');

        childItems.forEach((itemEl: Element) => {
            const popover = itemEl.querySelector('fd-popover');
            if (popover) {
                // Find the popover body of this child item
                const childPopoverBody = popover.querySelector('fd-popover-body');
                if (childPopoverBody) {
                    // Recursively close any nested submenus first
                    this._closeAllNestedSubmenus(childPopoverBody as HTMLElement);
                }

                // Close this child item's popover by dispatching a close event
                const closeEvent = new CustomEvent(UserMenuListItemComponent.FORCE_CLOSE_EVENT, {
                    bubbles: false
                });
                itemEl.dispatchEvent(closeEvent);
            }
        });
    }

    /**
     * Helper method to close the popover if it's open.
     * Reduces code duplication across event handlers.
     * @hidden
     */
    private _closePopover(): void {
        const popoverInstance = this.popover();
        if (popoverInstance && this.isOpen()) {
            popoverInstance.close();
        }
    }

    /**
     * Set up event listeners for coordinating submenu behavior.
     * Called after next render when DOM is ready.
     * @hidden
     */
    private _setupEventListeners(): void {
        const thisElement = this._elementRef.nativeElement as HTMLElement;
        const parentElement = thisElement.parentElement;

        if (!parentElement) {
            return;
        }

        // Listen for sibling close events from the parent
        const handleSiblingClose = (event: Event): void => {
            const customEvent = event as CustomEvent<{ sourceElement: HTMLElement }>;
            const sourceElement = customEvent.detail.sourceElement;

            // Ignore events from ourselves or non-siblings
            if (sourceElement === thisElement || sourceElement.parentElement !== parentElement) {
                return;
            }

            // Ignore if in different popover contexts
            const thisPopoverBody = thisElement.closest('fd-popover-body');
            const sourcePopoverBody = sourceElement.closest('fd-popover-body');
            if (thisPopoverBody !== sourcePopoverBody) {
                return;
            }

            this._closePopover();
        };

        // Listen for force close events (used when recursively closing nested submenus)
        const handleForceClose = (): void => {
            this._closePopover();
        };

        parentElement.addEventListener(UserMenuListItemComponent.SIBLING_CLOSE_EVENT, handleSiblingClose);
        thisElement.addEventListener(UserMenuListItemComponent.FORCE_CLOSE_EVENT, handleForceClose);

        this._siblingCloseListenerCleanup = () => {
            parentElement.removeEventListener(UserMenuListItemComponent.SIBLING_CLOSE_EVENT, handleSiblingClose);
            thisElement.removeEventListener(UserMenuListItemComponent.FORCE_CLOSE_EVENT, handleForceClose);
        };
    }
}
