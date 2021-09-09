import { Component, Input, OnInit } from '@angular/core';
import { TabConfig } from '../../../../../../../../../libs/core/src/lib/icon-tab-bar/types';
import { iconTypeConfig, longIconTypeConfig } from '../config-for-examples/icon-type-config';

@Component({
  selector: 'fd-icon-tab-bar-filter-type-example',
  templateUrl: './icon-tab-bar-filter-type-example.component.html',
})
export class IconTabBarFilterTypeExampleComponent implements OnInit {

  @Input() withOverflowExample = false;

  items: TabConfig[];

  ngOnInit(): void {
    this.items = this.withOverflowExample ? longIconTypeConfig : iconTypeConfig;
  }
}
