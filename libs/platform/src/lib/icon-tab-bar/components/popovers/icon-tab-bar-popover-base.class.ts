import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { IconTabBarItem } from '../../interfaces/icon-tab-bar-item.interface';
import { TabColorAssociations } from '../../interfaces/tab-color-associations.interface';

@Directive()
export abstract class IconTabBarPopoverBase implements OnChanges {
    /** @hidden list of tab html elements, that can receive focus. Each item should have "data-flatIndex" attribute */
    abstract _tabExtraUIElements: QueryList<ElementRef<HTMLElement>>;

    /**
     * @description Flag representing rtl mode
     */
    @Input()
    isRtl: boolean;

    /**
     * @description Reference to PopoverComponent
     */
    @ViewChild('popover')
    popover: PopoverComponent;

    /**
     * @description Sub items array
     */
    @Input()
    extraTabs: IconTabBarItem[];

    /**
     * @description Should we show separator between subItems
     */
    @Input()
    isSeparators = false;

    /**
     * @description Associations for colors of the tabs.
     * If any of the color associations provided, they'll be read by screenreader instead of the actual color
     */
    @Input()
    colorAssociations: TabColorAssociations;

    /**
     * @description Emits when some tab is selected.
     */
    @Output()
    selectedExtraItem: EventEmitter<IconTabBarItem> = new EventEmitter<IconTabBarItem>();

    /** @description Emits when popover is closed and focus should be applied to first visible tab */
    @Output()
    focusFirstVisibleItem: EventEmitter<void> = new EventEmitter<void>();

    /** @description Emits when popover is closed and focus should be applied to last visible tab */
    @Output()
    focusLastVisibleItem: EventEmitter<void> = new EventEmitter<void>();

    /**
     * @hidden
     * @description state of popover
     */
    _isOpen = false;

    /** @hidden */
    constructor(protected _cd: ChangeDetectorRef) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.extraTabs) {
            this._setStyles(this.extraTabs);
        }
    }

    /**
     * @hidden
     * @description Generate styles for subItems
     */
    protected _setStyles(items: IconTabBarItem[]): void {
        items.forEach((item) => {
            if (item.color) {
                item.cssClasses = [`fd-icon-tab-bar__list-item--${item.color}`];
            }
            if (Array.isArray(item.subItems)) {
                this._setStyles(item.subItems);
            }
        });
    }

    /**
     * @hidden
     * @param focusLast whether to focus first or last item in the popover
     */
    _openPopover(focusLast = false): void {
        if (!this._isOpen) {
            this.popover.open();
        }
        if (focusLast) {
            this._tabExtraUIElements.get(this._tabExtraUIElements.length - 1)?.nativeElement.focus();
        }
    }

    /** @hidden */
    _focusPreviousPopoverItem(currentIndex: number): void {
        if (currentIndex === 0) {
            this.popover.close();
            this.focusLastVisibleItem.emit();
        } else {
            const ordered = this._getOrderedTabExtraUIElements();
            ordered[currentIndex - 1].focus();
        }
    }

    /** @hidden */
    _focusNextPopoverItem(currentIndex: number): void {
        if (currentIndex === this._tabExtraUIElements.length - 1) {
            this.popover.close();
            this.focusFirstVisibleItem.emit();
        } else {
            const ordered = this._getOrderedTabExtraUIElements();
            ordered[currentIndex + 1].focus();
        }
    }

    /** @hidden */
    private _getOrderedTabExtraUIElements(): HTMLElement[] {
        return this._tabExtraUIElements
            .toArray()
            .map((e) => ({
                flatIndex: parseInt(e.nativeElement.getAttribute('data-flatIndex')!, 10),
                nativeElement: e.nativeElement
            }))
            .sort(({ flatIndex: aFlatIndex }, { flatIndex: bFlatIndex }) => aFlatIndex - bFlatIndex)
            .map(({ nativeElement }) => nativeElement);
    }

    /**
     * @hidden
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.selectedExtraItem.emit(selectedItem);
        this.popover.close();
    }

    /** @hidden */
    _keyDownHandler(event: KeyboardEvent, tab: IconTabBarItem, currentIndex: number): void {
        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            event.preventDefault();
            this._selectItem(tab);
        } else if (KeyUtil.isKeyCode(event, [RIGHT_ARROW, DOWN_ARROW])) {
            event.preventDefault();
            this.isRtl ? this._focusPreviousPopoverItem(currentIndex) : this._focusNextPopoverItem(currentIndex);
        } else if (KeyUtil.isKeyCode(event, [LEFT_ARROW, UP_ARROW])) {
            event.preventDefault();
            this.isRtl ? this._focusNextPopoverItem(currentIndex) : this._focusPreviousPopoverItem(currentIndex);
        }
    }

    /** @hidden */
    _trackByTab(index: number, tab: IconTabBarItem): string {
        return tab.uId;
    }
}
