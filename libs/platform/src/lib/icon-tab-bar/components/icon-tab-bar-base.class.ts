import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    isDevMode,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { OverflowListDirective, KeyUtil } from '@fundamental-ngx/core/utils';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { cloneDeep } from 'lodash-es';
import { IconTabBarItem } from '../interfaces/icon-tab-bar-item.interface';
import { TabConfig } from '../interfaces/tab-config.interface';
import { TabDestinyMode } from '../types';
import { ICON_TAB_HIDDEN_CLASS_NAME, UNIQUE_KEY_SEPARATOR } from '../constants';
import { ExtraButtonDirective } from '../directives/extra-button/extra-button.directive';
import { IconTabBarPopoverBase } from './popovers/icon-tab-bar-popover-base.class';
import { TabColorAssociations } from '../interfaces/tab-color-associations.interface';

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
    tabsConfig: TabConfig[] = [];

    /**
     * @description Flag representing rtl mode
     */
    @Input()
    isRtl: boolean;

    /**
     * @description Associations for colors of the tabs.
     * If any of the color associations provided, they'll be read by screenreader instead of the actual color
     */
    @Input()
    colorAssociations: TabColorAssociations;

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

    /**
     * @description Emits when some tab is selected.
     */
    @Output()
    selected: EventEmitter<IconTabBarItem> = new EventEmitter<IconTabBarItem>();

    /**
     * @description Reference to OverflowListDirective
     */
    @ViewChild(OverflowListDirective)
    overflowDirective: OverflowListDirective;

    /**
     * @description Reference to ExtraButtonDirective
     */
    @ViewChild(ExtraButtonDirective)
    extraBtnDirective: ExtraButtonDirective;

    /** @hidden */
    _selectedUid?: string;

    /** @hidden */
    _extraTabs: IconTabBarItem[] = [];

    /** @hidden */
    _lastVisibleTabIndex: number;

    /** @hidden */
    _tabs: IconTabBarItem[] = [];

    /** @hidden */
    private _densityMode: TabDestinyMode;

    /** @hidden */
    private _onDestroy$ = new Subject<void>();

    /** @hidden */
    private _destroyed = false;

    /** @hidden */
    constructor(protected _cd: ChangeDetectorRef, protected _ngZone: NgZone) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tabsConfig && !changes.tabsConfig.firstChange) {
            this._initTabs();
            this._triggerRecalculationVisibleItems();
            return;
        }
        if (changes.isRtl && !changes.isRtl.firstChange) {
            this._triggerRecalculationVisibleItems();
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
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._destroyed = true;
    }

    /**
     * @hidden
     * @description initialize state of tabs
     */
    protected _initTabs(): void {
        this._tabs = this._generateTabBarItems(this.tabsConfig);
        const selectedItem = this._tabs.find((item) => item.active);
        this._selectedUid = selectedItem?.uId;
        this._lastVisibleTabIndex = this._tabs.length - 1;
    }

    /**
     * @hidden
     * @description generate IconTabItems from TabConfig array
     */
    private _generateTabBarItems(config: TabConfig[]): IconTabBarItem[] {
        const flatIndexRef: FlatIndex = { value: 0 };
        return config.map((item, index) => {
            const result: IconTabBarItem = {
                ...item,
                index,
                cssClasses: [],
                uId: index.toString(),
                hidden: false,
                subItems: undefined,
                flatIndex: flatIndexRef.value++
            };
            if (item.color) {
                result.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
            }
            result.subItems = item.subItems?.length
                ? this._generateSubItems(item.subItems, result, flatIndexRef)
                : undefined;
            return result;
        });
    }

    /** @hidden */
    private _generateSubItems(
        subItems: TabConfig[],
        parent: IconTabBarItem,
        flatIndexRef: FlatIndex
    ): IconTabBarItem[] {
        return subItems?.map((item, index) => {
            const result: IconTabBarItem = {
                ...item,
                index,
                uId: `${parent.uId}${UNIQUE_KEY_SEPARATOR}${index}`,
                cssClasses: [],
                subItems: undefined,
                flatIndex: flatIndexRef.value++,
                parentUId: parent.uId
            };
            if (Array.isArray(item.subItems) && item.subItems.length) {
                result.subItems = this._generateSubItems(item.subItems, result, flatIndexRef);
            }
            return result;
        });
    }

    /**
     * @hidden
     * @param selectedItem
     * @param event
     */
    _selectItem(selectedItem: IconTabBarItem, event?: Event): void {
        event?.stopPropagation();
        this._selectedUid = selectedItem.uId;
        selectedItem.badge = false;
        this.selected.emit(selectedItem);
    }

    /** @hidden */
    _keyDownHandler(event: KeyboardEvent, tab: IconTabBarItem | undefined, currentIndex: number): void {
        if (tab && KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            event.preventDefault();
            this._selectItem(tab);
        } else if (KeyUtil.isKeyCode(event, [RIGHT_ARROW, DOWN_ARROW])) {
            event.preventDefault();
            this.isRtl ? this._focusPreviousItem(currentIndex) : this._focusNextItem(currentIndex);
        } else if (KeyUtil.isKeyCode(event, [LEFT_ARROW, UP_ARROW])) {
            event.preventDefault();
            this.isRtl ? this._focusNextItem(currentIndex) : this._focusPreviousItem(currentIndex);
        }
    }

    /** @hidden focuses next tab */
    _focusNextItem(currentIndex: number): void {
        const nextIndex = currentIndex === this._tabs.length - 1 ? 0 : currentIndex + 1;
        this._focusItem(nextIndex);
    }

    /** @hidden focuses previous tab */
    _focusPreviousItem(currentIndex: number): void {
        if (currentIndex === 0) {
            // if current focused element is first, focus the last one. If tabs are overflowed, focus the last tab in the popover
            this._focusItem(this._tabs.length - 1, true);
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
            this._getTabUIElementFocusable(this._tabUIElements.get(tabIndex))?.focus();
        }
    }

    /** @hidden */
    _trackByTab(index: number, tab: IconTabBarItem): string {
        return tab.uId;
    }

    /**
     * @hidden
     * Mapping function to resolve UI tab element to it's focusable part/descendant
     */
    protected _getTabUIElementFocusable(tabUIElement: unknown): HTMLElement | null {
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
     * @param selectedItem
     * @description select extra item inside popover
     */
    async _selectExtraItem(selectedItem: IconTabBarItem): Promise<void> {
        const deletedItem = this._tabs.splice(this._lastVisibleTabIndex, 1, selectedItem)[0] as IconTabBarItem;
        this._tabs.splice(selectedItem.index, 1, deletedItem);

        deletedItem.index = selectedItem.index;
        deletedItem.uId = `${deletedItem.index}`;
        const itemToPopover = cloneDeep(deletedItem);
        deletedItem.hidden = true;
        deletedItem.cssClasses.push(ICON_TAB_HIDDEN_CLASS_NAME);

        let indexInExtraItems;
        this._extraTabs.forEach((item, index) => {
            if (item.index === selectedItem.index) {
                indexInExtraItems = index;
            }
        });

        selectedItem.index = this._lastVisibleTabIndex;
        selectedItem.uId = `${selectedItem.index}`;
        selectedItem.hidden = false;
        if (selectedItem.color) {
            selectedItem.cssClasses = [`fd-icon-tab-bar__item--${selectedItem.color}`];
        }
        this._extraTabs.splice(indexInExtraItems, 1, itemToPopover);
        this._extraTabs = [...this._extraTabs];

        this._selectItem(selectedItem);
        await this._triggerRecalculationVisibleItems();
        this._focusItem(this._lastVisibleTabIndex);
    }

    /**
     * @hidden
     * @param extraItems
     * @description recalculate _nextSteps and _prevSteps array if we have extra items
     */
    _recalculateVisibleItems(extraItems: number): void {
        this._lastVisibleTabIndex = this._tabs.length - 1 - extraItems;
        this._tabs.forEach((item) => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter((cssClass) => cssClass !== ICON_TAB_HIDDEN_CLASS_NAME);
        });
        this._extraTabs = [];

        for (let i = this._lastVisibleTabIndex + 1; i < this._tabs.length; i++) {
            const tab = this._tabs[i];
            this._extraTabs.push(cloneDeep(tab));
            tab.hidden = true;
            tab.cssClasses.push(ICON_TAB_HIDDEN_CLASS_NAME);
        }
        this._cd.markForCheck();
    }

    /**
     * @hidden
     * @description trigger recalculation items, need to do it asynchronously after dom was rerendered
     */
    protected async _triggerRecalculationVisibleItems(): Promise<void> {
        await this._ngZone.onMicrotaskEmpty.pipe(take(1), takeUntil(this._onDestroy$)).toPromise();
        if (this.overflowDirective && !this._destroyed) {
            const extra = this.overflowDirective.getAmountOfExtraItems();
            this._recalculateVisibleItems(extra);
            this.extraBtnDirective?.calculatePosition();
            this._cd.markForCheck();
        }
    }
}

/** @hidden helper object that is used in tab generation functions to calculate their indexes not depending on level of nesting */
interface FlatIndex {
    value: number;
}
