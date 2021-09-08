import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { PlatformFileUploaderComponent } from './platform-file-uploader.component';

@NgModule({
    declarations: [PlatformFileUploaderComponent],
    imports: [CommonModule, FileUploaderModule, FormsModule],
    exports: [PlatformFileUploaderComponent]
})
export class PlatformFileUploaderModule {}
