import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { FormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { ActionBarActionsComponent } from './action-bar-actions/action-bar-actions.component';
@NgModule({
    declarations: [ActionBarComponent, ActionBarActionsComponent],
    imports: [CommonModule, FormsModule, FundamentalNgxCoreModule],
    exports: [ActionBarComponent, ActionBarActionsComponent]
})
export class ActionBarModule {}
