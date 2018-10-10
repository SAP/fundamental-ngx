import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mega-menu',
    templateUrl: './mega-menu-docs.component.html'
})
export class MegaMenuDocsComponent implements OnInit {
    megaMenuHtml = `<fd-mega-menu>
  <fd-mega-menu-group>
    <fd-mega-menu-title>
      Group Name
    </fd-mega-menu-title>
    <fd-mega-menu-list>
      <fd-mega-menu-item>
        <fd-mega-menu-link>
          <a [attr.href]="'#'">Link</a>
        </fd-mega-menu-link>
      </fd-mega-menu-item>
      <fd-mega-menu-item>
        <fd-mega-menu-link>
          <a [routerLink]="'#'">Link</a>
        </fd-mega-menu-link>
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
          <fd-mega-menu-subitem>
            <fd-mega-menu-sublink>
              <a [attr.href]="'#'">Link</a>
            </fd-mega-menu-sublink>
          </fd-mega-menu-subitem>
          <fd-mega-menu-subitem>
            <fd-mega-menu-sublink>
              <a [routerLink]="'#'">Link</a>
            </fd-mega-menu-sublink>
          </fd-mega-menu-subitem>
        </fd-mega-menu-link>
      </fd-mega-menu-item>
    </fd-mega-menu-list>
  </fd-mega-menu-group>
</fd-mega-menu>`;

    constructor() {}

    ngOnInit() {}
}
