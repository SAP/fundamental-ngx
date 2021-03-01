import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

import { FdpFormGroupModule } from './components/form/form-group/fdp-form.module';
import { PlatformButtonModule } from './components/button/button.module';
import { PlatformSearchFieldModule } from './components/search-field/search-field.module';
import { PlatformActionBarModule } from './components/action-bar/action-bar.module';
import { PlatformActionButtonGroupModule } from './components/action-button-group/action-button-group.module';
import { PlatformMenuModule } from './components/menu/menu.module';
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
import {
    PlatformInputModule,
    PlatformStepInputModule,
    PlatformInputGroupModule,
    PlatformMultiInputModule,
    PlatformFileUploaderModule,
    PlatformAutoCompleteModule,
    PlatformSelectModule
} from './components/form/public_api';
import { PlatformComboboxMobileModule } from './components/form/combobox/combobox-mobile/combobox-mobile.module';
import { PlatformComboboxModule } from './components/form/combobox';
import { PlatformThumbnailModule } from './components/thumbnail/public_api';
import { PlatformObjectMarkerModule } from './components/object-marker/object-marker.module';
import { PlatformObjectAttributeModule } from './components/object-attribute/object-attribute.module';
import { PlatformTableModule } from './components/table/table.module';
import { PlatformDatetimePickerModule } from './components/form/datetime-picker/datetime-picker.module';
import { PlatformTimePickerModule } from './components/form/time-picker/time-picker.module';
import { PlatformMultiInputMobileModule } from './components/form/multi-input/multi-input-mobile/multi-input-mobile.module';
import { PlatformFeedInputModule } from './components/feed-input/feed-input.module';
import { PlatformDatePickerModule } from './components/form/date-picker/date-picker.module';
import { PlatformApprovalFlowModule } from './components/approval-flow/approval-flow.module';
import { PlatformDynamicPageModule } from './components/dynamic-page/dynamic-page.module';
import { PlatformUploadCollectionModule } from './components/upload-collection';
import { PlatformValueHelpDialogModule } from './components/value-help-dialog/value-help-dialog.module';
import { ActionListItemModule, DisplayListItemModule, ObjectListItemModule, PlatformListModule, StandardListItemModule } from './components/list/public_api';
import { PlatformSliderModule } from './components/slider';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [
        FdpFormGroupModule,
        PlatformButtonModule,
        PlatformCheckboxModule,
        PlatformCheckboxGroupModule,
        PlatformDatePickerModule,
        PlatformDynamicPageModule,
        PlatformSearchFieldModule,
        PlatformActionBarModule,
        PlatformActionButtonGroupModule,
        PlatformMenuModule,
        PlatformSelectModule,
        PlatformLinkModule,
        PlatformListModule,
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
        PlatformDatetimePickerModule,
        PlatformTimePickerModule,
        PlatformMultiInputModule,
        PlatformMultiInputModule,
        PlatformMultiInputMobileModule,
        PlatformFeedInputModule,
        PlatformFileUploaderModule,
        PlatformUploadCollectionModule,
        PlatformValueHelpDialogModule,
        PlatformAutoCompleteModule,
        PlatformApprovalFlowModule,
        PlatformValueHelpDialogModule,
        ActionListItemModule,
        DisplayListItemModule,
        ObjectListItemModule,
        PlatformListModule,
        StandardListItemModule,
        PlatformSliderModule
    ]
})
export class FundamentalNgxPlatformModule {}
