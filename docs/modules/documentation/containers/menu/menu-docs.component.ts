import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-docs.component.html'
})
export class MenuDocsComponent implements OnInit {
    menuHtml = `<fd-menu>
  <fd-menu-list>
    <fd-menu-item>
      <a [attr.href]="'#'">Option 1</a>
    </fd-menu-item>
    <fd-menu-item>
      <a [routerLink]="'#'">Option 2</a>
    </fd-menu-item>
    <fd-menu-item>
      Option 3
    </fd-menu-item>
  </fd-menu-list>
</fd-menu>`;

    menuGroupHtml = `<fd-menu>
  <fd-menu-list>
    <fd-menu-item>
      <a [attr.href]="'#'">Option 1</a>
    </fd-menu-item>
    <fd-menu-item>
      <a [routerLink]="'#'">Option 2</a>
    </fd-menu-item>
    <fd-menu-item>
      Option 3
    </fd-menu-item>
  </fd-menu-list>
  <fd-menu-group>
    <fd-menu-title>
      Group header
    </fd-menu-title>
    <fd-menu-list>
      <fd-menu-item>
        <a [attr.href]="'#'">Option 4</a>
      </fd-menu-item>
      <fd-menu-item>
        <a [routerLink]="'#'">Option 5</a>
      </fd-menu-item>
      <fd-menu-item>
        Option 6
      </fd-menu-item>
    </fd-menu-list>
  </fd-menu-group>
</fd-menu>`;

    constructor() {}

    ngOnInit() {}
}
