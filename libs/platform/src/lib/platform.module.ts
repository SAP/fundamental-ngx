import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    declarations: [ButtonComponent]
})
export class FundamentalNgxPlatformModule {}
