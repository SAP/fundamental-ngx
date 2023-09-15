import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, FormControlComponent, ContentDensityModule],
    exports: [FileUploaderComponent, FileUploaderSelectDirective, FileUploaderDragndropDirective, ContentDensityModule],
    declarations: [FileUploaderComponent, FileUploaderSelectDirective, FileUploaderDragndropDirective]
})
export class FileUploaderModule {}
