import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NestedListInterface } from './nested-list/nested-list.interface';
import { NestedItemInterface } from './nested-item/nested-item.interface';

@Injectable()
export class NestedListStateService {

    /**
     * @hidden
     * The condensed state is modified by the parent and read by nested lists.
     */
    condensed: boolean = false;

    /**
     * Event, that is thrown always, when the link's selected state is changed, triggers
     */
    readonly refresh$: Subject<void> = new Subject<void>();

    /**
     * @hidden
     * Recursive method, that adds selected state to parents, when any of the children is selected
     */
    private selected(item: NestedItemInterface): boolean {

        item.allChildrenItems.forEach(_item => _item.linkItem.controlSelected = _item.linkItem.selected);

        const hasChildSelected: boolean = !!item.allChildrenItems.find(
            _item => (_item.linkItem && _item.linkItem.selected || this.selected(_item))
        );

        if (hasChildSelected) {
            item.linkItem.controlSelected = hasChildSelected;
        }
        return hasChildSelected;
    }

    /**
     * @hidden
     * Recursive method, that removes all of controlSelected properties.
     */
    private resetSelected(item: NestedItemInterface): void {
        if (item.linkItem) {
            item.linkItem.controlSelected = false;
        }
        item.allChildrenItems.forEach(_item => {
            this.resetSelected(_item);
        })
    }

    /** Method that adds selected state to elements, depending on children from deeper level */
    public propagateSelected(list: NestedListInterface): void {
        list.nestedItems.forEach(item => this.resetSelected(item));
        list.nestedItems.forEach(item => this.selected(item));
    }

}
