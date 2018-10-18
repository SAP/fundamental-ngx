import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar-docs.component.html'
})
export class NavbarDocsComponent {
    navbarHtml = `<fd-navbar>
  <div fd-navbar-group [position]="'left'">
    <div class="fd-global-nav__side-menu">
      <button fd-button [fdType]="'secondary'" [size]="'l'" [glyph]="'menu2'" aria-label="BUTTON_LABEL"></button>
    </div>
    <div class="fd-global-nav__logo fd-has-margin-left-none"></div>
    <div class="fd-global-nav__product-name">
      Product Name
    </div>
  </div>

  <div fd-navbar-group [hasLaunchpad]="true">
    <button fd-button [fdType]="'secondary'" [size]="'l'" aria-label="BUTTON_LABEL" [attr.aria-haspopup]="true">Suite
      Name</button>
  </div>

  <div fd-navbar-group [position]="'right'">
    <div fd-navbar-context-menu>
      <fd-popover [isDropdown]="true" [btnType]="'secondary'">
        Context Switcher
        <fd-popover-body>
          <fd-menu>
            <fd-menu-list>
              <fd-menu-item>Option 1</fd-menu-item>
              <fd-menu-item>Option 2</fd-menu-item>
              <fd-menu-item>Option 3</fd-menu-item>
            </fd-menu-list>
          </fd-menu>
        </fd-popover-body>
      </fd-popover>
    </div>

    <div fd-navbar-actions>
      <button fd-button [fdType]="'secondary'" [size]="'l'" [glyph]="'search'" aria-label="BUTTON_LABEL"></button>
      <button fd-button [fdType]="'secondary'" [size]="'l'" [glyph]="'action-settings'" aria-label="BUTTON_LABEL"></button>
      <span fd-identifier [size]="'s'" [circle]="true">WW</span>
    </div>
  </div>
</fd-navbar>`;
}
