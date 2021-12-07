import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformFormGeneratorModule, PlatformInputGroupModule } from '@fundamental-ngx/platform/form';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformSelectModule } from '@fundamental-ngx/platform/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ListModule } from '@fundamental-ngx/core/list';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { SmartFilterBarComponent } from './smart-filter-bar.component';

import { SmartFilterSettingsDialogComponent } from './components/smart-filter-settings-dialog/smart-filter-settings-dialog.component';
import { SmartFilterBarFieldDefinitionDirective } from './directives/smart-filter-bar-field-definition.directive';
import { SmartFilterBarSubjectDirective } from './directives/smart-filter-bar-subject.directive';

@NgModule({
    declarations: [
        SmartFilterBarComponent,
        SmartFilterSettingsDialogComponent,
        SmartFilterBarFieldDefinitionDirective,
        SmartFilterBarSubjectDirective
    ],
    imports: [
        CommonModule,
        PlatformFormGeneratorModule,
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
        PlatformSelectModule
    ],
    exports: [
        SmartFilterBarComponent,
        SmartFilterSettingsDialogComponent,
        SmartFilterBarFieldDefinitionDirective,
        SmartFilterBarSubjectDirective
    ]
})
export class PlatformSmartFilterBarModule {}
