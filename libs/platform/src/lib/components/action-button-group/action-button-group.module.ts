import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonGroupComponent } from './action-button-group.component';
import { ActionBarModule } from '@fundamental-ngx/core';
@NgModule({
    declarations: [ActionButtonGroupComponent],
    imports: [CommonModule, ActionBarModule],
    exports: [ActionButtonGroupComponent]
})
export class PlatformActionButtonGroupModule { }
