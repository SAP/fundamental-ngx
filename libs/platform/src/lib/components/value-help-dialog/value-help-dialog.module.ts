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
  ListModule
} from '@fundamental-ngx/core';

import { PlatformValueHelpDialogComponent } from './value-help-dialog/value-help-dialog.component';
import { PlatformVhdFilterComponent } from './components/value-help-dialog-filter/value-help-dialog-filter.component';

@NgModule({
  declarations: [
    PlatformValueHelpDialogComponent,
    PlatformVhdFilterComponent,
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
    ListModule
  ],
  exports: [
    PlatformValueHelpDialogComponent,
    PlatformVhdFilterComponent
  ]
})
export class PlatformValueHelpDialogModule { }
