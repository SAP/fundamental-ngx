import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';
import { PlatformPipeModule } from '@fundamental-ngx/platform/shared';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';

import { I18nModule } from '@fundamental-ngx/i18n';
import { MoveToComponent } from './dialogs/move-to/move-to.component';
import { NewFolderComponent } from './dialogs/new-folder/new-folder.component';
import { UploadCollectionDragnDropDirective } from './directives/upload-collection-dragndrop.directive';
import { UploadCollectionComponent } from './upload-collection/upload-collection.component';

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
        ObjectStatusComponent,
        PlatformMenuModule,
        PlatformButtonModule,
        MessageStripModule,
        FileUploaderModule,
        ListModule,
        PlatformPipeModule,
        PlatformMenuButtonModule,
        RouterModule,
        ContentDensityModule
    ],
    exports: [UploadCollectionComponent, ContentDensityModule]
})
export class PlatformUploadCollectionModule {}
