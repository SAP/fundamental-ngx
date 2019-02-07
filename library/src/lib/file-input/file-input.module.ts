import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './file-input.component';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from './directives/file-select.directive';
import { FileDragndropDirective } from './directives/file-dragndrop.directive';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [FileInputComponent, FileSelectDirective, FileDragndropDirective],
    declarations: [FileInputComponent, FileSelectDirective, FileDragndropDirective]
})
export class FileInputModule {}
