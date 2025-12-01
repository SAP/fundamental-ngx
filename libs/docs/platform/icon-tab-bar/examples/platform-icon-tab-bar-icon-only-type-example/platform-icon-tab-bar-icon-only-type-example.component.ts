import { Component, Input, OnInit } from '@angular/core';
import { cloneDeep } from '@fundamental-ngx/cdk/utils';
import { IconTabBarComponent, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';

@Component({
    selector: 'fdp-platform-icon-tab-bar-icon-only-type-example',
    templateUrl: './platform-icon-tab-bar-icon-only-type-example.component.html',
    imports: [IconTabBarComponent]
})
export class PlatformIconTabBarIconOnlyTypeExampleComponent implements OnInit {
    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
    }
}
