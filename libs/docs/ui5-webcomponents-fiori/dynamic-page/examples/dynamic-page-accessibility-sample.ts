import { Component } from '@angular/core';
import { Breadcrumbs, Label, ListItemStandard } from '@fundamental-ngx/ui5-webcomponents';
import { DynamicPageHeader } from '@fundamental-ngx/ui5-webcomponents-fiori';
import { DynamicPage } from '@fundamental-ngx/ui5-webcomponents-fiori/dynamic-page';
import { DynamicPageTitle } from '@fundamental-ngx/ui5-webcomponents-fiori/dynamic-page-title';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { BreadcrumbsItem } from '@fundamental-ngx/ui5-webcomponents/breadcrumbs-item';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';

import '@ui5/webcomponents-icons/dist/AllIcons.js';

import '@fundamental-styles/common-css/dist/sap-flex.css';
import '@fundamental-styles/common-css/dist/sap-margin.css';
import '@fundamental-styles/common-css/dist/sap-title.css';
import 'fundamental-styles/dist/section.css';
import 'fundamental-styles/dist/title.css';

@Component({
    selector: 'ui5-dynamic-page-accessibility-sample',
    templateUrl: './dynamic-page-accessibility-sample.html',
    standalone: true,
    imports: [
        Avatar,
        DynamicPage,
        DynamicPageHeader,
        DynamicPageTitle,
        Bar,
        Breadcrumbs,
        BreadcrumbsItem,
        Button,
        Label,
        List,
        ListItemStandard,
        Title,
        Toolbar,
        ToolbarButton,
        Text
    ]
})
export class DynamicPageAccessibilitySample {
    accessibilityAttrs = {
        root: {
            role: 'region' as const,
            name: 'Product Details Page'
        },
        header: {
            role: 'region' as const,
            name: 'Product Header Information'
        },
        content: {
            role: 'region' as const,
            name: 'Product Catalog'
        },
        footer: {
            role: 'region' as const,
            name: 'Page Actions'
        }
    };
}
