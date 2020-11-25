import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  TokenModule,
  ButtonModule,
  TabsModule,
  DialogModule,
  FormModule,
  CheckboxModule,
  LayoutGridModule,
  ToolbarModule,
  TableModule,
  PipeModule,
  IconModule,
  ListModule,
  LinkModule,
  BarModule
} from '@fundamental-ngx/core';

import { PlatformValueHelpDialogComponent } from './value-help-dialog/value-help-dialog.component';
import { PlatformVhdFilterComponent } from './components/value-help-dialog-filter/value-help-dialog-filter.component';
import { SelectTabSettingsComponent } from './components/select-tab-settings/select-tab-settings.component';
import { DefineTabSettingsComponent } from './components/define-tab-settings/define-tab-settings.component';

@NgModule({
  declarations: [
    PlatformValueHelpDialogComponent,
    PlatformVhdFilterComponent,
    SelectTabSettingsComponent,
    DefineTabSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    DialogModule,
    TabsModule,
    ButtonModule,
    TokenModule,
    FormModule,
    LayoutGridModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    PipeModule,
    IconModule,
    ListModule,
    BarModule,
    LinkModule
  ],
  exports: [
    PlatformValueHelpDialogComponent,
    PlatformVhdFilterComponent,
    SelectTabSettingsComponent,
    DefineTabSettingsComponent,
  ]
})
export class PlatformValueHelpDialogModule { }
