import { NgModule } from '@angular/core';

import { SmartFilterBarComponent } from './smart-filter-bar.component';

import { SmartFilterBarConditionFieldComponent } from './components/smart-filter-bar-condition-field/smart-filter-bar-condition-field.component';
import { SmartFilterBarConditionsDialogComponent } from './components/smart-filter-bar-conditions-dialog/smart-filter-bar-conditions-dialog.component';
import { SmartFilterBarSettingsDialogComponent } from './components/smart-filter-bar-settings-dialog/smart-filter-bar-settings-dialog.component';
import { SmartFilterBarFieldDefinitionDirective } from './directives/smart-filter-bar-field-definition.directive';
import { SmartFilterBarSubjectDirective } from './directives/smart-filter-bar-subject.directive';
import { SmartFilterBarToolbarItemDirective } from './directives/smart-filter-bar-toolbar-item.directive';

const components = [
    SmartFilterBarComponent,
    SmartFilterBarSettingsDialogComponent,
    SmartFilterBarFieldDefinitionDirective,
    SmartFilterBarSubjectDirective,
    SmartFilterBarConditionsDialogComponent,
    SmartFilterBarConditionFieldComponent,
    SmartFilterBarToolbarItemDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformSmartFilterBarModule {}
