import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { FormControlModule } from '../form/form-control/form-control.module';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, FormControlModule],
    exports: [FileUploaderComponent, FileUploaderSelectDirective, FileUploaderDragndropDirective],
    declarations: [FileUploaderComponent, FileUploaderSelectDirective, FileUploaderDragndropDirective]
})
export class FileUploaderModule {}
