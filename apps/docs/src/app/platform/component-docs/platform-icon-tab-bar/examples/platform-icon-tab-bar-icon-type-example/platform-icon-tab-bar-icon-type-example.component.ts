import { Component, Input, OnInit } from '@angular/core';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';
import { cloneDeep } from 'lodash-es';
import { TabConfig } from '../../platform-icon-tab-bar-docs.component';

@Component({
    selector: 'fd-icon-tab-bar-icon-type-example',
    templateUrl: './platform-icon-tab-bar-icon-type-example.component.html'
})
export class PlatformIconTabBarIconTypeExampleComponent implements OnInit {
    @Input()
    withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
    }
}
