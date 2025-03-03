import {
    AfterViewInit,
    ChangeDetectorRef,
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    inject,
    input,
    Input,
    isDevMode,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    signal,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { take } from 'rxjs/operators';

import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, OverflowListDirective } from '@fundamental-ngx/cdk/utils';
import { FD_DYNAMIC_PAGE } from '@fundamental-ngx/core/dynamic-page';
import { ICON_TAB_HIDDEN_CLASS_NAME } from '../constants';
import { IconTabBarItem } from '../interfaces/icon-tab-bar-item.interface';
import { TabColorAssociations } from '../interfaces/tab-color-associations.interface';
import { TabDestinyMode } from '../types';
import { IconTabBarPopoverBase } from './popovers/icon-tab-bar-popover-base.class';
import { TextTypePopoverComponent } from './popovers/text-type-popover/text-type-popover.component';

@Directive()
export abstract class IconTabBarBase implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    /**
     * @hidden
     * List of tab elements, that can receive focus.
     * There's a separate mapping function to get actual html element: `_getTabUIElementFocusable`
     */
    abstract _tabUIElements: QueryList<unknown>;
    /** @hidden */
    abstract _tabBarPopover: IconTabBarPopoverBase;

    /**
     * @description A tab bar configuration that stores the state of each tab. Based on this configuration, a tab bar is representing.
     */
    @Input()
    set tabs(value: IconTabBarItem[]) {
        this._tabs = value;
    }

    /** @hidden */
    get tabs(): IconTabBarItem[] {
        return this._tabs;
    }

    /**
     * @description Flag representing rtl mode
     */
    @Input()
    isRtl: boolean;

    /**
     * @description densityMode setter triggers tabs to re-calculation overflowed tabs
     */
    @Input()
    set densityMode(value: TabDestinyMode) {
        // Skip first value && value doesn't equal to previous one
        if (this._densityMode && value !== this._densityMode) {
            this._triggerRecalculationVisibleItems();
        }
        this._densityMode = value;
    }

    /** Currently selected tab Unique ID. */
    @Input()
    selectedUid: string | undefined;

    /**
     * @description Emits when some tab is selected.
     */
    @Output()
    selected: EventEmitter<IconTabBarItem> = new EventEmitter<IconTabBarItem>();

    /** Emits when selected tab Unique ID changes. */
    @Output()
    selectedUidChange = new EventEmitter<string | undefined>();

    /**
     * @description Reference to OverflowListDirective
     */
    @ViewChild(OverflowListDirective)
    overflowDirective: OverflowListDirective;

    /** Header element reference. */
    @ViewChild('tablist', { read: ElementRef })
    headerElement: ElementRef<HTMLElement>;

    /** @hidden */
    _extraTabs$ = signal<IconTabBarItem[]>([]);

    /** @hidden */
    _lastVisibleTabIndex: number;

    /** @hidden */
    _extraItems$ = signal(false);

    /** @hidden Heading level of the tab. */
    tabHeadingLevel = input<number | null>(null);

    /**
     * @description Associations for colors of the tabs.
     * If any of the color associations provided, they'll be read by screenreader instead of the actual color
     */
    colorAssociations = input<TabColorAssociations | undefined>();

    /** @hidden */
    readonly _inDynamicPage = !!inject(FD_DYNAMIC_PAGE, { optional: true });

    /** @hidden */
    protected readonly _cd = inject(ChangeDetectorRef);

    /** @Hidden */
    protected readonly _ngZone = inject(NgZone);

    /** @hidden */
    private _tabs: IconTabBarItem[] = [];

    /** @hidden */
    private _densityMode: TabDestinyMode;

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _destroyed = false;

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tabs && !changes.tabs.firstChange) {
            this._initTabs();
            this._triggerRecalculationVisibleItems();
            return;
        }
        if (changes.isRtl && !changes.isRtl.firstChange) {
            this._triggerRecalculationVisibleItems();
        }

        if (changes.selectedUid && !changes.selectedUid.firstChange) {
            this._handleSelectedUidChange();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._initTabs();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._triggerRecalculationVisibleItems();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed = true;
    }

    /**
     * @hidden
     * @param selectedItem
     * @param event
     */
    _selectItem(selectedItem: IconTabBarItem, event?: Event): void {
        event?.stopPropagation();
        this.selectedUid = selectedItem.uId;
        this.selectedUidChange.emit(this.selectedUid);
        selectedItem.badge = false;
        this.selected.emit(selectedItem);
    }

    /** @hidden */
    _keyDownHandler(
        event: KeyboardEvent,
        tab: IconTabBarItem | undefined,
        currentIndex: number,
        popover?: TextTypePopoverComponent
    ): void {
        if (tab && KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            event.preventDefault();
            this._selectItem(tab);
        } else if (KeyUtil.isKeyCode(event, [RIGHT_ARROW, DOWN_ARROW])) {
            event.preventDefault();
            if (KeyUtil.isKeyCode(event, DOWN_ARROW) && tab?.subItems?.length) {
                popover?._openPopover();
                return;
            }
            this.isRtl ? this._focusPreviousItem(currentIndex) : this._focusNextItem(currentIndex);
        } else if (KeyUtil.isKeyCode(event, [LEFT_ARROW, UP_ARROW])) {
            event.preventDefault();
            this.isRtl ? this._focusNextItem(currentIndex) : this._focusPreviousItem(currentIndex);
        }
    }

    /** @hidden focuses next tab */
    _focusNextItem(currentIndex: number): void {
        const nextIndex = currentIndex === this.tabs.length - 1 ? 0 : currentIndex + 1;
        this._focusItem(nextIndex);
    }

    /** @hidden focuses previous tab */
    _focusPreviousItem(currentIndex: number): void {
        if (currentIndex === 0) {
            // if current focused element is first, focus the last one. If tabs are overflowed, focus the last tab in the popover
            this._focusItem(this.tabs.length - 1, true);
        } else {
            this._focusItem(currentIndex - 1);
        }
    }

    /**
     * @hidden
     * @param tabIndex index of the tab to apply focus
     * @param focusLast whether to focus first or last item in the popover
     */
    _focusItem(tabIndex: number, focusLast = false): void {
        if (tabIndex > this._lastVisibleTabIndex) {
            this._tabBarPopover._openPopover(focusLast);
        } else {
            const itemToFocus = this._getTabUIElementFocusable(this._tabUIElements.get(tabIndex));
            itemToFocus?.focus();
        }
    }

    /**
     * @hidden
     * @param selectedItem
     * @description select extra item inside popover
     */
    _selectExtraItem(selectedItem: IconTabBarItem): void {
        if (selectedItem.color) {
            selectedItem.cssClasses = [`fd-icon-tab-bar__item--${selectedItem.color}`];
        }

        this._selectItem(selectedItem);
        this._triggerRecalculationVisibleItems();
    }

    /**
     * @hidden
     * @param extraItems
     * @description recalculate _nextSteps and _prevSteps array if we have extra items
     */
    _recalculateVisibleItems(extraItems: number): void {
        this._extraItems$.set(extraItems > 0);

        const tabs = [...this._tabs];
        const extraTabs: IconTabBarItem[] = [];
        const selected = tabs.find((tab) => tab.uId === this.selectedUid);

        this._lastVisibleTabIndex = this._getLastVisibleTabIndex(tabs.length, extraItems, selected);

        this._resetAndHideExtraTabs(tabs, extraTabs);

        this._extraTabs$.set(extraTabs);
        this._cd.detectChanges();
    }

    /**
     * @hidden
     * Mapping function to resolve UI tab element to it's focusable part/descendant
     */
    protected _getTabUIElementFocusable(tabUIElement: unknown): Nullable<HTMLElement> {
        if (tabUIElement && typeof tabUIElement === 'object' && 'nativeElement' in tabUIElement) {
            if ((<ElementRef>tabUIElement).nativeElement instanceof HTMLElement) {
                return (<ElementRef<HTMLElement>>tabUIElement).nativeElement;
            }
        }
        if (isDevMode()) {
            console.warn('Failed to get focusable tab element');
        }
        return null;
    }

    /**
     * @hidden
     * @description trigger recalculation items, need to do it asynchronously after dom was rerendered
     */
    protected _triggerRecalculationVisibleItems(): void {
        this._ngZone.onMicrotaskEmpty.pipe(take(1), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            if (this.overflowDirective && !this._destroyed) {
                const extra = this.overflowDirective.getAmountOfExtraItems();
                this._recalculateVisibleItems(extra);
                this._cd.detectChanges();
            }
        });
    }

    /**
     * @hidden
     * @description initialize state of tabs
     */
    protected _initTabs(): void {
        this._lastVisibleTabIndex = this.tabs.length - 1;

        if (this.selectedUid) {
            return;
        }

        const selectedItem = this._findActiveTabId(this.tabs) || this.tabs[0];
        this.selectedUid = selectedItem?.uId;

        if (!selectedItem) {
            return;
        }

        this.selectedUidChange.emit(this.selectedUid);
        this.selected.emit(selectedItem);
    }

    /**
     * @hidden
     * Resets and hides extra tabs.
     * @param tabs - The list of tab items.
     * @param extraTabs - The list of extra tab items.
     */
    private _resetAndHideExtraTabs(tabs: IconTabBarItem[], extraTabs: IconTabBarItem[]): void {
        tabs.forEach((item) => this._resetTab(item));
        this._hideExtraTabs(tabs, extraTabs);
    }

    /**
     * @hidden
     * Handles changes to the selected UID.
     */
    private _handleSelectedUidChange(): void {
        const isExtraTab = this._extraTabs$().find((tab) => tab.uId === this.selectedUid);
        const selected = this.tabs.find((tab) => tab.uId === this.selectedUid);
        if (isExtraTab) {
            this._selectExtraItem(isExtraTab);
        } else if (selected) {
            this._selectExtraItem(selected);
        }
    }

    /**
     * @hidden
     * Calculates the index of the last visible tab item.
     * @param totalTabs - The total number of tabs.
     * @param extraItems - The number of extra items.
     * @param selected - The currently selected tab item (optional).
     * @returns The index of the last visible tab item.
     */
    private _getLastVisibleTabIndex(totalTabs: number, extraItems: number, selected?: IconTabBarItem): number {
        if (selected && selected.index >= totalTabs - extraItems) {
            return totalTabs - extraItems - 2;
        } else {
            return totalTabs - extraItems - 1;
        }
    }

    /**
     * @hidden
     * Resets the visibility and CSS classes of a tab item.
     * @param tab - The tab item to reset.
     */
    private _resetTab(tab: IconTabBarItem): void {
        tab.hidden = false;
        tab.cssClasses = tab.cssClasses.filter((cssClass) => cssClass !== ICON_TAB_HIDDEN_CLASS_NAME);
    }

    /**
     * @hidden
     * Hides extra tabs and updates the extraTabs array with the hidden tabs.
     * @param tabs - The array of all tab items.
     * @param extraTabs - The array to store the hidden tab items.
     */
    private _hideExtraTabs(tabs: IconTabBarItem[], extraTabs: IconTabBarItem[]): void {
        for (let i = this._lastVisibleTabIndex + 1; i < tabs.length; i++) {
            const tab = tabs[i];
            if (tab && tab?.uId !== this.selectedUid) {
                extraTabs.push({ ...tab });
                tab.hidden = true;
                tab.cssClasses.push(ICON_TAB_HIDDEN_CLASS_NAME);
            }
        }
    }

    /**
     * @hidden
     * Recursively finds the active tab item in a list of tabs.
     * @param tabs - The array of tab items.
     * @returns The active tab item, or undefined if no active tab is found.
     */
    private _findActiveTabId(tabs: IconTabBarItem[]): IconTabBarItem | undefined {
        let activeTab: IconTabBarItem | undefined;
        for (const tab of tabs) {
            if (tab.active) {
                activeTab = tab;
                break;
            } else if (tab.subItems) {
                activeTab = this._findActiveTabId(tab.subItems);
                if (activeTab) {
                    break;
                }
            }
        }

        return activeTab;
    }
}
