import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconTabBarItem } from './types';

@Directive()
export abstract class IconTabBarClass implements OnInit {

    @Input()
    items: IconTabBarItem[];

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    selectedItemId: string|number;

    ngOnInit(): void {
        const selectedItem = this.items.find(item => item.active);
        this.selectedItemId = selectedItem?.id;
    }

    selectItem(selectedItem: IconTabBarItem): void {
        this.selectedItemId = selectedItem.id;
        selectedItem.badge = false;
        this.selected.emit(selectedItem.id)
    }
}
