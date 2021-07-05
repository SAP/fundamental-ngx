import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { IconTabBarItem, TabDestinyMode, TabType } from './types';
import { IconFont } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrls: ['./icon-tab-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconTabBarComponent implements OnInit {

    @Input()
    type: TabType = 'text';

    @Input()
    items: IconTabBarItem[];

    @Input()
    maxNestingLevel = 0;

    @Input()
    densityMode: TabDestinyMode = 'cozy';

    @Input() font: IconFont = 'SAP-icons';

    @Input()
    enableTabReordering = false;

    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    selectedItemId: string|number;

    constructor() {
    }

    ngOnInit(): void {
        const selectedItem = this.items.find(item => item.active);
        this.selectedItemId = selectedItem?.id;
    }

    selectItem(id: string|number): void {
        this.selectedItemId = id;
        this.selected.emit(id)
    }

}
