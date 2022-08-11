import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { ListModule } from '@fundamental-ngx/core/list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';
import { PlatformPipeModule } from '@fundamental-ngx/platform/shared';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

import { UploadCollectionDragnDropDirective } from './directives/upload-collection-dragndrop.directive';
import { UploadCollectionComponent } from './upload-collection/upload-collection.component';
import { NewFolderComponent } from './dialogs/new-folder/new-folder.component';
import { MoveToComponent } from './dialogs/move-to/move-to.component';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [UploadCollectionComponent, NewFolderComponent, MoveToComponent, UploadCollectionDragnDropDirective],
    imports: [
        CommonModule,
        PlatformTableModule,
        ToolbarModule,
        ButtonModule,
        InputGroupModule,
        FormModule,
        I18nModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        PipeModule,
        IconModule,
        BreadcrumbModule,
        PaginationModule,
        BusyIndicatorModule,
        ObjectStatusModule,
        PlatformMenuModule,
        PlatformButtonModule,
        MessageStripModule,
        FileUploaderModule,
        ListModule,
        PlatformPipeModule,
        PlatformMenuButtonModule,
        RouterModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [UploadCollectionComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformUploadCollectionModule {}
