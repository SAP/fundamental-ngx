import { Component } from '@angular/core';

@Component({
    selector: 'fd-file-uploader-min-and-max-size-example',
    templateUrl: './file-uploader-min-and-max-size-example.component.html',
    styleUrls: ['./file-uploader-min-and-max-size-example.component.scss']
})
export class FileUploaderMinAndMaxSizeExampleComponent {
    files: File[];
    invalidFiles: File[];

    handleFileSection(files: File[]): void {
        alert(files.length + ' Files selected successfully!!!');
    }

    handleInvalidFiles(files: File[]): void {
        alert(files.length + ' Invalid files selected ');
        this.invalidFiles = files;
    }

}
