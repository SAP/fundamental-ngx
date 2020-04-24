import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonGroupComponent } from './action-button-group.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
@NgModule({
    declarations: [ActionButtonGroupComponent],
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [ActionButtonGroupComponent]
})
export class PlatformActionButtonGroupModule {}
