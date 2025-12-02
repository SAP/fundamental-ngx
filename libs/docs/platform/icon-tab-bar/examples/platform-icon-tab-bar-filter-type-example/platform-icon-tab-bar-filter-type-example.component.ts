import { Component, Input, OnInit } from '@angular/core';
import { IconTabBarComponent, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';

@Component({
    selector: 'fdp-platform-icon-tab-bar-filter-type-example',
    templateUrl: './platform-icon-tab-bar-filter-type-example.component.html',
    imports: [IconTabBarComponent]
})
export class PlatformIconTabBarFilterTypeExampleComponent implements OnInit {
    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? structuredClone(longIconTypeConfig) : structuredClone(iconTypeConfig);
    }
}
