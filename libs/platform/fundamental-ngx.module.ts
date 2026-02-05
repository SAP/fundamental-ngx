import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatformApprovalFlowModule } from '@fundamental-ngx/platform/approval-flow';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';
import { PlatformFeedInputModule } from '@fundamental-ngx/platform/feed-input';
import {
    FdpFormGroupModule,
    PlatformAutoCompleteModule,
    PlatformCheckboxGroupModule,
    PlatformCheckboxModule,
    PlatformComboboxModule,
    PlatformDatePickerModule,
    PlatformDatetimePickerModule,
    PlatformFormGeneratorModule,
    PlatformInputGroupModule,
    PlatformInputModule,
    PlatformMultiComboboxModule,
    PlatformMultiInputModule,
    PlatformRadioGroupModule,
    PlatformSelectModule,
    PlatformStepInputModule,
    PlatformSwitchModule,
    PlatformTextAreaModule,
    PlatformTimePickerModule
} from '@fundamental-ngx/platform/form';
import { PlatformIconTabBarModule } from '@fundamental-ngx/platform/icon-tab-bar';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformListModule } from '@fundamental-ngx/platform/list';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform/message-popover';
import { PlatformObjectAttributeModule } from '@fundamental-ngx/platform/object-attribute';
import { PlatformObjectMarkerModule } from '@fundamental-ngx/platform/object-marker';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { PlatformPageFooterModule } from '@fundamental-ngx/platform/page-footer';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { SettingsGeneratorModule } from '@fundamental-ngx/platform/settings-generator';
import { PlatformConfig, PlatformPipeModule } from '@fundamental-ngx/platform/shared';
import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import { PlatformSplitMenuButtonModule } from '@fundamental-ngx/platform/split-menu-button';
import { PlatformTableModule, TableHelpersModule } from '@fundamental-ngx/platform/table';
import { PlatformValueHelpDialogModule } from '@fundamental-ngx/platform/value-help-dialog';
import { VariantManagementModule } from '@fundamental-ngx/platform/variant-management';
import { PlatformWizardGeneratorModule } from '@fundamental-ngx/platform/wizard-generator';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [FormsModule],
    exports: [
        PlatformPipeModule,
        PlatformApprovalFlowModule,
        PlatformButtonModule,
        PlatformDynamicPageModule,
        PlatformFeedInputModule,
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
        PlatformAutoCompleteModule,
        PlatformComboboxModule,
        PlatformSelectModule,
        PlatformDatetimePickerModule,
        PlatformTimePickerModule,
        PlatformDatePickerModule,
        PlatformFormGeneratorModule,
        PlatformMultiComboboxModule,
        PlatformIconTabBarModule,
        PlatformSmartFilterBarModule,
        PlatformMessagePopoverModule,
        VariantManagementModule,
        SettingsGeneratorModule,
        TableHelpersModule
    ],
    providers: []
})
export class FundamentalNgxPlatformModule {
    /** @hidden */
    constructor(injector: Injector) {
        PlatformConfig.setInjector(injector);
    }
}
