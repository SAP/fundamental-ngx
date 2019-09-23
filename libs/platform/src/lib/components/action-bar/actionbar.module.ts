import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarHeaderComponent } from './action-bar-header/action-bar-header.component';
import { FormsModule } from '@angular/forms';
import { ActionBarActionsComponent } from './action-bar-actions/action-bar-actions.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';



@NgModule({
  declarations: [ActionBarHeaderComponent,
    ActionBarActionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FundamentalNgxCoreModule
  ],
  exports: [
    ActionBarHeaderComponent,
    ActionBarActionsComponent,

  ]
})
export class ActionBarModule { }
