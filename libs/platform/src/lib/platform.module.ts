import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FdpFormGroupModule } from './components/form/form-group/fdp-form.module';
import { PlatformButtonModule } from './components/button/button.module';
import { PlatformSearchFieldModule } from './components/search-field/search-field.module';
import { PlatformActionBarModule } from './components/action-bar/action-bar.module';
import { PlatformActionButtonGroupModule } from './components/action-button-group/action-button-group.module';
import { PlatformMenuModule } from './components/menu/menu.module';
import { PlatformSelectModule } from './components/select/select.module';
import { PlatformLinkModule } from './components/link/link.module';
import { PlatformRadioGroupModule } from './components/form/radio-group/radio-group.module';
import { PlatformMenuButtonModule } from './components/menu-button/menu-button.module';
import { PlatformSplitMenuButtonModule } from './components/split-menu-button/split-menu-button.module';
import { PlatformInfoLabelModule } from './components/info-label/info-label.module';
import { PlatformCheckboxModule } from './components/form/checkbox/checkbox.module';
import { PlatformTextAreaModule } from './components/form/text-area/text-area.module';
import { PlatformPanelModule } from './components/panel/panel.module';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [
        FdpFormGroupModule,
        PlatformButtonModule,
        PlatformCheckboxModule,
        PlatformSearchFieldModule,
        PlatformActionBarModule,
        PlatformActionButtonGroupModule,
        PlatformMenuModule,
        PlatformSelectModule,
        PlatformLinkModule,
        PlatformRadioGroupModule,
        PlatformMenuButtonModule,
        PlatformSplitMenuButtonModule,
        PlatformInfoLabelModule,
        PlatformTextAreaModule,
        PlatformPanelModule
    ]
})
export class FundamentalNgxPlatformModule {}
