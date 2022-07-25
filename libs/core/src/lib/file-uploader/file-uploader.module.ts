import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { DeprecatedFileUploaderContentDensityDirective } from './deprecated-file-uploader-content-density.directive';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, FormControlModule, ContentDensityModule],
    exports: [
        FileUploaderComponent,
        FileUploaderSelectDirective,
        FileUploaderDragndropDirective,
        DeprecatedFileUploaderContentDensityDirective,
        ContentDensityModule
    ],
    declarations: [
        FileUploaderComponent,
        FileUploaderSelectDirective,
        FileUploaderDragndropDirective,
        DeprecatedFileUploaderContentDensityDirective
    ]
})
export class FileUploaderModule {}
