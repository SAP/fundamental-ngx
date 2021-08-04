import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IconTabBarPopoverBase } from '../icon-tab-bar-popover-base.class';
import { IconTabBarItem } from '../../../types';

@Component({
    selector: 'fd-text-type-popover',
    templateUrl: './text-type-popover.component.html',
})
export class TextTypePopoverComponent extends IconTabBarPopoverBase implements OnChanges {

    /**
     * @description Is extra items mode or subitems mode
     */
    @Input()
    isExtraItemsMode = false;

    /**
     * @description Parent tab need for subItems mode
     */
    @Input()
    parentTab: IconTabBarItem;

    /**
     * @description uId of selected subItem
     */
    @Input()
    selectedSubItemUid: string;

    /**
     * @description Emits when some subTab is selected and isExtraItemsMode is disabled
     */
    @Output()
    selectedSubItem: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef
    ) {
        super(_cd);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.parentTab) {
            this._setStyles(this.parentTab.subItems);
        }
    }

    /**
     * @hidden
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this.isExtraItemsMode
            ? this.selectedExtraItem.emit(selectedItem)
            : this.selectedSubItem.emit(selectedItem);
        this.popover.close();
    }

    /**
     * @hidden
     * @param item
     * @returns uId
     */
    _trackBy(item: IconTabBarItem): string {
        return item.uId;
    }
}
