import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html'
})
export class MegaMenuComponent implements OnInit {

  megaMenuHtml = `<fd-mega-menu>
  <fd-mega-menu-group>
    <fd-mega-menu-title>
      Group Name
    </fd-mega-menu-title>
    <fd-mega-menu-list>
      <fd-mega-menu-item>
        <fd-mega-menu-link [url]="'#'">Link</fd-mega-menu-link>
      </fd-mega-menu-item>
      <fd-mega-menu-item>
        <fd-mega-menu-link [url]="'#'">Link</fd-mega-menu-link>
      </fd-mega-menu-item>
    </fd-mega-menu-list>
  </fd-mega-menu-group>
  <fd-mega-menu-group>
    <fd-mega-menu-title>
      Group Name
    </fd-mega-menu-title>
    <fd-mega-menu-list>
      <fd-mega-menu-item>
        <fd-mega-menu-link [hasSublist]="true">
          Link
          <fd-mega-menu-subitem [url]="'#'">Link</fd-mega-menu-subitem>
          <fd-mega-menu-subitem [url]="'#'">Link</fd-mega-menu-subitem>
        </fd-mega-menu-link>
      </fd-mega-menu-item>
    </fd-mega-menu-list>
  </fd-mega-menu-group>
</fd-mega-menu>`;

  constructor() { }

  ngOnInit() { }
}



