import { Component, Input, OnInit } from '@angular/core';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';
import { cloneDeep } from 'lodash-es';
import { TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fd-icon-tab-bar-filter-type-example',
    templateUrl: './platform-icon-tab-bar-filter-type-example.component.html'
})
export class PlatformIconTabBarFilterTypeExampleComponent implements OnInit {
    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
    }
}
