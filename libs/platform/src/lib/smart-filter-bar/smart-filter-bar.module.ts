import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import {
    PlatformFormGeneratorModule,
    PlatformInputGroupModule,
    PlatformMultiInputModule,
    FdpFormGroupModule,
    FormGeneratorService
} from '@fundamental-ngx/platform/form';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformSelectModule } from '@fundamental-ngx/platform/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ListModule } from '@fundamental-ngx/core/list';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';

import { SmartFilterBarComponent } from './smart-filter-bar.component';

import { SmartFilterBarSettingsDialogComponent } from './components/smart-filter-bar-settings-dialog/smart-filter-bar-settings-dialog.component';
import { SmartFilterBarFieldDefinitionDirective } from './directives/smart-filter-bar-field-definition.directive';
import { SmartFilterBarSubjectDirective } from './directives/smart-filter-bar-subject.directive';
import { SmartFilterBarConditionsDialogComponent } from './components/smart-filter-bar-conditions-dialog/smart-filter-bar-conditions-dialog.component';
import { SmartFilterBarConditionFieldComponent } from './components/smart-filter-bar-condition-field/smart-filter-bar-condition-field.component';
import { SmartFilterBarService } from './smart-filter-bar.service';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [
        SmartFilterBarComponent,
        SmartFilterBarSettingsDialogComponent,
        SmartFilterBarFieldDefinitionDirective,
        SmartFilterBarSubjectDirective,
        SmartFilterBarConditionsDialogComponent,
        SmartFilterBarConditionFieldComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformFormGeneratorModule,
        I18nModule,
        ButtonModule,
        PopoverModule,
        ToolbarModule,
        PlatformButtonModule,
        PlatformInputGroupModule,
        IconModule,
        PlatformSearchFieldModule,
        DialogModule,
        ListModule,
        CheckboxModule,
        PlatformTableModule,
        PlatformSelectModule,
        PlatformMultiInputModule,
        FdpFormGroupModule,
        LayoutGridModule
    ],
    exports: [
        SmartFilterBarComponent,
        SmartFilterBarSettingsDialogComponent,
        SmartFilterBarFieldDefinitionDirective,
        SmartFilterBarSubjectDirective,
        SmartFilterBarConditionsDialogComponent,
        SmartFilterBarConditionFieldComponent
    ],
    providers: [SmartFilterBarService, FormGeneratorService]
})
export class PlatformSmartFilterBarModule {}
