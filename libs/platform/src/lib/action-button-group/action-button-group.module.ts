import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ActionButtonGroupComponent } from './action-button-group.component';

@NgModule({
    declarations: [ActionButtonGroupComponent],
    imports: [CommonModule, ActionBarModule],
    exports: [ActionButtonGroupComponent]
})
export class PlatformActionButtonGroupModule {}
