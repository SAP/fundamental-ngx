import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar-docs.component.html'
})
export class NavbarDocsComponent {
    navbarHtml =
        '<fd-navbar>\n' +
        '  <div fd-navbar-group [position]="\'left\'">\n' +
        '    <div class="fd-global-nav__side-menu">\n' +
        '      <button fd-button [fdType]="\'secondary\'" [size]="\'l\'" [glyph]="\'menu2\'" aria-label="BUTTON_LABEL"></button>\n' +
        '    </div>\n' +
        '    <div class="fd-global-nav__logo fd-has-margin-left-none"></div>\n' +
        '    <div class="fd-global-nav__product-name">\n' +
        '      Product Name\n' +
        '    </div>\n' +
        '  </div>\n' +
        '\n' +
        '  <div fd-navbar-group [hasLaunchpad]="true">\n' +
        '    <button fd-button [fdType]="\'secondary\'" [size]="\'l\'" aria-label="BUTTON_LABEL" [attr.aria-haspopup]="true"\n' +
        '            [attr.aria-controls]="launchpad">Suite Name</button>\n' +
        '  </div>\n' +
        '\n' +
        '  <div fd-navbar-group [position]="\'right\'">\n' +
        '    <div fd-navbar-context-menu>\n' +
        '      <fd-popover [isDropdown]="true" [btnType]="\'secondary\'">\n' +
        '        Context Switcher\n' +
        '        <fd-popover-body>\n' +
        '          <fd-menu>\n' +
        '            <fd-menu-list>\n' +
        '              <fd-menu-item [url]="\'#\'">Option 1</fd-menu-item>\n' +
        '              <fd-menu-item [url]="\'#\'">Option 2</fd-menu-item>\n' +
        '              <fd-menu-item [url]="\'#\'">Option 3</fd-menu-item>\n' +
        '            </fd-menu-list>\n' +
        '          </fd-menu>\n' +
        '        </fd-popover-body>\n' +
        '      </fd-popover>\n' +
        '    </div>\n' +
        '\n' +
        '    <div fd-navbar-actions>\n' +
        '          <button fd-button [fdType]="\'secondary\'" [size]="\'l\'" [glyph]="\'search\'" aria-label="BUTTON_LABEL"></button>\n' +
        '          <button fd-button [fdType]="\'secondary\'" [size]="\'l\'" [glyph]="\'action-settings\'" aria-label="BUTTON_LABEL"></button>\n' +
        '      <span fd-identifier [size]="\'s\'" [circle]="true">WW</span>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</fd-navbar>';
}
