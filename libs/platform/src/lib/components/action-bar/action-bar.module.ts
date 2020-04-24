import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { FormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [ActionBarComponent],
    imports: [CommonModule, FormsModule, FundamentalNgxCoreModule],
    exports: [ActionBarComponent]
})
export class PlatformActionBarModule {}
