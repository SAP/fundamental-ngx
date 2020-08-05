import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-drag-disabled-example',
    templateUrl: './file-uploader-drag-disabled-example.component.html',
    styleUrls: ['./file-uploader-drag-disabled-example.component.scss']
})
export class FileUploaderDragDisabledExampleComponent {
    files: File[];
    invalidFiles: File[];
}
