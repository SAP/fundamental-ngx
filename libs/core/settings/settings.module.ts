import { NgModule } from '@angular/core';

import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { SettingsContentDirective } from './settings-content/settings-content.directive';
import { SettingsDetailAreaDirective } from './settings-detail-area/settings-detail-area.directive';
import { SettingsDialogBodyDirective } from './settings-dialog-body/settings-dialog-body.directive';
import { SettingsDialogContentDirective } from './settings-dialog-content/settings-dialog-content.directive';
import { SettingsHeaderButtonDirective } from './settings-header-button/settings-header-button.directive';
import { SettingsHeaderDirective } from './settings-header/settings-header.directive';
import { SettingsListAreaDirective } from './settings-list-area/settings-list-area.directive';
import { SettingsListContainerDirective } from './settings-list-container/settings-list-container.directive';
import { SettingsComponent } from './settings.component';

const components = [
    SettingsListAreaDirective,
    SettingsDetailAreaDirective,
    SettingsListContainerDirective,
    SettingsContentDirective,
    SettingsHeaderDirective,
    SettingsHeaderButtonDirective,
    SettingsDialogContentDirective,
    SettingsDialogBodyDirective,
    SettingsContainerComponent,
    SettingsComponent
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class SettingsModule {}
