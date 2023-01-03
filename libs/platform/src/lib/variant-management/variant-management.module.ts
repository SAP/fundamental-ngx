import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TitleModule } from '@fundamental-ngx/core/title';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import {
    FdpFormGroupModule,
    PlatformCheckboxGroupModule,
    PlatformCheckboxModule,
    PlatformInputModule
} from '@fundamental-ngx/platform/form';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { VariantManagementComponent } from './variant-management.component';
import { VariantManagementDirtyLabelDirective } from './directives/variant-management-dirty-label.directive';
import { ManageVariantItemComponent } from './components/manage-variant-item/manage-variant-item.component';
import { VariantManagementWrapperComponent } from './components/variant-management-wrapper/variant-management-wrapper.component';
import { ManageVariantsDialogComponent } from './components/manage-variants-dialog/manage-variants-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
        DialogModule,
        PlatformButtonModule,
        PlatformMenuButtonModule,
        TitleModule,
        LinkModule,
        ListModule,
        FdpFormGroupModule,
        ReactiveFormsModule,
        FormsModule,
        PlatformInputModule,
        PlatformCheckboxGroupModule,
        PlatformCheckboxModule,
        PlatformTableModule,
        IconModule,
        RadioModule,
        I18nModule,
        PipeModule,
        PlatformSearchFieldModule
    ],
    exports: [
        VariantManagementComponent,
        VariantManagementDirtyLabelDirective,
        ManageVariantItemComponent,
        VariantManagementWrapperComponent,
        ManageVariantsDialogComponent
    ],
    declarations: [
        VariantManagementComponent,
        VariantManagementDirtyLabelDirective,
        ManageVariantItemComponent,
        VariantManagementWrapperComponent,
        ManageVariantsDialogComponent
    ]
})
export class VariantManagementModule {}
