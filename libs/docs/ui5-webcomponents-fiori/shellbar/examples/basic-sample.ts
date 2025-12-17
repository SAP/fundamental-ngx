import { Component, signal } from '@angular/core';
import { Button, ToggleButton } from '@fundamental-ngx/ui5-webcomponents';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { ShellBarItem } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-item';
import { ShellBarSearch } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-search';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

// Import required icons
import '@ui5/webcomponents-icons/dist/customer.js';

@Component({
    selector: 'ui5-doc-shellbar-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ShellBar, Avatar, Button, ShellBarBranding, ShellBarSearch, ShellBarItem, ToggleButton]
})
export class BasicSample {
    primaryTitle = signal('Corporate Portal');
    secondaryTitle = signal('Secondary Title');
}
