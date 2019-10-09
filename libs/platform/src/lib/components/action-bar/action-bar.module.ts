import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { FormsModule } from '@angular/forms';
import { ActionBarActionsComponent } from './action-bar-actions/action-bar-actions.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [ActionBarComponent, ActionBarActionsComponent],
    imports: [CommonModule, FormsModule, FundamentalNgxCoreModule],
    exports: [ActionBarComponent, ActionBarActionsComponent]
})
export class ActionBarModule {}
