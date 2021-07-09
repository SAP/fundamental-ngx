import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IconTabBarItem } from '../../types';

@Component({
    selector: 'fd-icon-tab-bar-popover',
    templateUrl: './icon-tab-bar-popover.component.html',
    styleUrls: ['./icon-tab-bar-popover.component.scss']
})
export class IconTabBarPopoverComponent implements OnChanges {

    @Input() items: IconTabBarItem[];

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

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
        this.selected.emit(selectedItem);
        // this._cd.detectChanges();
    }
}
