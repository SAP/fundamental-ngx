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
import { PlatformCheckboxGroupModule } from './components/form/checkbox-group/checkbox-group.module';
import { PlatformPanelModule } from './components/panel/panel.module';
import { PlatformSwitchModule } from './components/form/switch/switch.module';
import { PlatformObjectStatusModule } from './components/object-status/object-status.module';
import { PlatformInputModule, PlatformStepInputModule, PlatformInputGroupModule } from './components/form/public_api';
import { PlatformComboboxMobileModule } from './components/form/combobox/combobox-mobile/combobox-mobile.module';
import { PlatformComboboxModule } from './components/form/combobox';
import { PlatformThumbnailModule } from './components/thumbnail/public_api';
import { PlatformObjectMarkerModule } from './components/object-marker/object-marker.module';
import { PlatformObjectAttributeModule } from './components/object-attribute/object-attribute.module';
import { PlatformTableModule } from './components/table/table.module';
import { PlatformDatetimePickerModule } from './components/form/datetime-picker/datetime-picker.module';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [
        FdpFormGroupModule,
        PlatformButtonModule,
        PlatformCheckboxModule,
        PlatformCheckboxGroupModule,
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
        PlatformPanelModule,
        PlatformSwitchModule,
        PlatformTextAreaModule,
        PlatformObjectStatusModule,
        PlatformInputModule,
        PlatformStepInputModule,
        PlatformInputGroupModule,
        PlatformComboboxModule,
        PlatformComboboxMobileModule,
        PlatformThumbnailModule,
        PlatformObjectMarkerModule,
        PlatformObjectAttributeModule,
        PlatformTableModule,
        PlatformDatetimePickerModule
    ]
})
export class FundamentalNgxPlatformModule {}
