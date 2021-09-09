import { Component, Input, OnInit } from '@angular/core';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';
import { cloneDeep } from '@fundamental-ngx/core/utils';
import { TabConfig } from 'libs/platform/src/lib/components/icon-tab-bar/types';

@Component({
  selector: 'fd-icon-tab-bar-filter-type-example',
  templateUrl: './platform-icon-tab-bar-filter-type-example.component.html',
})
export class PlatformIconTabBarFilterTypeExampleComponent implements OnInit {

  @Input()
  withOverflowExample = false;

  items: TabConfig[];

  ngOnInit(): void {
    this.items = this.withOverflowExample ? cloneDeep(longIconTypeConfig) : cloneDeep(iconTypeConfig);
  }
}
