import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformFileUploaderComponent } from './platform-file-uploader.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

@NgModule({
    declarations: [PlatformFileUploaderComponent],
    imports: [
        CommonModule,
        FileUploaderModule,
        FormsModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [PlatformFileUploaderComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformFileUploaderModule {}
