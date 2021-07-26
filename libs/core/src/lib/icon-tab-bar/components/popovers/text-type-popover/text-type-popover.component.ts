import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconTabBarPopoverClass } from '../icon-tab-bar-popover.class';
import { IconTabBarItem } from '../../../types';

@Component({
    selector: 'fd-text-type-popover',
    templateUrl: './text-type-popover.component.html',
    styleUrls: ['./text-type-popover.component.scss']
})
export class TextTypePopoverComponent extends IconTabBarPopoverClass {

    @Input()
    isExtraItemsMode = false;

    @Input()
    parentTab: IconTabBarItem;

    @Input()
    selectedSubItemKey: string;

    @Output()
    selectedSubItem: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        protected _cd: ChangeDetectorRef
    ) {
        super(_cd);
    }

    selectItem(selectedItem: IconTabBarItem): void {
        this.isExtraItemsMode
            ? this.selectedExtraItem.emit(selectedItem)
            : this.selectedSubItem.emit(selectedItem);
        this.popover.close();
        // this._cd.detectChanges();
    }

    trackBy(item: IconTabBarItem): string {
        return item.label;
    }
}
