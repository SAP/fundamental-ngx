import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

import { PlatformTableModule } from '../table/public_api';
import { PlatformMenuModule } from '../menu/public_api';
import { PlatformButtonModule } from '../button/public_api';
import { NewFolderComponent, MoveToComponent } from './dialogs';
import { ConvertBytesPipe } from './pipes';
import { UploadCollectionComponent } from './upload-collection';
import { UploadCollectionDragnDropDirective } from './directives';

@NgModule({
    declarations: [
        UploadCollectionComponent,
        NewFolderComponent,
        MoveToComponent,
        ConvertBytesPipe,
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
        ListModule
    ],
    exports: [UploadCollectionComponent, ConvertBytesPipe]
})
export class PlatformUploadCollectionModule {}
