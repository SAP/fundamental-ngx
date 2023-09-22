import { NgModule } from '@angular/core';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploaderComponent } from './file-uploader.component';

const components = [FileUploaderComponent, FileUploaderSelectDirective, FileUploaderDragndropDirective];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class FileUploaderModule {}
