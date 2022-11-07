import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlatformConfig, PlatformPipeModule } from '@fundamental-ngx/platform/shared';
import { PlatformActionBarModule } from '@fundamental-ngx/platform/action-bar';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';
import { PlatformApprovalFlowModule } from '@fundamental-ngx/platform/approval-flow';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';
import { PlatformFeedInputModule } from '@fundamental-ngx/platform/feed-input';
import {
    FdpFormGroupModule,
    PlatformRadioGroupModule,
    PlatformCheckboxModule,
    PlatformTextAreaModule,
    PlatformCheckboxGroupModule,
    PlatformSwitchModule,
    PlatformInputModule,
    PlatformStepInputModule,
    PlatformInputGroupModule,
    PlatformMultiInputModule,
    PlatformFileUploaderModule,
    PlatformAutoCompleteModule,
    PlatformComboboxModule,
    PlatformSelectModule,
    PlatformDatetimePickerModule,
    PlatformTimePickerModule,
    PlatformDatePickerModule,
    PlatformFormGeneratorModule
} from '@fundamental-ngx/platform/form';
import { PlatformInfoLabelModule } from '@fundamental-ngx/platform/info-label';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformListModule } from '@fundamental-ngx/platform/list';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';
import { PlatformObjectAttributeModule } from '@fundamental-ngx/platform/object-attribute';
import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform/object-marker';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { PlatformPageFooterModule } from '@fundamental-ngx/platform/page-footer';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';
import { PlatformSplitMenuButtonModule } from '@fundamental-ngx/platform/split-menu-button';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { PlatformThumbnailModule } from '@fundamental-ngx/platform/thumbnail';
import { PlatformUploadCollectionModule } from '@fundamental-ngx/platform/upload-collection';
import { PlatformValueHelpDialogModule } from '@fundamental-ngx/platform/value-help-dialog';
import { PlatformWizardGeneratorModule } from '@fundamental-ngx/platform/wizard-generator';
import { PlatformIconTabBarModule } from '@fundamental-ngx/platform/icon-tab-bar';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform/message-popover';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        PlatformPipeModule,
        PlatformActionBarModule,
        PlatformActionButtonGroupModule,
        PlatformApprovalFlowModule,
        PlatformButtonModule,
        PlatformDynamicPageModule,
        PlatformFeedInputModule,
        PlatformInfoLabelModule,
        PlatformLinkModule,
        PlatformListModule,
        PlatformMenuModule,
        PlatformMenuButtonModule,
        PlatformObjectAttributeModule,
        PlatformObjectMarkerModule,
        PlatformObjectStatusModule,
        PlatformPageFooterModule,
        PlatformPanelModule,
        PlatformSearchFieldModule,
        PlatformSliderModule,
        PlatformSplitMenuButtonModule,
        PlatformTableModule,
        PlatformThumbnailModule,
        PlatformUploadCollectionModule,
        PlatformValueHelpDialogModule,
        PlatformWizardGeneratorModule,

        FdpFormGroupModule,
        PlatformRadioGroupModule,
        PlatformCheckboxModule,
        PlatformTextAreaModule,
        PlatformCheckboxGroupModule,
        PlatformSwitchModule,
        PlatformInputModule,
        PlatformStepInputModule,
        PlatformInputGroupModule,
        PlatformMultiInputModule,
        PlatformFileUploaderModule,
        PlatformAutoCompleteModule,
        PlatformComboboxModule,
        PlatformSelectModule,
        PlatformDatetimePickerModule,
        PlatformTimePickerModule,
        PlatformDatePickerModule,
        PlatformFormGeneratorModule,
        PlatformIconTabBarModule,
        PlatformSmartFilterBarModule,
        PlatformMessagePopoverModule
    ],
    providers: []
})
export class FundamentalNgxPlatformModule {
    /** @hidden */
    constructor(injector: Injector) {
        PlatformConfig.setInjector(injector);
    }
}
