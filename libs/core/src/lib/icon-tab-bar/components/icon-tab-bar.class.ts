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
import { IconTabBarItem, TabConfig } from '../types';
import { cloneDeep } from '../../utils/functions/clone-deep';
import { ICON_TAB_HIDDEN_CSS, UNIQUE_KEY_SEPARATOR } from '../constants';
import { OverflowItemsDirective } from '../../utils/directives/overflow-items/overflow-items.directive';
import { ExtraButtonDirective } from '../directives/extra-button/extra-button.directive';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive()
export abstract class IconTabBarClass implements OnInit, OnChanges, OnDestroy {

    @Input()
    tabsConfig: TabConfig[];

    @Input()
    isRtl: boolean;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(OverflowItemsDirective)
    overflowDirective: OverflowItemsDirective;

    @ViewChild(ExtraButtonDirective)
    extraBtnDirective: ExtraButtonDirective;

    _selectedUid: string;
    _extraTabs: IconTabBarItem[] = [];
    _lastVisibleTabIndex: number;
    _anchorIndex: number;
    _tabs: IconTabBarItem[] = [];

    private _onDestroy$ = new Subject();

    constructor(
        protected _cd: ChangeDetectorRef,
        protected _ngZone: NgZone,
    ) {}

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

    ngOnInit(): void {
        this._initTabs();
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    private _initTabs(): void {
        this._tabs = this._generateTabBarItems(this.tabsConfig);
        const selectedItem = this._tabs.find(item => item.active);
        this._selectedUid = selectedItem?.uId;
        this._lastVisibleTabIndex = this._tabs.length - 1;
    }

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

    _selectItem(selectedItem: IconTabBarItem, event?: Event): void {
        event?.stopPropagation();
        this._selectedUid = selectedItem.uId;
        selectedItem.badge = false;
        this.selected.emit(selectedItem)
    }

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
