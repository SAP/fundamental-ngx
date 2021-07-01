import { Injector, NgModule } from '@angular/core';
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
import { PlatformInputModule } from './components/form/input/fdp-input.module';
import { PlatformStepInputModule } from './components/form/step-input/step-input.module';
import { PlatformInputGroupModule } from './components/form/input-group/input-group.module';
import { PlatformMultiInputModule } from './components/form/multi-input/multi-input.module';
import { PlatformFileUploaderModule } from './components/form/platform-file-uploader/platform-file-uploader.module';
import { PlatformAutoCompleteModule } from './components/form/auto-complete/auto-complete.module';
import { PlatformComboboxMobileModule } from './components/form/combobox/combobox-mobile/combobox-mobile.module';
import { PlatformComboboxModule } from './components/form/combobox/combobox.module';
import { PlatformSelectModule } from './components/form/select/select.module';
import { PlatformThumbnailModule } from './components/thumbnail/thumbnail.module';
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
import { PlatformUploadCollectionModule } from './components/upload-collection/upload-collection.module';
import { PlatformValueHelpDialogModule } from './components/value-help-dialog/value-help-dialog.module';
import { ActionListItemModule } from './components/list/action-list-item/action-list-item.module';
import { DisplayListItemModule } from './components/list/display-list-item/display-list-item.module';
import { ObjectListItemModule } from './components/list/object-list-item/object-list-item.module';
import { StandardListItemModule } from './components/list/standard-list-item/standard-list-item.module';
import { PlatformListModule } from './components/list/list.module';
import { PlatformSliderModule } from './components/slider/slider.module';
import { PlatformConfig } from './platform.config';
import { PlatformPageFooterModule } from './components/page-footer/page-footer.module';
import { PlatformFormGeneratorModule } from './components/form/form-generator/fdp-form-generator.module';

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
        PlatformSliderModule,
        PlatformPageFooterModule,
        PlatformFormGeneratorModule
    ],
    declarations: []
})
export class FundamentalNgxPlatformModule {
    constructor(injector: Injector) {
        PlatformConfig.setInjector(injector);
    }
}
