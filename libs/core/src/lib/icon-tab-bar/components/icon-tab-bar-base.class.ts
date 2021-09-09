import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    Input,
    NgZone,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IconTabBarItem, TabConfig } from '../types';
import { cloneDeep } from '../../utils/functions/clone-deep';
import { ICON_TAB_HIDDEN_CSS, UNIQUE_KEY_SEPARATOR } from '../constants';
import { OverflowListDirective } from '../../utils/directives/overflow-list/overflow-list.directive';
import { ExtraButtonDirective } from '../directives/extra-button/extra-button.directive';


@Directive()
export abstract class IconTabBarBase implements OnInit, OnChanges, OnDestroy {

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
    _selectedUid: string;

    /** @hidden */
    _extraTabs: IconTabBarItem[] = [];

    /** @hidden */
    _lastVisibleTabIndex: number;

    /** @hidden */
    _tabs: IconTabBarItem[] = [];

    /** @hidden */
    private _onDestroy$ = new Subject();

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        protected _ngZone: NgZone,
    ) {}

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
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @hidden
     * @description initialize state of tabs
     */
    protected _initTabs(): void {
        this._tabs = this._generateTabBarItems(this.tabsConfig);
        const selectedItem = this._tabs.find(item => item.active);
        this._selectedUid = selectedItem?.uId;
        this._lastVisibleTabIndex = this._tabs.length - 1;
    }

    /**
     * @hidden
     * @description generate IconTabItems from TabConfig array
     */
    private _generateTabBarItems(config: TabConfig[]): IconTabBarItem[] {
        return config.map((item, index) => {
            const result: IconTabBarItem = {
                ...item,
                index: index,
                cssClasses: [],
                uId: index.toString(),
                hidden: false,
                subItems: null
            };
            if (item.color) {
                result.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
            }
            result.subItems = item.subItems?.length ? this._generateSubItems(item.subItems, result) : null
            return result;
        });
    }

    /** @hidden */
    private _generateSubItems(subItems: TabConfig[], parent: IconTabBarItem): IconTabBarItem[] {
        return subItems?.map((item, index) => {
            const result: IconTabBarItem = {
                ...item,
                index: index,
                uId: `${parent.uId}${UNIQUE_KEY_SEPARATOR}${index}`,
                cssClasses: [],
                subItems: null,
            };
            if (Array.isArray(item.subItems) && item.subItems.length) {
                result.subItems = this._generateSubItems(item.subItems, result)
            }
            return result
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
        this.selected.emit(selectedItem)
    }

    /**
     * @hidden
     * @param selectedItem
     * @description select extra item inside popover
     */
    _selectExtraItem(selectedItem: IconTabBarItem): void {
        const deletedItem = <IconTabBarItem>this._tabs.splice(this._lastVisibleTabIndex, 1, selectedItem)[0];
        this._tabs.splice(selectedItem.index, 1, deletedItem);

        deletedItem.index = selectedItem.index;
        const itemToPopover = cloneDeep(deletedItem);
        deletedItem.hidden = true;
        deletedItem.cssClasses.push(ICON_TAB_HIDDEN_CSS)

        let indexInExtraItems;
        this._extraTabs.forEach((item, index) => {
            if (item.index === selectedItem.index) {
                indexInExtraItems = index;
            }
        })

        selectedItem.index = this._lastVisibleTabIndex;
        selectedItem.hidden = false;
        if (selectedItem.color) {
            selectedItem.cssClasses = [`fd-icon-tab-bar__item--${selectedItem.color}`];
        }
        this._extraTabs.splice(indexInExtraItems, 1, itemToPopover);
        this._extraTabs = [...this._extraTabs];


        this._selectItem(selectedItem);
    }

    /**
     * @hidden
     * @param extraItems
     * @description recalculate _nextSteps and _prevSteps array if we have extra items
     */
    _recalculateVisibleItems(extraItems: number): void {
        this._lastVisibleTabIndex = this._tabs.length - 1 - extraItems;
        this._tabs.forEach(item => {
            item.hidden = false;
            item.cssClasses = item.cssClasses.filter(cssClass => cssClass !== ICON_TAB_HIDDEN_CSS)
        });
        this._extraTabs = [];
        const lastVisibleIndex = this._tabs.length - extraItems - 1;

        for (let i = lastVisibleIndex + 1; i < this._tabs.length; i++) {
            const tab = this._tabs[i];
            this._extraTabs.push(cloneDeep(tab));
            tab.hidden = true;
            tab.cssClasses.push(ICON_TAB_HIDDEN_CSS)
        }
        this._cd.detectChanges();
    }

    /**
     * @hidden
     * @description trigger recalculation items, need to do it asynchronously after dom was rerendered
     */
    protected _triggerRecalculationVisibleItems(): void {
        this._ngZone
            .onMicrotaskEmpty
            .pipe(
                take(1),
                takeUntil(this._onDestroy$),
                )
            .subscribe(_ => {
                if (this.overflowDirective) {
                    const extra = this.overflowDirective.getAmountOfExtraItems();
                    this._recalculateVisibleItems(extra);
                    this.extraBtnDirective?.calculatePosition();
                    this._cd.detectChanges();
                }
            });
    }
}
