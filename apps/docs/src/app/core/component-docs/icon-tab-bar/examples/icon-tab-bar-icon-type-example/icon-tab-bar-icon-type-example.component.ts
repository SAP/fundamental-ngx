import { Component, Input, OnInit } from '@angular/core';
import { TabConfig } from '@fundamental-ngx/core/icon-tab-bar';
import { iconTypeConfig, longIconTypeConfig} from '../config-for-examples/icon-type-config';
import { cloneDeep } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fd-icon-tab-bar-icon-type-example',
    templateUrl: './icon-tab-bar-icon-type-example.component.html'
})
export class IconTabBarIconTypeExampleComponent implements OnInit {

    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
    }
}
