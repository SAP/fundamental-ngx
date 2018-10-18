import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html'
})
export class SideNavigationDocsComponent implements OnInit {
    oneLevelSideNavHtml = `<fd-side-nav>
  <fd-side-nav-list>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [attr.href]="'#'">Link Item</a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [routerLink]="'#'">Link Item</a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        Link Item
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        Link Item
      </fd-side-nav-link>
    </fd-side-nav-item>
  </fd-side-nav-list>
</fd-side-nav>`;
    titlesSideNavHtml = `<fd-side-nav>
  <fd-side-nav-group>
    <fd-side-nav-title>
      Group Title
    </fd-side-nav-title>
    <fd-side-nav-list>
      <fd-side-nav-item>
        <fd-side-nav-link>
          <a [attr.href]="'#'">Link Item</a>
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link>
          <a [routerLink]="'#'">Link Item</a>
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link>
          Link Item
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link>
          Link Item
        </fd-side-nav-link>
      </fd-side-nav-item>
    </fd-side-nav-list>
  </fd-side-nav-group>
  <fd-side-nav-group>
    <fd-side-nav-title>
      Group Title
    </fd-side-nav-title>
    <fd-side-nav-list>
      <fd-side-nav-item>
        <fd-side-nav-link>
          <a [attr.href]="'#'">Link Item</a>
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link>
          <a [routerLink]="'#'">Link Item</a>
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link>
          Link Item
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link>
          Link Item
        </fd-side-nav-link>
      </fd-side-nav-item>
    </fd-side-nav-list>
  </fd-side-nav-group>
</fd-side-nav>`;
    multiLevelsSideNavHtml = `<fd-side-nav>
  <fd-side-nav-group>
    <fd-side-nav-title>
      Group Name
    </fd-side-nav-title>
    <fd-side-nav-list>
      <fd-side-nav-item>
        <fd-side-nav-link>
          <a [attr.href]="'#'">Link Item</a>
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link>
          <a [routerLink]="'#'">Link Item</a>
        </fd-side-nav-link>
      </fd-side-nav-item>
    </fd-side-nav-list>
  </fd-side-nav-group>
  <fd-side-nav-group>
    <fd-side-nav-title>
      Group Name
    </fd-side-nav-title>
    <fd-side-nav-list>
      <fd-side-nav-item>
        <fd-side-nav-link [hasSublist]="true">
          Link Item
          <fd-side-nav-subitem>
            <fd-side-nav-sublink>
              <a [attr.href]="'#'">Link Item</a>
            </fd-side-nav-sublink>
          </fd-side-nav-subitem>
          <fd-side-nav-subitem>
            <fd-side-nav-sublink>
              <a [routerLink]="'#'">Link Item</a>
            </fd-side-nav-sublink>
          </fd-side-nav-subitem>
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link [hasSublist]="true">
          Link Item
          <fd-side-nav-subitem>
            <fd-side-nav-sublink>
              <a [attr.href]="'#'">Link Item</a>
            </fd-side-nav-sublink>
          </fd-side-nav-subitem>
          <fd-side-nav-subitem>
            <fd-side-nav-sublink>
              <a [routerLink]="'#'">Link Item</a>
            </fd-side-nav-sublink>
          </fd-side-nav-subitem>
        </fd-side-nav-link>
      </fd-side-nav-item>
      <fd-side-nav-item>
        <fd-side-nav-link [hasSublist]="true">
          Link Item
          <fd-side-nav-subitem>
            <fd-side-nav-sublink>
              <a [attr.href]="'#'">Link Item</a>
            </fd-side-nav-sublink>
          </fd-side-nav-subitem>
          <fd-side-nav-subitem>
            <fd-side-nav-sublink>
              <a [routerLink]="'#'">Link Item</a>
            </fd-side-nav-sublink>
          </fd-side-nav-subitem>
        </fd-side-nav-link>
      </fd-side-nav-item>
    </fd-side-nav-list>
  </fd-side-nav-group>
</fd-side-nav>`;
    iconsSideNavHtml = `<fd-side-nav>
  <fd-side-nav-list>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [routerLink]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>Link Icon
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [attr.href]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>Link Icon
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [routerLink]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>Link Icon
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [attr.href]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>Link Icon
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
  </fd-side-nav-list>
</fd-side-nav>`;
    collapsedSideNavHtml = `<fd-side-nav [collapsed]="true">
  <fd-side-nav-list>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [attr.href]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [routerLink]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [attr.href]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
    <fd-side-nav-item>
      <fd-side-nav-link>
        <a [routerLink]="'#'">
          <fd-side-nav-icon [glyph]="'home'" [size]="'l'"></fd-side-nav-icon>
        </a>
      </fd-side-nav-link>
    </fd-side-nav-item>
  </fd-side-nav-list>
</fd-side-nav>`;

    constructor() {}

    ngOnInit() {}
}
