import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IconTabBarItem, TabDestinyMode, TabType } from './types';
import { IconFont } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrls: ['./icon-tab-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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

    constructor() {
    }

    ngOnInit(): void {
    }

}
