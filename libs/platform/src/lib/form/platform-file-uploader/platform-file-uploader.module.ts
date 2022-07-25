import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { PlatformFileUploaderComponent } from './platform-file-uploader.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    declarations: [PlatformFileUploaderComponent],
    imports: [CommonModule, FileUploaderModule, FormsModule, PipeModule, PlatformContentDensityDeprecationsModule],
    exports: [PlatformFileUploaderComponent, PlatformContentDensityDeprecationsModule]
})
export class PlatformFileUploaderModule {}
