import { ChangeDetectorRef, Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { IconTabBarItem } from '../../types';

@Directive()
export abstract class IconTabBarPopoverBase implements OnChanges {

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
     * @description Emits when some tab is selected.
     */
    @Output()
    selectedExtraItem: EventEmitter<IconTabBarItem> = new EventEmitter<IconTabBarItem>();

    /**
     * @hidden
     * @description state of popover
     */
    _isOpen = false;

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
    ) {}

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
    protected _setStyles(items: any[] = []): void {
        items.forEach(item => {
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
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.selectedExtraItem.emit(selectedItem);
        this.popover.close();
    }
}
