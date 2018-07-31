import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown-docs.component.html'
})
export class DropdownDocsComponent {
    textDropdownHtml = `<fd-popover [isDropdown]="true">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
      <fd-menu-group>
        <fd-menu-title>
          Group header
        </fd-menu-title>
        <fd-menu-list>
          <fd-menu-item [url]="'#'">
            Option 4
          </fd-menu-item>
          <fd-menu-item [url]="'#'">
            Option 5
          </fd-menu-item>
          <fd-menu-item [url]="'#'">
            Option 6
          </fd-menu-item>
        </fd-menu-list>
      </fd-menu-group>
    </fd-menu>
  </fd-popover-body>
</fd-popover>`;

    disabledDropdownHtml = `<fd-popover [isDropdown]="true" [disabled]="true">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>`;

    iconDropdownHtml = `<fd-popover [isDropdown]="true" [glyph]="'filter'">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>`;

    dropdownSizeHtml = `<fd-popover [isDropdown]="true" [size]="'xs'">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>

<fd-popover [isDropdown]="true" [size]="'s'">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>

<fd-popover [isDropdown]="true" [size]="'compact'">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>

<fd-popover [isDropdown]="true">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>

<fd-popover [isDropdown]="true" [size]="'l'">
  Dropdown
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>`;

    contextualMenuDropdownHtml = `<fd-popover>
  <fd-popover-control>
    <button fd-button [fdType]="'secondary'" [glyph]="'vertical-grip'"></button>
  </fd-popover-control>
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>

<fd-popover>
  <fd-popover-control>
    <button fd-button>More</button>
  </fd-popover-control>
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>

<fd-popover>
  <fd-popover-control>
    <button fd-button [fdType]="'secondary'">More</button>
  </fd-popover-control>
  <fd-popover-body>
    <fd-menu>
      <fd-menu-list>
        <fd-menu-item [url]="'#'">
          Option 1
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 2
        </fd-menu-item>
        <fd-menu-item [url]="'#'">
          Option 3
        </fd-menu-item>
      </fd-menu-list>
    </fd-menu>
  </fd-popover-body>
</fd-popover>`;

    constructor() {}
}
