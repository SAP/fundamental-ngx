import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    ToolbarModule,
    ButtonModule,
    InputGroupModule,
    DialogModule,
    FormModule,
    BusyIndicatorModule,
    MessageStripModule,
    ListModule,
    IconModule,
    BreadcrumbModule,
    PaginationModule,
    ObjectStatusModule,
    FileUploaderModule
} from '@fundamental-ngx/core';

import { PlatformTableModule } from '../table/table.module';
import { PlatformMenuModule } from '../menu/menu.module';
import { PlatformButtonModule } from '../button/button.module';
import { PlatformMenuButtonModule } from '../menu-button/menu-button.module';
import { PlatformPipeModule } from '../../utils/pipes/pipe.module';

import { UploadCollectionDragnDropDirective } from './directives/upload-collection-dragndrop.directive';
import { UploadCollectionComponent } from './upload-collection/upload-collection.component';
import { NewFolderComponent } from './dialogs/new-folder/new-folder.component';
import { MoveToComponent } from './dialogs/move-to/move-to.component';

@NgModule({
    declarations: [
        UploadCollectionComponent,
        NewFolderComponent,
        MoveToComponent,
        UploadCollectionDragnDropDirective
    ],
    imports: [
        CommonModule,
        PlatformTableModule,
        ToolbarModule,
        ButtonModule,
        InputGroupModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
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
        RouterModule
    ],
    exports: [UploadCollectionComponent]
})
export class PlatformUploadCollectionModule {}
