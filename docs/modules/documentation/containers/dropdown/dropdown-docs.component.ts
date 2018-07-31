import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown-docs.component.html'
})
export class DropdownDocsComponent {
    textDropdownHtml =
        '<fd-popover [isDropdown]="true">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '      <fd-menu-group>\n' +
        '        <fd-menu-title>\n' +
        '          Group header\n' +
        '        </fd-menu-title>\n' +
        '        <fd-menu-list>\n' +
        '          <fd-menu-item [url]="\'#\'">\n' +
        '            Option 4\n' +
        '          </fd-menu-item>\n' +
        '          <fd-menu-item [url]="\'#\'">\n' +
        '            Option 5\n' +
        '          </fd-menu-item>\n' +
        '          <fd-menu-item [url]="\'#\'">\n' +
        '            Option 6\n' +
        '          </fd-menu-item>\n' +
        '        </fd-menu-list>\n' +
        '      </fd-menu-group>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>';

    disabledDropdownHtml =
        '<fd-popover [isDropdown]="true" [disabled]="true">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>';

    iconDropdownHtml =
        '<fd-popover [isDropdown]="true" [glyph]="\'filter\'">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>';

    dropdownSizeHtml =
        '<fd-popover [isDropdown]="true" [size]="\'xs\'">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>\n' +
        '\n' +
        '<fd-popover [isDropdown]="true" [size]="\'s\'">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>\n' +
        '\n' +
        '<fd-popover [isDropdown]="true" [size]="\'compact\'">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>\n' +
        '\n' +
        '<fd-popover [isDropdown]="true">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>\n' +
        '\n' +
        '<fd-popover [isDropdown]="true" [size]="\'l\'">\n' +
        '  Dropdown\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>';

    contextualMenuDropdownHtml =
        '<fd-popover>\n' +
        '  <fd-popover-control>\n' +
        '    <button fd-button [type]="\'secondary\'" [glyph]="\'vertical-grip\'"></button>\n' +
        '  </fd-popover-control>\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>\n' +
        '\n' +
        '<fd-popover>\n' +
        '  <fd-popover-control>\n' +
        '    <button fd-button>More</button>\n' +
        '  </fd-popover-control>\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>\n' +
        '\n' +
        '<fd-popover>\n' +
        '  <fd-popover-control>\n' +
        '    <button fd-button [type]="\'secondary\'">More</button>\n' +
        '  </fd-popover-control>\n' +
        '  <fd-popover-body>\n' +
        '    <fd-menu>\n' +
        '      <fd-menu-list>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 1\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 2\n' +
        '        </fd-menu-item>\n' +
        '        <fd-menu-item [url]="\'#\'">\n' +
        '          Option 3\n' +
        '        </fd-menu-item>\n' +
        '      </fd-menu-list>\n' +
        '    </fd-menu>\n' +
        '  </fd-popover-body>\n' +
        '</fd-popover>';

    constructor() {}
}
