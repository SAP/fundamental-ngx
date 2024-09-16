import { Component, Input, OnInit } from '@angular/core';
import { IconTabBarComponent, IconTabBarTabComponent, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
import { cloneDeep } from 'lodash-es';
import { IconTabTitleDirective } from '../../../../../platform/icon-tab-bar/directives/icon-tab-title.directive';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';

@Component({
    selector: 'fdp-platform-icon-tab-bar-icon-type-example',
    templateUrl: './platform-icon-tab-bar-icon-type-example.component.html',
    standalone: true,
    imports: [IconTabBarComponent, IconTabBarTabComponent, IconTabTitleDirective]
})
export class PlatformIconTabBarIconTypeExampleComponent implements OnInit {
    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
    }
}
