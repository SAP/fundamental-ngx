import { Component } from '@angular/core';
import { ShellBar } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar';
import { ShellBarBranding } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-branding';
import { ShellBarItem } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-item';
import { ShellBarSearch } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-search';
import { ShellBarSpacer } from '@fundamental-ngx/ui5-webcomponents-fiori/shell-bar-spacer';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { ToggleButton } from '@fundamental-ngx/ui5-webcomponents/toggle-button';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

// Import required icons
import '@ui5/webcomponents-icons/dist/da.js';
import '@ui5/webcomponents-icons/dist/menu2.js';
import '@ui5/webcomponents-icons/dist/nav-back.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';

@Component({
    selector: 'ui5-doc-shellbar-all-features-sample',
    templateUrl: './all-features-sample.html',
    standalone: true,
    imports: [
        ShellBar,
        ShellBarBranding,
        ShellBarSpacer,
        ShellBarItem,
        ShellBarSearch,
        Avatar,
        Button,
        Tag,
        Text,
        ToggleButton,
        Switch,
        Label
    ]
})
export class AllFeaturesSample {}
