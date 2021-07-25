import { ChangeDetectorRef, Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core';
import { IconTabBarItem } from '../../types';

@Directive()
export abstract class IconTabBarPopoverClass implements OnChanges {

    @ViewChild('popover')
    popover: PopoverComponent;

    @Input()
    items: IconTabBarItem[];

    @Input()
    isSeparators = false;

    @Output()
    selectedExtraItem: EventEmitter<IconTabBarItem> = new EventEmitter<IconTabBarItem>();

    constructor(
        protected _cd: ChangeDetectorRef,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.items) {
            this.items.forEach(item => {
                if (item.color) {
                    item.cssClasses = [`fd-list__item--${item.color}`];
                }
            });
        }
    }

    selectItem(selectedItem: IconTabBarItem): void {
        this.selectedExtraItem.emit(selectedItem);
        this.popover.close();
        // this._cd.detectChanges();
    }
}
