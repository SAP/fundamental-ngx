import { Component } from '@angular/core';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { ShellBarItem } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-item';
import { ShellBarSearch } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-search';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ToggleButton } from '@fundamental-ngx/ui5-webcomponents/toggle-button';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

// Import required icons
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/product.js';

@Component({
    selector: 'ui5-doc-shellbar-embedded-back-navigation-sample',
    templateUrl: './embedded-back-navigation-sample.html',
    standalone: true,
    imports: [ShellBar, Avatar, ShellBarBranding, ShellBarItem, ShellBarSearch, Button, ToggleButton]
})
export class EmbeddedBackNavigationSample {}
