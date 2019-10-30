import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from './components/button/button.module';
import { PlatformSearchInputModule } from './components/search-input/search-input.module';
import { ActionBarModule } from './components/action-bar/action-bar.module';
import { FdpMenuModule } from './components/menu/menu.module';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [PlatformButtonModule, PlatformSearchInputModule, ActionBarModule, FdpMenuModule]
})
export class FundamentalNgxPlatformModule {}
