import { Component, Input, OnInit } from '@angular/core';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';
import { cloneDeep } from '@fundamental-ngx/core/utils';
import { TabConfig } from '@fundamental-ngx/platform';

@Component({
    selector: 'fd-icon-tab-bar-icon-only-type-example',
    templateUrl: './platform-icon-tab-bar-icon-only-type-example.component.html',
})
export class PlatformIconTabBarIconOnlyTypeExampleComponent implements OnInit {

    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
    }
}
