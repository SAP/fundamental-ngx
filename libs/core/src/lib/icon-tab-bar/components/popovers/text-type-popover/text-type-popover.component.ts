import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IconTabBarPopoverClass } from '../icon-tab-bar-popover.class';
import { IconTabBarItem } from '../../../types';

@Component({
    selector: 'fd-text-type-popover',
    templateUrl: './text-type-popover.component.html',
})
export class TextTypePopoverComponent extends IconTabBarPopoverClass implements OnChanges {

    @Input()
    isExtraItemsMode = false;

    @Input()
    parentTab: IconTabBarItem;

    @Input()
    selectedSubItemUid: string;

    @Output()
    selectedSubItem: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        protected _cd: ChangeDetectorRef
    ) {
        super(_cd);
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.parentTab) {
            this._setStyles(this.parentTab.subItems);
        }
    }

    _selectItem(selectedItem: IconTabBarItem): void {
        this.isExtraItemsMode
            ? this.selectedExtraItem.emit(selectedItem)
            : this.selectedSubItem.emit(selectedItem);
        this.popover.close();
    }

    _trackBy(item: IconTabBarItem): string {
        return item.uId;
    }
}
