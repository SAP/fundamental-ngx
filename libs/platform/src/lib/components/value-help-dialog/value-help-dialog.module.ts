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
  BarModule,
  SelectModule,
  PanelModule,
  InputGroupModule,
  PopoverModule,
  InfiniteScrollModule
} from '@fundamental-ngx/core';

import { PlatformValueHelpDialogComponent } from './value-help-dialog/value-help-dialog.component';
import { VhdFilterComponent } from './components/value-help-dialog-filter/value-help-dialog-filter.component';
import { VhdSearchComponent } from './components/value-help-dialog-search/value-help-dialog-search.component';
import { VhdBaseTab } from './components/base-tab/vhd-base-tab.component';
import { SelectTabComponent } from './components/select-tab/select-tab.component';
import { DefineTabComponent } from './components/define-tab/define-tab.component';
import { ConditionCountMessageDirective } from './directives/condition-count-message.directive';

@NgModule({
  declarations: [
    PlatformValueHelpDialogComponent,
    VhdFilterComponent,
    VhdSearchComponent,
    VhdBaseTab,
    SelectTabComponent,
    DefineTabComponent,
    ConditionCountMessageDirective,
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
    LinkModule,
    SelectModule,
    PanelModule,
    InputGroupModule,
    PopoverModule,
    InfiniteScrollModule
  ],
  exports: [
    PlatformValueHelpDialogComponent,
    VhdFilterComponent,
    VhdSearchComponent,
  ]
})
export class PlatformValueHelpDialogModule { }
