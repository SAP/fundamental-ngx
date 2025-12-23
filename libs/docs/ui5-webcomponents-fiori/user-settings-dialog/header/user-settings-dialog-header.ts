import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-user-settings-dialog-header',
    templateUrl: './user-settings-dialog-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class UserSettingsDialogHeader {
    componentName = 'UserSettingsDialog';
    packageName = '@ui5/webcomponents-fiori';
}
