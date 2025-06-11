import { Component, Input, OnInit } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core';
import {
    IconTabBarComponent,
    IconTabBarTabComponent,
    IconTabTitleDirective,
    TabConfig
} from '@fundamental-ngx/platform/icon-tab-bar';
import { cloneDeep } from 'lodash-es';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';

@Component({
    selector: 'fdp-platform-icon-tab-bar-process-type-example',
    templateUrl: './platform-icon-tab-bar-process-type-example.component.html',
    imports: [IconTabBarComponent, IconTabTitleDirective, IconTabBarTabComponent, IconComponent]
})
export class PlatformIconTabBarProcessTypeExampleComponent implements OnInit {
    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
    }
}
