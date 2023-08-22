import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformFileUploaderComponent } from './platform-file-uploader.component';

@NgModule({
    declarations: [PlatformFileUploaderComponent],
    imports: [CommonModule, FileUploaderModule, FormsModule, PipeModule, ContentDensityModule],
    exports: [PlatformFileUploaderComponent, ContentDensityModule]
})
export class PlatformFileUploaderModule {}
