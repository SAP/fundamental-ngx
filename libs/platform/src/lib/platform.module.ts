import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { ComponentButtonComponent } from './components/component-button/component-button.component';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    declarations: [ComponentButtonComponent],
    exports: [ComponentButtonComponent]
})
export class FundamentalNgxPlatformModule {}
